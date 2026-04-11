// Shared hook for reading global design tokens in playground renderers.
// Import this in every renderer to get font, text colour, and radius scale.
import { usePlaygroundStore } from '@/store/playground'

export function useGlobals() {
  const { globalFont, globalTextColor, globalRadius } = usePlaygroundStore()

  // Resolve radius modifier — renderers pass their base radius through this
  function resolveRadius(base: number): number {
    if (globalRadius === 'sharp') return Math.min(base, 4)
    if (globalRadius === 'rounded') return Math.max(base, 20)
    return base
  }

  // Font family string ready to use in fontFamily style prop
  const fontFamily = `${globalFont}, sans-serif`

  // Text colour — use this for primary text in renderers
  const textColor = globalTextColor || '#f0ede8'

  return { fontFamily, textColor, resolveRadius }
}
