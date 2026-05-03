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

export interface MotionPresetMeta {
  id: MotionPresetId
  displayName: string
  description: string
}

export interface ForgeMotionConfig {
  output: string
  presets: Record<string, Record<string, unknown>>
}
