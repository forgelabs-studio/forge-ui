import fs from 'fs-extra'
import path from 'path'

const MANIFEST_FILE = '.forge.json'
const MOTION_KEY = 'motion'

export type MotionManifest = Record<string, string>

export async function readManifest(): Promise<MotionManifest> {
  const manifestPath = path.join(process.cwd(), MANIFEST_FILE)
  if (!(await fs.pathExists(manifestPath))) return {}
  const full = await fs.readJson(manifestPath)
  return (full[MOTION_KEY] as MotionManifest) ?? {}
}

export async function writeManifest(manifest: MotionManifest): Promise<void> {
  const manifestPath = path.join(process.cwd(), MANIFEST_FILE)
  const full = (await fs.pathExists(manifestPath))
    ? await fs.readJson(manifestPath)
    : {}
  full[MOTION_KEY] = manifest
  await fs.writeJson(manifestPath, full, { spaces: 2 })
}

export async function setPresetVersion(
  presetId: string,
  version: string,
): Promise<void> {
  const manifest = await readManifest()
  manifest[presetId] = version
  await writeManifest(manifest)
}

export async function removePresetVersion(presetId: string): Promise<void> {
  const manifest = await readManifest()
  delete manifest[presetId]
  await writeManifest(manifest)
}
