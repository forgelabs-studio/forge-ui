import { CHARACTER_SET_BY_ID, type AdvancedAnimationId, type AsciiConfig } from './ascii'

// Mirrors the layout constants in AsciiCanvas's static draw effect — the
// render loop owns canvas sizing for the duration of the animation, so the
// glyph metrics here must match exactly or the grid will misalign.
const FONT_SIZE = 8
const LINE_HEIGHT = 9
const CHAR_WIDTH = FONT_SIZE * 0.6
const NOISE_GLYPHS = '@#%&*!?'

export interface AdvancedAnimationHandle {
  stop: () => void
}

interface Grid {
  lines: string[]
  cols: number
  rows: number
}

function buildGrid(asciiText: string): Grid {
  const lines = asciiText.length ? asciiText.split('\n') : []
  const cols = lines.reduce((max, line) => Math.max(max, line.length), 0)
  return { lines, cols, rows: lines.length }
}

function randomGlyph(pool: string): string {
  return pool[Math.floor(Math.random() * pool.length)]
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function rampFor(config: AsciiConfig): string {
  return CHARACTER_SET_BY_ID[config.characterSet].ramp.trim() || '.:#'
}

type Render = (elapsed: number) => boolean

// --- Cascade — characters drop from above into their final position --------

interface CascadeState {
  delays: number[]
  startY: number
  fallDuration: number
}

function setupCascade(grid: Grid, config: AsciiConfig): CascadeState {
  const fallDuration = config.duration * 0.6
  const maxDelay = config.duration - fallDuration
  return {
    delays: Array.from({ length: grid.cols }, () => Math.random() * maxDelay),
    startY: -LINE_HEIGHT * 6,
    fallDuration,
  }
}

function renderCascade(ctx: CanvasRenderingContext2D, grid: Grid, config: AsciiConfig, state: CascadeState, elapsed: number): boolean {
  let allDone = true
  ctx.fillStyle = config.colour
  for (let row = 0; row < grid.rows; row++) {
    const line = grid.lines[row]
    for (let col = 0; col < line.length; col++) {
      const char = line[col]
      if (char === ' ') continue

      const local = elapsed - state.delays[col]
      if (local <= 0) {
        allDone = false
        continue
      }

      const progress = Math.min(local / state.fallDuration, 1)
      if (progress < 1) allDone = false

      const eased = easeOutCubic(progress)
      const targetY = row * LINE_HEIGHT
      const y = state.startY + (targetY - state.startY) * eased

      ctx.globalAlpha = 0.3 + 0.7 * eased
      ctx.fillText(char, col * CHAR_WIDTH, y)
    }
  }
  ctx.globalAlpha = 1
  return allDone
}

// --- Typewriter — reveals in reading order with a blinking cursor -----------

interface TypewriterCell {
  char: string
  col: number
  row: number
}

interface TypewriterState {
  cells: TypewriterCell[]
}

function setupTypewriter(grid: Grid): TypewriterState {
  const cells: TypewriterCell[] = []
  for (let row = 0; row < grid.rows; row++) {
    const line = grid.lines[row]
    for (let col = 0; col < line.length; col++) {
      if (line[col] !== ' ') cells.push({ char: line[col], col, row })
    }
  }
  return { cells }
}

function renderTypewriter(ctx: CanvasRenderingContext2D, grid: Grid, config: AsciiConfig, state: TypewriterState, elapsed: number): boolean {
  const total = state.cells.length
  if (total === 0) return true

  const progress = Math.min(elapsed / config.duration, 1)
  const revealCount = Math.floor(progress * total)

  ctx.fillStyle = config.colour
  ctx.globalAlpha = 1
  for (let i = 0; i < revealCount; i++) {
    const cell = state.cells[i]
    ctx.fillText(cell.char, cell.col * CHAR_WIDTH, cell.row * LINE_HEIGHT)
  }

  if (progress < 1) {
    const cursor = state.cells[revealCount]
    if (cursor && Math.floor(elapsed / 250) % 2 === 0) {
      ctx.globalAlpha = 0.5
      ctx.fillRect(cursor.col * CHAR_WIDTH, cursor.row * LINE_HEIGHT, CHAR_WIDTH, LINE_HEIGHT)
      ctx.globalAlpha = 1
    }
  }

  return progress >= 1
}

// --- Rain — Matrix-style falling columns with a fading trail ----------------

interface RainState {
  speeds: number[]
  offsets: number[]
  trailLength: number
  ramp: string
  cycle: number
}

function setupRain(grid: Grid, config: AsciiConfig): RainState {
  const trailLength = Math.min(10, Math.max(4, Math.floor(grid.rows * 0.25)))
  const cycle = grid.rows + trailLength
  const baseSpeed = cycle / config.duration

  return {
    speeds: Array.from({ length: grid.cols }, () => baseSpeed * (0.6 + Math.random() * 0.8)),
    offsets: Array.from({ length: grid.cols }, () => Math.random() * cycle),
    trailLength,
    ramp: rampFor(config),
    cycle,
  }
}

function renderRain(ctx: CanvasRenderingContext2D, grid: Grid, config: AsciiConfig, state: RainState, elapsed: number): boolean {
  ctx.fillStyle = config.colour
  for (let col = 0; col < grid.cols; col++) {
    const head = (state.offsets[col] + elapsed * state.speeds[col]) % state.cycle
    for (let i = 0; i < state.trailLength; i++) {
      const row = Math.floor(head) - i
      if (row < 0 || row >= grid.rows) continue
      ctx.globalAlpha = 1 - i / state.trailLength
      ctx.fillText(randomGlyph(state.ramp), col * CHAR_WIDTH, row * LINE_HEIGHT)
    }
  }
  ctx.globalAlpha = 1
  return false
}

// --- Decay — clean text corrupts into noise from random origins -------------

interface DecayState {
  origins: { col: number; row: number }[]
  maxRadius: number
  frozen: string[][] | null
}

function setupDecay(grid: Grid): DecayState {
  return {
    origins: Array.from({ length: 3 }, () => ({
      col: Math.floor(Math.random() * grid.cols),
      row: Math.floor(Math.random() * grid.rows),
    })),
    maxRadius: Math.hypot(grid.cols, grid.rows),
    frozen: null,
  }
}

function renderDecay(ctx: CanvasRenderingContext2D, grid: Grid, config: AsciiConfig, state: DecayState, elapsed: number): boolean {
  const progress = Math.min(elapsed / config.duration, 1)
  const radius = progress * state.maxRadius
  const fullyCorrupted = progress >= 1

  if (fullyCorrupted && !state.frozen) {
    state.frozen = grid.lines.map((line) => Array.from({ length: line.length }, () => randomGlyph(NOISE_GLYPHS)))
  }

  ctx.fillStyle = config.colour
  ctx.globalAlpha = 1
  for (let row = 0; row < grid.rows; row++) {
    const line = grid.lines[row]
    for (let col = 0; col < line.length; col++) {
      const char = line[col]
      if (char === ' ') continue

      const corrupted = fullyCorrupted || state.origins.some((o) => Math.hypot(col - o.col, row - o.row) <= radius)
      let glyph = char
      if (corrupted) {
        glyph = fullyCorrupted ? state.frozen![row][col] : randomGlyph(NOISE_GLYPHS)
      }

      ctx.fillText(glyph, col * CHAR_WIDTH, row * LINE_HEIGHT)
    }
  }

  return fullyCorrupted
}

// --- Scramble — all characters randomise, then resolve at staggered rates ---

interface ScrambleCell {
  char: string
  col: number
  row: number
  resolveAt: number
}

interface ScrambleState {
  cells: ScrambleCell[]
  ramp: string
}

function setupScramble(grid: Grid, config: AsciiConfig): ScrambleState {
  const cells: ScrambleCell[] = []
  for (let row = 0; row < grid.rows; row++) {
    const line = grid.lines[row]
    for (let col = 0; col < line.length; col++) {
      if (line[col] === ' ') continue
      cells.push({ char: line[col], col, row, resolveAt: Math.random() * config.duration })
    }
  }
  return { cells, ramp: rampFor(config) }
}

function renderScramble(ctx: CanvasRenderingContext2D, grid: Grid, config: AsciiConfig, state: ScrambleState, elapsed: number): boolean {
  let allResolved = true
  ctx.fillStyle = config.colour
  ctx.globalAlpha = 1
  for (const cell of state.cells) {
    const resolved = elapsed >= cell.resolveAt
    if (!resolved) allResolved = false
    const glyph = resolved ? cell.char : randomGlyph(state.ramp)
    ctx.fillText(glyph, cell.col * CHAR_WIDTH, cell.row * LINE_HEIGHT)
  }
  return allResolved
}

// --- Loop driver -------------------------------------------------------------

/** Takes over the canvas with a per-frame render loop for the chosen advanced animation. */
export function startAdvancedAnimation(
  canvas: HTMLCanvasElement,
  asciiText: string,
  animation: AdvancedAnimationId,
  config: AsciiConfig,
): AdvancedAnimationHandle {
  const grid = buildGrid(asciiText)
  const ctx = canvas.getContext('2d')
  if (!ctx || !grid.cols || !grid.rows) return { stop: () => {} }

  const dpr = window.devicePixelRatio || 1
  const cssWidth = grid.cols * CHAR_WIDTH
  const cssHeight = grid.rows * LINE_HEIGHT

  canvas.width = Math.ceil(cssWidth * dpr)
  canvas.height = Math.ceil(cssHeight * dpr)
  canvas.style.width = `${cssWidth}px`
  canvas.style.height = `${cssHeight}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  let render: Render
  switch (animation) {
    case 'cascade': {
      const state = setupCascade(grid, config)
      render = (elapsed) => renderCascade(ctx, grid, config, state, elapsed)
      break
    }
    case 'typewriter': {
      const state = setupTypewriter(grid)
      render = (elapsed) => renderTypewriter(ctx, grid, config, state, elapsed)
      break
    }
    case 'rain': {
      const state = setupRain(grid, config)
      render = (elapsed) => renderRain(ctx, grid, config, state, elapsed)
      break
    }
    case 'decay': {
      const state = setupDecay(grid)
      render = (elapsed) => renderDecay(ctx, grid, config, state, elapsed)
      break
    }
    case 'scramble': {
      const state = setupScramble(grid, config)
      render = (elapsed) => renderScramble(ctx, grid, config, state, elapsed)
      break
    }
  }

  let frameId = 0
  let start: number | null = null
  let stopped = false

  function frame(timestamp: number) {
    if (stopped) return
    if (start === null) start = timestamp
    const elapsed = timestamp - start

    ctx!.fillStyle = '#09090b'
    ctx!.fillRect(0, 0, cssWidth, cssHeight)
    ctx!.font = `${FONT_SIZE}px 'DM Mono', ui-monospace, monospace`
    ctx!.textBaseline = 'top'

    const done = render(elapsed)
    if (!done) frameId = requestAnimationFrame(frame)
  }

  frameId = requestAnimationFrame(frame)

  return {
    stop: () => {
      stopped = true
      cancelAnimationFrame(frameId)
    },
  }
}
