import pc from 'picocolors'
import { REGISTRY } from '../registry.js'
import { readConfig } from '../config.js'

export async function runList(): Promise<void> {
  console.log(pc.bold('\n  FORGE.motion presets\n'))

  const config = await readConfig()
  const installed = new Set(Object.keys(config?.presets ?? {}))

  for (const preset of REGISTRY) {
    const tick = installed.has(preset.id) ? pc.green('✓') : pc.dim('○')
    console.log(`  ${tick} ${pc.white(preset.displayName.padEnd(24))} ${pc.dim(preset.description)}`)
  }

  console.log()
}
