'use client'

import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'

interface MotionPropsPanelProps {
  activePreset: MotionPresetId
}

const PRESET_DESCRIPTIONS: Record<MotionPresetId, string> = {
  'fade-up':        'Fades in while translating upward. Triggered on viewport entry.',
  'fade-down':      'Fades in while translating downward. Triggered on viewport entry.',
  'fade-in':        'Pure opacity fade — no translate. Triggered on viewport entry.',
  'slide-in-left':  'Translates in from the left. Use overflow:hidden on the parent.',
  'slide-in-right': 'Translates in from the right. Use overflow:hidden on the parent.',
  'scale-in':       'Scales up from slightly smaller on viewport entry.',
  'bounce-in':      'Scales in with a spring overshoot. Stiffness and damping control the bounce.',
  stagger:          'Wraps children and staggers their entrance animation.',
  parallax:         'Applies a scroll-driven vertical offset. Scroll inside the canvas to preview.',
  reveal:           'Clip-path wipe from left to right. The wrapper has overflow:hidden built in.',
  float:            'Continuous idle float loop. Good for hero elements.',
  pulse:            'Continuous subtle scale loop. Good for indicators or CTAs.',
  'count-up':       'Animates a number from 0 to target on viewport entry.',
  typewriter:       'Reveals text character by character on viewport entry.',
}

const PEER_DEP = 'framer-motion'

export function MotionPropsPanel({ activePreset }: MotionPropsPanelProps) {
  return (
    <aside
      style={{
        borderLeft: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Header */}
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
        Props
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font)',
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {PRESET_DESCRIPTIONS[activePreset]}
        </p>

        {/* Peer dep badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 6,
            background: 'rgba(55,138,221,0.08)',
            border: '1px solid rgba(55,138,221,0.18)',
            marginBottom: 24,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(55,138,221,0.7)" strokeWidth="1.4">
            <path d="M5 1L9 3v4L5 9 1 7V3L5 1z" />
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(55,138,221,0.7)' }}>
            {PEER_DEP}
          </span>
        </div>

        {/* Coming soon */}
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px dashed var(--line)',
            fontFamily: 'var(--font)',
            fontSize: 12,
            color: 'var(--hint)',
            lineHeight: 1.6,
          }}
        >
          Props controls coming soon. For now, configure defaults in your generated file.
        </div>
      </div>

      {/* Footer — install command */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--line)',
          flexShrink: 0,
          background: 'var(--bg2)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Install
        </div>
        <code
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text)',
            background: 'var(--bg3)',
            border: '1px solid var(--line)',
            borderRadius: 6,
            padding: '8px 10px',
            wordBreak: 'break-all',
          }}
        >
          npx @forgelabs-studio/motion add {activePreset}
        </code>
      </div>
    </aside>
  )
}
