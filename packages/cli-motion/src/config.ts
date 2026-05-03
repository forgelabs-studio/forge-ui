import fs from 'fs-extra'
import path from 'path'
import type { ForgeMotionConfig } from './types.js'

const CONFIG_FILE = 'forge.config.json'
const MOTION_KEY = 'motion'

export async function readConfig(): Promise<ForgeMotionConfig | null> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  if (!(await fs.pathExists(configPath))) return null
  const full = await fs.readJson(configPath)
  return (full[MOTION_KEY] as ForgeMotionConfig) ?? null
}

export async function writeConfig(config: ForgeMotionConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  const full = (await fs.pathExists(configPath))
    ? await fs.readJson(configPath)
    : {}
  full[MOTION_KEY] = config
  await fs.writeJson(configPath, full, { spaces: 2 })
}

export function createDefaultConfig(): ForgeMotionConfig {
  return {
    output: 'components/motion',
    presets: {},
  }
}
