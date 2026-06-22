import fs from 'fs-extra'
import path from 'path'

const MANIFEST_FILE = '.forge.json'
const ASCII_KEY = 'ascii-components'

export type AsciiManifest = Record<string, string>

export async function readManifest(): Promise<AsciiManifest> {
  const manifestPath = path.join(process.cwd(), MANIFEST_FILE)
  if (!(await fs.pathExists(manifestPath))) return {}
  const full = await fs.readJson(manifestPath)
  return (full[ASCII_KEY] as AsciiManifest) ?? {}
}

export async function writeManifest(manifest: AsciiManifest): Promise<void> {
  const manifestPath = path.join(process.cwd(), MANIFEST_FILE)
  const full = (await fs.pathExists(manifestPath))
    ? await fs.readJson(manifestPath)
    : {}
  full[ASCII_KEY] = manifest
  await fs.writeJson(manifestPath, full, { spaces: 2 })
}

export async function setComponentVersion(
  componentId: string,
  version: string,
): Promise<void> {
  const manifest = await readManifest()
  manifest[componentId] = version
  await writeManifest(manifest)
}

export async function removeComponentVersion(componentId: string): Promise<void> {
  const manifest = await readManifest()
  delete manifest[componentId]
  await writeManifest(manifest)
}
