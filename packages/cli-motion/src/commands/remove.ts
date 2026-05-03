import fs from 'fs-extra'
import path from 'path'
import pc from 'picocolors'
import { readConfig, writeConfig } from '../config.js'
import { REGISTRY_BY_ID } from '../registry.js'

export async function runRemove(presetId: string): Promise<void> {
  console.log(pc.bold(`\n  forge-motion remove ${presetId}\n`))

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

    const outputDir = path.join(process.cwd(), config.output)
    const tsxPath = path.join(outputDir, `${meta.displayName}.tsx`)

    if (await fs.pathExists(tsxPath)) {
      await fs.remove(tsxPath)
      console.log(pc.red('  ✕') + ` ${meta.displayName}.tsx`)
    }

    delete config.presets[presetId]
    await writeConfig(config)

    console.log(pc.dim('\n  Removed from forge.config.json.\n'))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Failed to remove ${presetId}: ${message}\n`))
    process.exit(1)
  }
}
