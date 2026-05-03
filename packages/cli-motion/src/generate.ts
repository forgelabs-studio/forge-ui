import fs from 'fs-extra'
import path from 'path'
import type { ForgeMotionConfig } from './types.js'
import { generateFadeUp } from './generators/fade-up.js'
import { generateFadeDown } from './generators/fade-down.js'
import { generateFadeIn } from './generators/fade-in.js'
import { generateSlideInLeft } from './generators/slide-in-left.js'
import { generateSlideInRight } from './generators/slide-in-right.js'
import { generateScaleIn } from './generators/scale-in.js'
import { generateBounceIn } from './generators/bounce-in.js'
import { generateStagger } from './generators/stagger.js'
import { generateParallax } from './generators/parallax.js'
import { generateReveal } from './generators/reveal.js'
import { generateFloat } from './generators/float.js'
import { generatePulse } from './generators/pulse.js'
import { generateCountUp } from './generators/count-up.js'
import { generateTypewriter } from './generators/typewriter.js'

const GENERATORS: Record<string, (props: Record<string, unknown>) => string> = {
  'fade-up': generateFadeUp,
  'fade-down': generateFadeDown,
  'fade-in': generateFadeIn,
  'slide-in-left': generateSlideInLeft,
  'slide-in-right': generateSlideInRight,
  'scale-in': generateScaleIn,
  'bounce-in': generateBounceIn,
  'stagger': generateStagger,
  'parallax': generateParallax,
  'reveal': generateReveal,
  'float': generateFloat,
  'pulse': generatePulse,
  'count-up': generateCountUp,
  'typewriter': generateTypewriter,
}

export async function generatePreset(
  presetId: string,
  displayName: string,
  props: Record<string, unknown>,
  config: ForgeMotionConfig,
): Promise<void> {
  const generator = GENERATORS[presetId]
  if (!generator) throw new Error(`No generator found for preset: ${presetId}`)

  const tsx = generator(props)
  const outputDir = path.join(process.cwd(), config.output)

  await fs.ensureDir(outputDir)
  await fs.writeFile(path.join(outputDir, `${displayName}.tsx`), tsx, 'utf8')
}
