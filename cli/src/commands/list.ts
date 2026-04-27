import pc from 'picocolors'
import { REGISTRY, GROUPS } from '@forgelabs-studio/shared'
import { readConfig } from '../config.js'

export async function runList(): Promise<void> {
  console.log(pc.bold('\n  FORGE.ui components\n'))

  const config = await readConfig()
  const installed = new Set(Object.keys(config?.components ?? {}))

  for (const group of GROUPS) {
    const components = REGISTRY.filter(c => c.group === group)
    console.log(pc.dim(`  ${group}`))
    for (const c of components) {
      const tick = installed.has(c.id) ? pc.green('✓') : pc.dim('○')
      console.log(`  ${tick} ${pc.white(c.displayName.padEnd(22))} ${pc.dim(c.description)}`)
    }
    console.log()
  }
}
