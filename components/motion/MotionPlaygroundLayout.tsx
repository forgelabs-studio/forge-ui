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

const PRESETS: { id: MotionPresetId; name: string; tag: string }[] = [
  { id: 'fade-up',        name: 'FadeUp',       tag: 'scroll' },
  { id: 'fade-down',      name: 'FadeDown',     tag: 'scroll' },
  { id: 'fade-in',        name: 'FadeIn',       tag: 'scroll' },
  { id: 'slide-in-left',  name: 'SlideInLeft',  tag: 'scroll' },
  { id: 'slide-in-right', name: 'SlideInRight', tag: 'scroll' },
  { id: 'scale-in',       name: 'ScaleIn',      tag: 'scroll' },
  { id: 'bounce-in',      name: 'BounceIn',     tag: 'spring' },
  { id: 'stagger',        name: 'Stagger',      tag: 'scroll' },
  { id: 'parallax',       name: 'Parallax',     tag: 'scroll' },
  { id: 'reveal',         name: 'Reveal',       tag: 'scroll' },
  { id: 'float',          name: 'Float',        tag: 'loop' },
  { id: 'pulse',          name: 'Pulse',        tag: 'loop' },
  { id: 'count-up',       name: 'CountUp',      tag: 'viewport' },
  { id: 'typewriter',     name: 'Typewriter',   tag: 'viewport' },
]

const TAG_COLORS: Record<string, string> = {
  scroll:   'rgba(127,119,221,0.15)',
  spring:   'rgba(55,138,221,0.15)',
  loop:     'rgba(29,158,117,0.15)',
  viewport: 'rgba(239,159,39,0.15)',
}

const TAG_TEXT: Record<string, string> = {
  scroll:   'rgba(127,119,221,0.8)',
  spring:   'rgba(55,138,221,0.8)',
  loop:     'rgba(29,158,117,0.8)',
  viewport: 'rgba(239,159,39,0.8)',
}

export function MotionPlaygroundLayout() {
  const [activePreset, setActivePreset] = useState<MotionPresetId>('fade-up')

  return (
    <div className="playground">
      {/* Sidebar */}
      <div style={{ borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div
          style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--line)',
            fontFamily: 'var(--font)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            flexShrink: 0,
            background: 'var(--bg2)',
          }}
        >
          Presets
        </div>
        <nav style={{ overflowY: 'auto', flex: 1, padding: '6px 0' }}>
          {PRESETS.map(({ id, name, tag }) => {
            const active = id === activePreset
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActivePreset(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '6px 14px',
                  textAlign: 'left',
                  background: active ? 'var(--bg3)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${active ? 'var(--purple)' : 'transparent'}`,
                  color: active ? 'var(--text)' : 'var(--muted)',
                  fontFamily: 'var(--font)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  gap: 6,
                }}
              >
                <span>{name}</span>
                <span
                  style={{
                    fontSize: 10,
                    padding: '1px 6px',
                    borderRadius: 4,
                    background: TAG_COLORS[tag],
                    color: TAG_TEXT[tag],
                    flexShrink: 0,
                  }}
                >
                  {tag}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      <MotionCanvas activePreset={activePreset} />
      <MotionPropsPanel activePreset={activePreset} />
    </div>
  )
}
