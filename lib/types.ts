// Shared prop types used across the playground

export type ButtonVariant = 'glow' | 'solid' | 'ghost' | 'outline' | 'soft' | 'spectrum'
export type SizePreset = 'sm' | 'md' | 'lg' | 'xl'
export type HoverEffect = 'lift' | 'scale' | 'glow' | 'none'
export type ClickAnim = 'ripple' | 'scale' | 'bounce' | 'none'
export type Shadow = 'glow' | 'soft' | 'hard' | 'none'
export type IconPos = 'left' | 'right'
export type Speed = 'slow' | 'normal' | 'fast'
export type DeltaDir = 'up' | 'down'
export type Status = 'online' | 'away' | 'busy' | 'offline'
export type Shape = 'circle' | 'squircle' | 'square'
export type RadiusScale = 'sharp' | 'default' | 'rounded'

export interface ButtonProps {
  text: string
  variant: ButtonVariant
  size: SizePreset
  color: string
  textSize: number
  weight: '300' | '400' | '500'
  radius: number
  paddingX: number
  paddingY: number
  icon: string
  iconPos: IconPos
  hoverEffect: HoverEffect
  clickAnim: ClickAnim
  shadow: Shadow
  letterSpacing: string
  uppercase: boolean
  fullWidth: boolean
  disabled: boolean
}

export interface CardProps {
  title: string
  subtitle: string
  tag: string
  badge: string
  color: string
  radius: number
  padding: number
  showTag: boolean
  showBadge: boolean
  width: number
}

export interface BadgeProps {
  text: string
  color: string
  variant: 'pill' | 'tag' | 'square'
  size: SizePreset
  showDot: boolean
  dotPulse: boolean
  uppercase: boolean
}

// For all remaining components, use a loose but non-any type.
// This is intentional — full typing of all 40 components is a post-v0.1 task.
export type ComponentProps = Record<string, string | number | boolean | string[] | boolean[] | undefined>

export type PropDefaultsMap = Record<string, ComponentProps>
