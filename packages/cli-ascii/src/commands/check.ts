import pc from 'picocolors'
import semver from 'semver'
import { readManifest } from '../manifest.js'

const PACKAGE_NAME = '@forgelabs-studio/ascii'

async function fetchLatestVersion(): Promise<string> {
  const res = await fetch(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`)
  if (!res.ok) throw new Error(`npm registry returned ${res.status}`)
  const data = await res.json() as { version: string }
  return data.version
}

export async function runCheck(): Promise<void> {
  console.log(pc.bold('\n  forge-ascii check\n'))

  try {
    const manifest = await readManifest()
    const installed = Object.entries(manifest)

    if (installed.length === 0) {
      console.log(pc.dim('  No components installed. Run npx @forgelabs-studio/ascii add ascii to get started.\n'))
      return
    }

    console.log(pc.dim('  Checking latest version on npm...\n'))
    const latest = await fetchLatestVersion()

    let allUpToDate = true

    for (const [componentId, installedVersion] of installed) {
      const isOutdated = semver.lt(installedVersion, latest)
      if (isOutdated) {
        allUpToDate = false
        console.log(
          `  ${pc.yellow('!')} ${pc.white(componentId.padEnd(20))} ${pc.dim(installedVersion)} -> ${pc.cyan(latest)}`
        )
      } else {
        console.log(
          `  ${pc.green('✓')} ${pc.white(componentId.padEnd(20))} ${pc.dim(installedVersion)}`
        )
      }
    }

    if (!allUpToDate) {
      console.log(pc.dim('\n  Update with: npx @forgelabs-studio/ascii update <component>\n'))
    } else {
      console.log(pc.dim('\n  All components are up to date.\n'))
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.red(`\n  ✖ Check failed: ${message}\n`))
    process.exit(1)
  }
}
