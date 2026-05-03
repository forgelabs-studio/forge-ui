'use client'

import { useState } from 'react'
import { MotionCanvas } from '@/components/motion/MotionCanvas'
import { MotionPropsPanel } from '@/components/motion/MotionPropsPanel'

export type MotionPresetId =
  | 'fade-up'
  | 'fade-down'
  | 'fade-in'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'scale-in'
  | 'bounce-in'
  | 'stagger'
  | 'parallax'
  | 'reveal'
  | 'float'
  | 'pulse'
  | 'count-up'
  | 'typewriter'

const PRESETS: { id: MotionPresetId; name: string }[] = [
  { id: 'fade-up', name: 'FadeUp' },
  { id: 'fade-down', name: 'FadeDown' },
  { id: 'fade-in', name: 'FadeIn' },
  { id: 'slide-in-left', name: 'SlideInLeft' },
  { id: 'slide-in-right', name: 'SlideInRight' },
  { id: 'scale-in', name: 'ScaleIn' },
  { id: 'bounce-in', name: 'BounceIn' },
  { id: 'stagger', name: 'Stagger' },
  { id: 'parallax', name: 'Parallax' },
  { id: 'reveal', name: 'Reveal' },
  { id: 'float', name: 'Float' },
  { id: 'pulse', name: 'Pulse' },
  { id: 'count-up', name: 'CountUp' },
  { id: 'typewriter', name: 'Typewriter' },
]

export function MotionPlaygroundLayout() {
  const [activePreset, setActivePreset] = useState<MotionPresetId>('fade-up')

  return (
    <div className="playground">
      <nav
        style={{
          borderRight: '1px solid var(--line)',
          overflowY: 'auto',
          padding: '12px 0',
        }}
      >
        {PRESETS.map(({ id, name }) => {
          const active = id === activePreset
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActivePreset(id)}
              style={{
                display: 'block',
                width: '100%',
                padding: '6px 16px',
                textAlign: 'left',
                background: active ? 'var(--bg3)' : 'transparent',
                border: 'none',
                borderLeft: `2px solid ${active ? 'var(--purple)' : 'transparent'}`,
                color: active ? 'var(--text)' : 'var(--muted)',
                fontFamily: 'var(--font)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {name}
            </button>
          )
        })}
      </nav>

      <MotionCanvas activePreset={activePreset} />
      <MotionPropsPanel activePreset={activePreset} />
    </div>
  )
}
