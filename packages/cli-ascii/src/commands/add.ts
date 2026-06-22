import pc from 'picocolors'
import { readConfig, writeConfig, createDefaultConfig } from '../config.js'
import { REGISTRY_BY_ID } from '../registry.js'
import { generateComponent } from '../generate.js'
import { setComponentVersion } from '../manifest.js'
import { parseFlags } from '../flags.js'
import { PACKAGE_VERSION } from '../version.js'

export async function runAdd(
  componentId: string,
  rawFlags: string[],
): Promise<void> {
  console.log(pc.bold(`\n  forge-ascii add ${componentId}\n`))

  const meta = REGISTRY_BY_ID[componentId]
  if (!meta) {
    console.log(pc.red(`  Unknown component: "${componentId}"`))
    console.log(pc.dim('  Run npx @forgelabs-studio/ascii list to see available components.\n'))
    process.exit(1)
  }

  try {
    let config = await readConfig()
    if (!config) {
      config = createDefaultConfig()
      console.log(pc.dim('  No ascii config found in forge.config.json - creating one.\n'))
    }

    const props = parseFlags(rawFlags)

    await generateComponent(componentId, meta.displayName, props, config)

    config.components[componentId] = props
    await writeConfig(config)
    await setComponentVersion(componentId, PACKAGE_VERSION)

    console.log(pc.green('  ✓') + ` ${meta.displayName}.tsx`)
    console.log(pc.green('  ✓') + ` ${meta.displayName}.css`)
    console.log(pc.dim(`\n  Import with:`))
    console.log(pc.cyan(`  import { ${meta.displayName} } from '@/components/forge/${meta.displayName}'\n`))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Failed to add ${componentId}: ${message}\n`))
    process.exit(1)
  }
}
