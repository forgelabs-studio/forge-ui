const FLAG_TO_PROP: Record<string, string> = {
  '--duration': 'duration',
  '--delay': 'delay',
  '--distance': 'distance',
  '--ease': 'ease',
  '--once': 'once',
  '--scale': 'scale',
  '--stiffness': 'stiffness',
  '--damping': 'damping',
  '--stagger-delay': 'staggerDelay',
  '--speed': 'speed',
  '--from': 'from',
  '--to': 'to',
  '--text': 'text',
}

const NUMBER_PROPS = new Set([
  'duration',
  'delay',
  'distance',
  'scale',
  'stiffness',
  'damping',
  'staggerDelay',
  'speed',
  'from',
  'to',
])

function coerceValue(prop: string, value: string | boolean): string | number | boolean {
  if (typeof value === 'boolean') return value
  if (prop === 'once') return value !== 'false'
  if (!NUMBER_PROPS.has(prop)) return value

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric value for ${prop}: ${value}`)
  }
  return parsed
}

export function parseMotionFlags(rawFlags: string[]): Record<string, unknown> {
  const props: Record<string, unknown> = {}

  for (let i = 0; i < rawFlags.length; i += 1) {
    const current = rawFlags[i]
    if (!current.startsWith('--')) continue

    const [flag, inlineValue] = current.split('=', 2)
    const prop = FLAG_TO_PROP[flag]
    if (!prop) continue

    const next = rawFlags[i + 1]
    let value: string | boolean
    if (inlineValue !== undefined) {
      value = inlineValue
    } else if (next && !next.startsWith('--')) {
      value = next
      i += 1
    } else {
      value = true
    }

    props[prop] = coerceValue(prop, value)
  }

  return props
}
