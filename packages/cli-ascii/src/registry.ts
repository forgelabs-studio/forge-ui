import type { ComponentMeta } from './types.js'

export const REGISTRY: ComponentMeta[] = [
  {
    id: 'ascii',
    displayName: 'ForgeAscii',
    description: 'Image to animated ASCII art - 4 character sets, 5 animations',
  },
]

export const REGISTRY_BY_ID = Object.fromEntries(
  REGISTRY.map((c) => [c.id, c]),
) as Record<string, ComponentMeta>
