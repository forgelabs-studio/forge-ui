import { buildAnimationCss } from "@/lib/ascii-animate"
import { CHARACTER_SET_BY_ID, isAdvancedAnimation, type AdvancedAnimationId, type AsciiConfig } from "@/lib/ascii"

/** Builds a self-contained HTML + CSS export - no imports, no scripts, no dependencies. */
export function buildAsciiExportHtml(asciiText: string, config: AsciiConfig): string {
  const anim =
    config.animation && !isAdvancedAnimation(config.animation)
      ? buildAnimationCss(config.animation, config.duration, config.colour)
      : null

  const animationDeclaration = anim ? `\n  animation: ${anim.shorthand};` : ""
  const keyframesBlock = anim ? `\n\n${anim.keyframes}` : ""

  return (
    `<pre class="forge-ascii">${escapeHtml(asciiText)}</pre>\n\n` +
    "<style>\n" +
    "  .forge-ascii {\n" +
    "    margin: 0;\n" +
    "    padding: 24px;\n" +
    "    background: #09090b;\n" +
    `    color: ${config.colour};\n` +
    "    font-family: 'DM Mono', ui-monospace, monospace;\n" +
    "    font-size: 8px;\n" +
    "    line-height: 1.1;\n" +
    "    white-space: pre;\n" +
    `    overflow: auto;${animationDeclaration}\n` +
    "  }" +
    keyframesBlock +
    "\n</style>"
  )
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/** Builds a self-contained HTML + canvas + vanilla JS export for an advanced animation - no imports, no scripts, no dependencies. */
export function buildAdvancedExport(asciiText: string, animation: AdvancedAnimationId, config: AsciiConfig): string {
  const ramp = CHARACTER_SET_BY_ID[config.characterSet].ramp.trim() || ".:#"

  return (
    '<canvas id="forge-ascii-canvas"></canvas>\n\n' +
    "<style>\n" +
    "  #forge-ascii-canvas {\n" +
    "    display: block;\n" +
    "    background: #09090b;\n" +
    "    image-rendering: pixelated;\n" +
    "  }\n" +
    "</style>\n\n" +
    "<script>\n" +
    "(function () {\n" +
    `  var ASCII_TEXT = ${JSON.stringify(asciiText)};\n` +
    `  var COLOUR = ${JSON.stringify(config.colour)};\n` +
    `  var DURATION = ${config.duration};\n` +
    `  var RAMP = ${JSON.stringify(ramp)};\n` +
    "  var NOISE_GLYPHS = '@#%&*!?';\n" +
    "  var FONT_SIZE = 8;\n" +
    "  var LINE_HEIGHT = 9;\n" +
    "  var CHAR_WIDTH = FONT_SIZE * 0.6;\n\n" +
    "  var canvas = document.getElementById('forge-ascii-canvas');\n" +
    "  var ctx = canvas.getContext('2d');\n" +
    "  var lines = ASCII_TEXT.split('\\n');\n" +
    "  var cols = lines.reduce(function (m, l) { return Math.max(m, l.length); }, 0);\n" +
    "  var rows = lines.length;\n\n" +
    "  var dpr = window.devicePixelRatio || 1;\n" +
    "  var cssWidth = cols * CHAR_WIDTH;\n" +
    "  var cssHeight = rows * LINE_HEIGHT;\n" +
    "  canvas.width = Math.ceil(cssWidth * dpr);\n" +
    "  canvas.height = Math.ceil(cssHeight * dpr);\n" +
    "  canvas.style.width = cssWidth + 'px';\n" +
    "  canvas.style.height = cssHeight + 'px';\n" +
    "  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n\n" +
    "  function randomGlyph(pool) { return pool[Math.floor(Math.random() * pool.length)]; }\n" +
    "  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }\n" +
    "  function clear() {\n" +
    "    ctx.fillStyle = '#09090b';\n" +
    "    ctx.fillRect(0, 0, cssWidth, cssHeight);\n" +
    "    ctx.font = FONT_SIZE + \"px 'DM Mono', ui-monospace, monospace\";\n" +
    "    ctx.textBaseline = 'top';\n" +
    "  }\n\n" +
    `${ADVANCED_EXPORT_SCRIPTS[animation]}\n\n` +
    "  var start = null;\n" +
    "  function frame(ts) {\n" +
    "    if (start === null) start = ts;\n" +
    "    var elapsed = ts - start;\n" +
    "    clear();\n" +
    "    var done = render(elapsed);\n" +
    "    if (!done) requestAnimationFrame(frame);\n" +
    "  }\n" +
    "  requestAnimationFrame(frame);\n" +
    "})();\n" +
    "</script>"
  )
}

const ADVANCED_EXPORT_SCRIPTS: Record<AdvancedAnimationId, string> = {
  cascade: `  var fallDuration = DURATION * 0.6;
  var maxDelay = DURATION - fallDuration;
  var delays = [];
  for (var c = 0; c < cols; c++) delays.push(Math.random() * maxDelay);
  var startY = -LINE_HEIGHT * 6;

  function render(elapsed) {
    var allDone = true;
    ctx.fillStyle = COLOUR;
    for (var row = 0; row < rows; row++) {
      var line = lines[row];
      for (var col = 0; col < line.length; col++) {
        var ch = line[col];
        if (ch === ' ') continue;
        var local = elapsed - delays[col];
        if (local <= 0) { allDone = false; continue; }
        var progress = Math.min(local / fallDuration, 1);
        if (progress < 1) allDone = false;
        var eased = easeOutCubic(progress);
        var targetY = row * LINE_HEIGHT;
        var y = startY + (targetY - startY) * eased;
        ctx.globalAlpha = 0.3 + 0.7 * eased;
        ctx.fillText(ch, col * CHAR_WIDTH, y);
      }
    }
    ctx.globalAlpha = 1;
    return allDone;
  }`,

  typewriter: `  var cells = [];
  for (var row = 0; row < rows; row++) {
    var line = lines[row];
    for (var col = 0; col < line.length; col++) {
      if (line[col] !== ' ') cells.push({ ch: line[col], col: col, row: row });
    }
  }

  function render(elapsed) {
    var total = cells.length;
    if (total === 0) return true;
    var progress = Math.min(elapsed / DURATION, 1);
    var revealCount = Math.floor(progress * total);

    ctx.fillStyle = COLOUR;
    ctx.globalAlpha = 1;
    for (var i = 0; i < revealCount; i++) {
      var cell = cells[i];
      ctx.fillText(cell.ch, cell.col * CHAR_WIDTH, cell.row * LINE_HEIGHT);
    }

    if (progress < 1) {
      var cursor = cells[revealCount];
      if (cursor && Math.floor(elapsed / 250) % 2 === 0) {
        ctx.globalAlpha = 0.5;
        ctx.fillRect(cursor.col * CHAR_WIDTH, cursor.row * LINE_HEIGHT, CHAR_WIDTH, LINE_HEIGHT);
        ctx.globalAlpha = 1;
      }
    }

    return progress >= 1;
  }`,

  rain: `  var trailLength = Math.min(10, Math.max(4, Math.floor(rows * 0.25)));
  var cycle = rows + trailLength;
  var baseSpeed = cycle / DURATION;
  var speeds = [];
  var offsets = [];
  for (var c = 0; c < cols; c++) {
    speeds.push(baseSpeed * (0.6 + Math.random() * 0.8));
    offsets.push(Math.random() * cycle);
  }

  function render(elapsed) {
    ctx.fillStyle = COLOUR;
    for (var col = 0; col < cols; col++) {
      var head = (offsets[col] + elapsed * speeds[col]) % cycle;
      for (var i = 0; i < trailLength; i++) {
        var row = Math.floor(head) - i;
        if (row < 0 || row >= rows) continue;
        ctx.globalAlpha = 1 - i / trailLength;
        ctx.fillText(randomGlyph(RAMP), col * CHAR_WIDTH, row * LINE_HEIGHT);
      }
    }
    ctx.globalAlpha = 1;
    return false;
  }`,

  decay: `  var origins = [];
  for (var i = 0; i < 3; i++) {
    origins.push({ col: Math.floor(Math.random() * cols), row: Math.floor(Math.random() * rows) });
  }
  var maxRadius = Math.sqrt(cols * cols + rows * rows);
  var frozen = null;

  function render(elapsed) {
    var progress = Math.min(elapsed / DURATION, 1);
    var radius = progress * maxRadius;
    var fullyCorrupted = progress >= 1;

    if (fullyCorrupted && !frozen) {
      frozen = lines.map(function (line) {
        var row = [];
        for (var i = 0; i < line.length; i++) row.push(randomGlyph(NOISE_GLYPHS));
        return row;
      });
    }

    ctx.fillStyle = COLOUR;
    ctx.globalAlpha = 1;
    for (var row = 0; row < rows; row++) {
      var line = lines[row];
      for (var col = 0; col < line.length; col++) {
        var ch = line[col];
        if (ch === ' ') continue;

        var corrupted = fullyCorrupted || origins.some(function (o) {
          return Math.hypot(col - o.col, row - o.row) <= radius;
        });

        var glyph = ch;
        if (corrupted) glyph = fullyCorrupted ? frozen[row][col] : randomGlyph(NOISE_GLYPHS);
        ctx.fillText(glyph, col * CHAR_WIDTH, row * LINE_HEIGHT);
      }
    }

    return fullyCorrupted;
  }`,

  scramble: `  var cells = [];
  for (var row = 0; row < rows; row++) {
    var line = lines[row];
    for (var col = 0; col < line.length; col++) {
      if (line[col] === ' ') continue;
      cells.push({ ch: line[col], col: col, row: row, resolveAt: Math.random() * DURATION });
    }
  }

  function render(elapsed) {
    var allResolved = true;
    ctx.fillStyle = COLOUR;
    ctx.globalAlpha = 1;
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var resolved = elapsed >= cell.resolveAt;
      if (!resolved) allResolved = false;
      var glyph = resolved ? cell.ch : randomGlyph(RAMP);
      ctx.fillText(glyph, cell.col * CHAR_WIDTH, cell.row * LINE_HEIGHT);
    }
    return allResolved;
  }`,
}
