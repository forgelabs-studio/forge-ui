// Maps CLI flag names to prop keys — inverse of PROP_TO_FLAG in the playground
const FLAG_TO_PROP: Record<string, string> = {
  '--color': 'color',
  '--variant': 'variant',
  '--size': 'size',
  '--radius': 'radius',
  '--hover': 'hoverEffect',
  '--shadow': 'shadow',
  '--animation': 'clickAnim',
  '--speed': 'speed',
  '--uppercase': 'uppercase',
  '--full-width': 'fullWidth',
  '--duration': 'duration',
  '--height': 'height',
  '--shape': 'shape',
  '--side': 'side',
  '--padding': 'padding',
}

// Parse an array of raw flag strings like ['--color=#7F77DD', '--variant=glow']
// into a props record like { color: '#7F77DD', variant: 'glow' }
export function parseFlags(rawFlags: string[]): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  for (const raw of rawFlags) {
    const [keyPart, ...valueParts] = raw.split('=')
    const propKey = FLAG_TO_PROP[keyPart]
    if (!propKey) continue
    if (valueParts.length === 0) {
      // Boolean flag with no value — treat as true
      props[propKey] = true
    } else {
      const value = valueParts.join('=')
      // Coerce numeric strings to numbers
      props[propKey] = isNaN(Number(value)) ? value : Number(value)
    }
  }
  return props
}
