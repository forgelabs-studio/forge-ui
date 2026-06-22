import fs from 'fs-extra'
import path from 'path'
import type { ForgeAsciiConfig } from './types.js'
import { generateAscii } from './generators/ascii.js'

const GENERATORS: Record<string, (props: Record<string, unknown>) => { tsx: string; css: string }> = {
  ascii: generateAscii,
}

export async function generateComponent(
  componentId: string,
  displayName: string,
  props: Record<string, unknown>,
  config: ForgeAsciiConfig,
): Promise<void> {
  const generator = GENERATORS[componentId]
  if (!generator) throw new Error(`No generator found for component: ${componentId}`)

  const { tsx, css } = generator(props)
  const outputDir = path.join(process.cwd(), config.output)

  await fs.ensureDir(outputDir)
  await fs.writeFile(path.join(outputDir, `${displayName}.tsx`), tsx, 'utf8')
  await fs.writeFile(path.join(outputDir, `${displayName}.css`), css, 'utf8')
}
