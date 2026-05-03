'use client'

import { lazy, Suspense } from 'react'
import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'
import { MotionCLIWindow } from '@/components/motion/MotionCLIWindow'

interface MotionCanvasProps {
  activePreset: MotionPresetId
}

const PRESETS = {
  'fade-up':        lazy(() => import('@/components/motion/presets/FadeUp')),
  'fade-down':      lazy(() => import('@/components/motion/presets/FadeDown')),
  'fade-in':        lazy(() => import('@/components/motion/presets/FadeIn')),
  'slide-in-left':  lazy(() => import('@/components/motion/presets/SlideInLeft')),
  'slide-in-right': lazy(() => import('@/components/motion/presets/SlideInRight')),
  'scale-in':       lazy(() => import('@/components/motion/presets/ScaleIn')),
  'bounce-in':      lazy(() => import('@/components/motion/presets/BounceIn')),
  stagger:          lazy(() => import('@/components/motion/presets/Stagger')),
  parallax:         lazy(() => import('@/components/motion/presets/Parallax')),
  reveal:           lazy(() => import('@/components/motion/presets/Reveal')),
  float:            lazy(() => import('@/components/motion/presets/Float')),
  pulse:            lazy(() => import('@/components/motion/presets/Pulse')),
  'count-up':       lazy(() => import('@/components/motion/presets/CountUp')),
  typewriter:       lazy(() => import('@/components/motion/presets/Typewriter')),
}

const PRESET_LABELS: Record<MotionPresetId, string> = {
  'fade-up':        'FadeUp',
  'fade-down':      'FadeDown',
  'fade-in':        'FadeIn',
  'slide-in-left':  'SlideInLeft',
  'slide-in-right': 'SlideInRight',
  'scale-in':       'ScaleIn',
  'bounce-in':      'BounceIn',
  stagger:          'Stagger',
  parallax:         'Parallax',
  reveal:           'Reveal',
  float:            'Float',
  pulse:            'Pulse',
  'count-up':       'CountUp',
  typewriter:       'Typewriter',
}

export function MotionCanvas({ activePreset }: MotionCanvasProps) {
  const Preset = PRESETS[activePreset]

  return (
    <div className="centre">
      <div className="prev-bar">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
          Forge{PRESET_LABELS[activePreset]}
        </span>
        <span
          style={{
            fontFamily: 'var(--font)',
            fontSize: 11,
            color: 'rgba(55,138,221,0.6)',
            letterSpacing: '0.04em',
          }}
        >
          framer-motion
        </span>
      </div>

      <div
        className="c-grid"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          overflow: activePreset === 'parallax' ? 'auto' : 'hidden',
        }}
      >
        <Suspense fallback={<span style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font)' }}>Loading…</span>}>
          <Preset />
        </Suspense>
      </div>

      <MotionCLIWindow activePreset={activePreset} />
    </div>
  )
}
