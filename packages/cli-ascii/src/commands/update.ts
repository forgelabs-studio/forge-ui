import pc from 'picocolors'
import { readConfig, writeConfig } from '../config.js'
import { REGISTRY_BY_ID } from '../registry.js'
import { generateComponent } from '../generate.js'

export async function runUpdate(componentId: string): Promise<void> {
  console.log(pc.bold(`\n  forge-ascii update ${componentId}\n`))

  try {
    const config = await readConfig()
    if (!config) {
      console.log(pc.red('  No forge.config.json found.\n'))
      process.exit(1)
    }

    const meta = REGISTRY_BY_ID[componentId]
    if (!meta) {
      console.log(pc.red(`  Unknown component: "${componentId}"\n`))
      process.exit(1)
    }

    const props = config.components[componentId] ?? {}
    await generateComponent(componentId, meta.displayName, props, config)

    config.components[componentId] = props
    await writeConfig(config)

    console.log(pc.green('  ✓') + ` ${meta.displayName} regenerated\n`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Failed to update ${componentId}: ${message}\n`))
    process.exit(1)
  }
}
