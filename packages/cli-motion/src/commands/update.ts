import pc from 'picocolors'
import { readConfig, writeConfig } from '../config.js'
import { REGISTRY_BY_ID } from '../registry.js'
import { generatePreset } from '../generate.js'

export async function runUpdate(presetId: string): Promise<void> {
  console.log(pc.bold(`\n  forge-motion update ${presetId}\n`))

  try {
    const config = await readConfig()
    if (!config) {
      console.log(pc.red('  No forge.config.json found.\n'))
      process.exit(1)
    }

    const meta = REGISTRY_BY_ID[presetId]
    if (!meta) {
      console.log(pc.red(`  Unknown preset: "${presetId}"\n`))
      process.exit(1)
    }

    const props = config.presets[presetId] ?? {}
    await generatePreset(presetId, meta.displayName, props, config)

    config.presets[presetId] = props
    await writeConfig(config)

    console.log(pc.green('  ✓') + ` ${meta.displayName}.tsx regenerated\n`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Failed to update ${presetId}: ${message}\n`))
    process.exit(1)
  }
}
