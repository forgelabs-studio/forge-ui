import pc from 'picocolors'
import { REGISTRY } from '../registry.js'
import { readConfig } from '../config.js'

export async function runList(): Promise<void> {
  console.log(pc.bold('\n  FORGE.ascii components\n'))

  const config = await readConfig()
  const installed = new Set(Object.keys(config?.components ?? {}))

  for (const component of REGISTRY) {
    const tick = installed.has(component.id) ? pc.green('✓') : pc.dim('○')
    console.log(`  ${tick} ${pc.white(component.displayName.padEnd(24))} ${pc.dim(component.description)}`)
  }

  console.log()
}
