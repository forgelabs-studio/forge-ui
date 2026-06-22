export type CharacterSetId = 'standard' | 'block' | 'braille' | 'minimal'

export type AnimationId = 'fadein' | 'scanline' | 'flicker' | 'wave' | 'glitch'

export type AdvancedAnimationId = 'cascade' | 'typewriter' | 'rain' | 'decay' | 'scramble'

/** CSS-keyframe tier (`AnimationId`) plus the canvas render-loop tier (`AdvancedAnimationId`). */
export type Animation = AnimationId | AdvancedAnimationId

export interface CharacterSetMeta {
  id: CharacterSetId
  name: string
  description: string
  /** Glyph ramp ordered sparsest → densest. Preview renders light glyphs on a
   *  dark background, so brighter source pixels map to denser characters. */
  ramp: string
}

export interface AnimationMeta {
  id: AnimationId
  name: string
  description: string
}

export interface AdvancedAnimationMeta {
  id: AdvancedAnimationId
  name: string
  description: string
}

export interface AsciiConfig {
  characterSet: CharacterSetId
  density: number
  colour: string
  animation: Animation | null
  duration: number
}

export const CHARACTER_SETS: CharacterSetMeta[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Classic shading ramp — punctuation to dense symbols.',
    ramp: ' .,:;+*?%S#@',
  },
  {
    id: 'block',
    name: 'Block',
    description: 'Unicode block shades — clean, even coverage.',
    ramp: ' ░▒▓█',
  },
  {
    id: 'braille',
    name: 'Braille',
    description: 'Braille dot patterns — fine detail at small sizes.',
    ramp: ' ⠂⠆⠖⠶⠷⠿⡿⣿',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Four characters — spare, geometric look.',
    ramp: ' .:|=',
  },
]

export const CHARACTER_SET_BY_ID = Object.fromEntries(
  CHARACTER_SETS.map((set) => [set.id, set]),
) as Record<CharacterSetId, CharacterSetMeta>

export const ANIMATIONS: AnimationMeta[] = [
  { id: 'fadein', name: 'Fade in', description: 'Opacity rises from 0 to 1 on load.' },
  { id: 'scanline', name: 'Scanline reveal', description: 'Top-to-bottom wipe reveals the art.' },
  { id: 'flicker', name: 'Flicker', description: 'Rapid opacity fluctuation — CRT monitor style.' },
  { id: 'wave', name: 'Wave', description: 'Gentle vertical oscillation through the block.' },
  { id: 'glitch', name: 'Glitch', description: 'Horizontal distortion with colour-channel offset.' },
]

export const ANIMATION_BY_ID = Object.fromEntries(
  ANIMATIONS.map((animation) => [animation.id, animation]),
) as Record<AnimationId, AnimationMeta>

export const ADVANCED_ANIMATIONS: AdvancedAnimationMeta[] = [
  { id: 'cascade', name: 'Cascade', description: 'Characters drop into place from above, staggered column by column.' },
  { id: 'typewriter', name: 'Typewriter', description: 'Reveals left-to-right, top-to-bottom with a blinking cursor.' },
  { id: 'rain', name: 'Rain', description: 'Matrix-style columns of falling glyphs with a fading brightness trail.' },
  { id: 'decay', name: 'Decay', description: 'Clean text corrupts into noise, spreading from random origin points.' },
  { id: 'scramble', name: 'Scramble', description: 'Characters randomise, then resolve to the real glyph at staggered rates.' },
]

export const ADVANCED_ANIMATION_BY_ID = Object.fromEntries(
  ADVANCED_ANIMATIONS.map((animation) => [animation.id, animation]),
) as Record<AdvancedAnimationId, AdvancedAnimationMeta>

export function isAdvancedAnimation(id: Animation): id is AdvancedAnimationId {
  return id in ADVANCED_ANIMATION_BY_ID
}

export const ASCII_CONFIG_DEFAULTS: AsciiConfig = {
  characterSet: 'standard',
  density: 80,
  colour: '#7F77DD',
  animation: 'fadein',
  duration: 1200,
}
