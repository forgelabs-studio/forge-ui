'use client'

import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import { MOTION_PRESET_BY_ID, type MotionPresetId, type MotionPresetProps } from '@/lib/motion'
import { MotionCLIWindow } from '@/components/motion/MotionCLIWindow'

interface MotionCanvasProps {
  activePreset: MotionPresetId
  props: MotionPresetProps
}

const PRESETS: Record<MotionPresetId, React.LazyExoticComponent<ComponentType<MotionPresetProps>>> = {
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

export function MotionCanvas({ activePreset, props }: MotionCanvasProps) {
  const Preset = PRESETS[activePreset]
  const meta = MOTION_PRESET_BY_ID[activePreset]

  return (
    <div className="centre">
      <div className="prev-bar">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
          {meta.displayName}
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
          <Preset {...props} />
        </Suspense>
      </div>

      <MotionCLIWindow activePreset={activePreset} props={props} />
    </div>
  )
}
