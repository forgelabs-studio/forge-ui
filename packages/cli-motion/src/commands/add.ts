import pc from 'picocolors'
import { readConfig, writeConfig, createDefaultConfig } from '../config.js'
import { REGISTRY_BY_ID } from '../registry.js'
import { generatePreset } from '../generate.js'

export async function runAdd(
  presetId: string,
  _rawFlags: string[],
): Promise<void> {
  console.log(pc.bold(`\n  forge-motion add ${presetId}\n`))

  const meta = REGISTRY_BY_ID[presetId]
  if (!meta) {
    console.log(pc.red(`  Unknown preset: "${presetId}"`))
    console.log(pc.dim('  Run npx forge-motion list to see available presets.\n'))
    process.exit(1)
  }

  try {
    let config = await readConfig()
    if (!config) {
      config = createDefaultConfig()
      console.log(pc.dim('  No motion config found in forge.config.json — creating one.\n'))
    }

    const props: Record<string, unknown> = {}

    await generatePreset(presetId, meta.displayName, props, config)

    config.presets[presetId] = props
    await writeConfig(config)

    console.log(pc.green('  ✓') + ` ${meta.displayName}.tsx`)
    console.log(pc.dim(`\n  Import with:`))
    console.log(pc.cyan(`  import { ${meta.displayName} } from '@/components/motion/${meta.displayName}'\n`))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Failed to add ${presetId}: ${message}\n`))
    process.exit(1)
  }
}
