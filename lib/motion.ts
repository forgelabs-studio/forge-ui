export type MotionPresetId =
  | 'fade-up'
  | 'fade-down'
  | 'fade-in'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'scale-in'
  | 'bounce-in'
  | 'stagger'
  | 'parallax'
  | 'reveal'
  | 'float'
  | 'pulse'
  | 'count-up'
  | 'typewriter'

export type MotionEase = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'

export type MotionPresetProps = Record<string, string | number | boolean>

export interface MotionPresetMeta {
  id: MotionPresetId
  name: string
  displayName: string
  tag: 'scroll' | 'spring' | 'loop' | 'viewport'
  description: string
}

export const MOTION_PRESETS: MotionPresetMeta[] = [
  {
    id: 'fade-up',
    name: 'FadeUp',
    displayName: 'ForgeFadeUp',
    tag: 'scroll',
    description: 'Fades in while translating upward. Triggered on viewport entry.',
  },
  {
    id: 'fade-down',
    name: 'FadeDown',
    displayName: 'ForgeFadeDown',
    tag: 'scroll',
    description: 'Fades in while translating downward. Triggered on viewport entry.',
  },
  {
    id: 'fade-in',
    name: 'FadeIn',
    displayName: 'ForgeFadeIn',
    tag: 'scroll',
    description: 'Pure opacity fade. Triggered on viewport entry.',
  },
  {
    id: 'slide-in-left',
    name: 'SlideInLeft',
    displayName: 'ForgeSlideInLeft',
    tag: 'scroll',
    description: 'Translates in from the left. Use overflow:hidden on the parent.',
  },
  {
    id: 'slide-in-right',
    name: 'SlideInRight',
    displayName: 'ForgeSlideInRight',
    tag: 'scroll',
    description: 'Translates in from the right. Use overflow:hidden on the parent.',
  },
  {
    id: 'scale-in',
    name: 'ScaleIn',
    displayName: 'ForgeScaleIn',
    tag: 'scroll',
    description: 'Scales up from slightly smaller on viewport entry.',
  },
  {
    id: 'bounce-in',
    name: 'BounceIn',
    displayName: 'ForgeBounceIn',
    tag: 'spring',
    description: 'Scales in with a spring overshoot. Stiffness and damping control the bounce.',
  },
  {
    id: 'stagger',
    name: 'Stagger',
    displayName: 'ForgeStagger',
    tag: 'scroll',
    description: 'Wraps children and staggers their entrance animation.',
  },
  {
    id: 'parallax',
    name: 'Parallax',
    displayName: 'ForgeParallax',
    tag: 'scroll',
    description: 'Applies a scroll-driven vertical offset. Scroll inside the canvas to preview.',
  },
  {
    id: 'reveal',
    name: 'Reveal',
    displayName: 'ForgeReveal',
    tag: 'scroll',
    description: 'Clip-path wipe from left to right. The wrapper has overflow:hidden built in.',
  },
  {
    id: 'float',
    name: 'Float',
    displayName: 'ForgeFloat',
    tag: 'loop',
    description: 'Continuous idle float loop. Good for hero elements.',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    displayName: 'ForgePulse',
    tag: 'loop',
    description: 'Continuous subtle scale loop. Good for indicators or CTAs.',
  },
  {
    id: 'count-up',
    name: 'CountUp',
    displayName: 'ForgeCountUp',
    tag: 'viewport',
    description: 'Animates a number from 0 to target on viewport entry.',
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    displayName: 'ForgeTypewriter',
    tag: 'viewport',
    description: 'Reveals text character by character on viewport entry.',
  },
]

export const MOTION_PRESET_BY_ID = Object.fromEntries(
  MOTION_PRESETS.map((preset) => [preset.id, preset]),
) as Record<MotionPresetId, MotionPresetMeta>

export const MOTION_PROP_DEFAULTS: Record<MotionPresetId, MotionPresetProps> = {
  'fade-up': { duration: 0.6, delay: 0, distance: 32, ease: 'easeOut', once: true },
  'fade-down': { duration: 0.6, delay: 0, distance: 32, ease: 'easeOut', once: true },
  'fade-in': { duration: 0.6, delay: 0, ease: 'easeOut', once: true },
  'slide-in-left': { duration: 0.6, delay: 0, distance: 48, ease: 'easeOut', once: true },
  'slide-in-right': { duration: 0.6, delay: 0, distance: 48, ease: 'easeOut', once: true },
  'scale-in': { duration: 0.5, delay: 0, scale: 0.85, ease: 'easeOut', once: true },
  'bounce-in': { delay: 0, scale: 0.7, stiffness: 400, damping: 10, once: true },
  stagger: { duration: 0.5, delay: 0, staggerDelay: 0.1, distance: 24, ease: 'easeOut', once: true },
  parallax: { speed: 0.3 },
  reveal: { duration: 0.7, delay: 0, ease: 'easeOut', once: true },
  float: { duration: 3, distance: 12 },
  pulse: { duration: 2, scale: 1.05 },
  'count-up': { from: 0, to: 100, duration: 1.5, once: true },
  typewriter: { text: 'Interfaces built to a standard you can feel.', speed: 40, once: true },
}
