import fs from 'fs-extra'
import path from 'path'
import type { ForgeConfig } from './types.js'

const CONFIG_FILE = 'forge.config.json'

// Read the config file from the current working directory.
// Returns null if it doesn't exist yet.
export async function readConfig(): Promise<ForgeConfig | null> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  if (!await fs.pathExists(configPath)) return null
  return fs.readJson(configPath) as Promise<ForgeConfig>
}

// Write the config file back to disk.
export async function writeConfig(config: ForgeConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  await fs.writeJson(configPath, config, { spaces: 2 })
}

// Create a fresh config with sensible defaults.
export function createDefaultConfig(): ForgeConfig {
  return {
    version: '0.1.0',
    output: 'components/forge',
    components: {},
  }
}
