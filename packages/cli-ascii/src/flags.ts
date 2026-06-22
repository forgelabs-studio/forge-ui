const FLAG_TO_PROP: Record<string, string> = {
  '--color': 'color',
  '--density': 'density',
  '--charset': 'characterSet',
  '--animation': 'animation',
  '--duration': 'duration',
}

// Parse an array of raw flag strings like ['--color=#7F77DD', '--density=100']
// into a props record like { color: '#7F77DD', density: 100 }
export function parseFlags(rawFlags: string[]): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  for (const raw of rawFlags) {
    const [keyPart, ...valueParts] = raw.split('=')
    const propKey = FLAG_TO_PROP[keyPart]
    if (!propKey) continue
    if (valueParts.length === 0) {
      props[propKey] = true
    } else {
      const value = valueParts.join('=')
      props[propKey] = isNaN(Number(value)) ? value : Number(value)
    }
  }
  return props
}
