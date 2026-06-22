import fs from 'fs-extra'
import path from 'path'
import type { ForgeAsciiConfig } from './types.js'

const CONFIG_FILE = 'forge.config.json'
const ASCII_KEY = 'ascii-components'

export async function readConfig(): Promise<ForgeAsciiConfig | null> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  if (!(await fs.pathExists(configPath))) return null
  const full = await fs.readJson(configPath)
  return (full[ASCII_KEY] as ForgeAsciiConfig) ?? null
}

export async function writeConfig(config: ForgeAsciiConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  const full = (await fs.pathExists(configPath))
    ? await fs.readJson(configPath)
    : {}
  full[ASCII_KEY] = config
  await fs.writeJson(configPath, full, { spaces: 2 })
}

export function createDefaultConfig(): ForgeAsciiConfig {
  return {
    output: 'components/forge',
    components: {},
  }
}
