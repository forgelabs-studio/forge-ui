import type { MotionPresetMeta } from './types.js'

export const REGISTRY: MotionPresetMeta[] = [
  { id: 'fade-up',       displayName: 'ForgeFadeUp',       description: 'Fade in with upward translate' },
  { id: 'fade-down',     displayName: 'ForgeFadeDown',     description: 'Fade in with downward translate' },
  { id: 'fade-in',       displayName: 'ForgeFadeIn',       description: 'Pure opacity fade, no translate' },
  { id: 'slide-in-left', displayName: 'ForgeSlideInLeft',  description: 'Slide in from the left' },
  { id: 'slide-in-right',displayName: 'ForgeSlideInRight', description: 'Slide in from the right' },
  { id: 'scale-in',      displayName: 'ForgeScaleIn',      description: 'Scale up from slightly smaller' },
  { id: 'bounce-in',     displayName: 'ForgeBounceIn',     description: 'Scale in with spring overshoot' },
  { id: 'stagger',       displayName: 'ForgeStagger',      description: 'Stagger entrance of child elements' },
  { id: 'parallax',      displayName: 'ForgeParallax',     description: 'Scroll-driven parallax offset' },
  { id: 'reveal',        displayName: 'ForgeReveal',       description: 'Clip-path wipe reveal' },
  { id: 'float',         displayName: 'ForgeFloat',        description: 'Continuous idle float loop' },
  { id: 'pulse',         displayName: 'ForgePulse',        description: 'Continuous subtle scale loop' },
  { id: 'count-up',      displayName: 'ForgeCountUp',      description: 'Animate a number from 0 to target' },
  { id: 'typewriter',    displayName: 'ForgeTypewriter',   description: 'Character-by-character text reveal' },
]

export const REGISTRY_BY_ID = Object.fromEntries(
  REGISTRY.map((p) => [p.id, p])
) as Record<string, MotionPresetMeta>
