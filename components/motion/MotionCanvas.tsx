'use client'

import { lazy, Suspense } from 'react'
import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'

interface MotionCanvasProps {
  activePreset: MotionPresetId
}

const PRESETS = {
  'fade-up': lazy(() => import('@/components/motion/presets/FadeUp')),
  'fade-down': lazy(() => import('@/components/motion/presets/FadeDown')),
  'fade-in': lazy(() => import('@/components/motion/presets/FadeIn')),
  'slide-in-left': lazy(
    () => import('@/components/motion/presets/SlideInLeft'),
  ),
  'slide-in-right': lazy(
    () => import('@/components/motion/presets/SlideInRight'),
  ),
  'scale-in': lazy(() => import('@/components/motion/presets/ScaleIn')),
  'bounce-in': lazy(() => import('@/components/motion/presets/BounceIn')),
  stagger: lazy(() => import('@/components/motion/presets/Stagger')),
  parallax: lazy(() => import('@/components/motion/presets/Parallax')),
  reveal: lazy(() => import('@/components/motion/presets/Reveal')),
  float: lazy(() => import('@/components/motion/presets/Float')),
  pulse: lazy(() => import('@/components/motion/presets/Pulse')),
  'count-up': lazy(() => import('@/components/motion/presets/CountUp')),
  typewriter: lazy(() => import('@/components/motion/presets/Typewriter')),
}

export function MotionCanvas({ activePreset }: MotionCanvasProps) {
  const Preset = PRESETS[activePreset]

  return (
    <div className="centre">
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <Suspense
          fallback={
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>
              Loading…
            </span>
          }
        >
          <Preset />
        </Suspense>
      </div>
    </div>
  )
}
