import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  buildMotionCLIFlags,
  buildMotionCLIString,
} from '../lib/motion-cli-builder'
import { parseMotionFlags } from '../packages/cli-motion/src/flags'
import { generateBounceIn } from '../packages/cli-motion/src/generators/bounce-in'
import { generateCountUp } from '../packages/cli-motion/src/generators/count-up'
import { generateFadeDown } from '../packages/cli-motion/src/generators/fade-down'
import { generateFadeIn } from '../packages/cli-motion/src/generators/fade-in'
import { generateFadeUp } from '../packages/cli-motion/src/generators/fade-up'
import { generateFloat } from '../packages/cli-motion/src/generators/float'
import { generateParallax } from '../packages/cli-motion/src/generators/parallax'
import { generatePulse } from '../packages/cli-motion/src/generators/pulse'
import { generateReveal } from '../packages/cli-motion/src/generators/reveal'
import { generateScaleIn } from '../packages/cli-motion/src/generators/scale-in'
import { generateSlideInLeft } from '../packages/cli-motion/src/generators/slide-in-left'
import { generateSlideInRight } from '../packages/cli-motion/src/generators/slide-in-right'
import { generateStagger } from '../packages/cli-motion/src/generators/stagger'
import { generateTypewriter } from '../packages/cli-motion/src/generators/typewriter'
import { MOTION_PRESETS } from '../lib/motion'
import { REGISTRY as MOTION_CLI_REGISTRY } from '../packages/cli-motion/src/registry'

const GENERATED_WITH_CHILDREN = [
  generateFadeUp,
  generateFadeDown,
  generateFadeIn,
  generateSlideInLeft,
  generateSlideInRight,
  generateScaleIn,
  generateBounceIn,
  generateStagger,
  generateParallax,
  generateReveal,
  generateFloat,
  generatePulse,
]

const GENERATED_MOTIONS = [
  ...GENERATED_WITH_CHILDREN,
  generateCountUp,
  generateTypewriter,
]

const PLAYGROUND_PRESET_FILES = [
  'BounceIn.tsx',
  'CountUp.tsx',
  'FadeDown.tsx',
  'FadeIn.tsx',
  'FadeUp.tsx',
  'Float.tsx',
  'Parallax.tsx',
  'Pulse.tsx',
  'Reveal.tsx',
  'ScaleIn.tsx',
  'SlideInLeft.tsx',
  'SlideInRight.tsx',
  'Stagger.tsx',
  'Typewriter.tsx',
]

describe('motion CLI builder', () => {
  it('omits default values', () => {
    expect(
      buildMotionCLIString('fade-up', {
        duration: 0.6,
        delay: 0,
        distance: 32,
        ease: 'easeOut',
        once: true,
      }),
    ).toBe('npx @forgelabs-studio/motion add fade-up')
  })

  it('includes changed values as shell-quoted flags', () => {
    expect(
      buildMotionCLIString('typewriter', {
        text: "Talia's Forge",
        speed: 55,
        once: true,
      }),
    ).toBe(
      "npx @forgelabs-studio/motion add typewriter --speed='55' --text='Talia'\\''s Forge'",
    )
  })

  it('emits false boolean flags explicitly', () => {
    expect(
      buildMotionCLIFlags('fade-in', {
        duration: 0.6,
        delay: 0,
        ease: 'easeOut',
        once: false,
      }),
    ).toEqual([{ key: '--once', value: 'false' }])
  })
})

describe('motion CLI flag parser', () => {
  it('parses inline, spaced, numeric, and boolean flags', () => {
    expect(
      parseMotionFlags([
        '--duration=0.8',
        '--distance',
        '64',
        '--ease',
        'easeInOut',
        '--once=false',
      ]),
    ).toEqual({
      duration: 0.8,
      distance: 64,
      ease: 'easeInOut',
      once: false,
    })
  })

  it('preserves equals signs inside inline text values', () => {
    expect(parseMotionFlags(['--text=Progress = craft'])).toEqual({
      text: 'Progress = craft',
    })
  })

  it('rejects invalid easing values', () => {
    expect(() => parseMotionFlags(['--ease=wiggly'])).toThrow(
      'Invalid easing value: wiggly',
    )
  })
})

describe('motion generators', () => {
  it('types generated children without relying on a global React namespace', () => {
    for (const generate of GENERATED_WITH_CHILDREN) {
      const output = generate({})

      expect(output).toContain('ReactNode')
      expect(output).not.toContain('children: React.ReactNode')
    }
  })

  it('respects reduced-motion preferences in generated output', () => {
    for (const generate of GENERATED_MOTIONS) {
      expect(generate({})).toContain('prefers-reduced-motion: reduce')
    }
  })

  it('cleans up generated CountUp animations with a callable cleanup', () => {
    const output = generateCountUp({})

    expect(output).toContain('return () => controls.stop()')
    expect(output).not.toContain('return controls.stop')
  })

  it('uses text flags as the generated Typewriter default', () => {
    const output = generateTypewriter({
      text: "Talia's Forge = craft",
      speed: 55,
      once: false,
    })

    expect(output).toContain(`text = "Talia's Forge = craft"`)
    expect(output).toContain('speed = 55')
    expect(output).toContain('once = false')
  })

  it('imports React when generated Stagger uses React.Children', () => {
    const output = generateStagger({})

    expect(output).toContain(
      "import React, { useRef, type ReactNode } from 'react'",
    )
    expect(output).toContain('React.Children.toArray(children)')
  })
})

describe('motion registry consistency', () => {
  it('keeps playground and CLI preset ids/display names aligned', () => {
    const playground = MOTION_PRESETS.map(({ id, displayName }) => ({
      id,
      displayName,
    }))
    const cli = MOTION_CLI_REGISTRY.map(({ id, displayName }) => ({
      id,
      displayName,
    }))

    expect(cli).toEqual(playground)
  })
})

describe('motion playground preset readiness', () => {
  it('keeps all playground previews reduced-motion aware', () => {
    for (const file of PLAYGROUND_PRESET_FILES) {
      const source = readFileSync(
        join(process.cwd(), 'components/motion/presets', file),
        'utf8',
      )

      expect(source, file).toContain('prefers-reduced-motion: reduce')
    }
  })

  it('does not ship unfinished playground preset markers', () => {
    for (const file of PLAYGROUND_PRESET_FILES) {
      const source = readFileSync(
        join(process.cwd(), 'components/motion/presets', file),
        'utf8',
      )

      expect(source, file).not.toMatch(/TODO|FIXME|placeholder|coming soon/i)
    }
  })
})
