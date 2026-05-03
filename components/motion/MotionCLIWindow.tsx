'use client'

import { useState } from 'react'
import type { MotionPresetId } from '@/components/motion/MotionPlaygroundLayout'

interface MotionCLIWindowProps {
  activePreset: MotionPresetId
}

const DISPLAY_NAMES: Record<MotionPresetId, string> = {
  'fade-up':        'ForgeFadeUp',
  'fade-down':      'ForgeFadeDown',
  'fade-in':        'ForgeFadeIn',
  'slide-in-left':  'ForgeSlideInLeft',
  'slide-in-right': 'ForgeSlideInRight',
  'scale-in':       'ForgeScaleIn',
  'bounce-in':      'ForgeBounceIn',
  stagger:          'ForgeStagger',
  parallax:         'ForgeParallax',
  reveal:           'ForgeReveal',
  float:            'ForgeFloat',
  pulse:            'ForgePulse',
  'count-up':       'ForgeCountUp',
  typewriter:       'ForgeTypewriter',
}

export function MotionCLIWindow({ activePreset }: MotionCLIWindowProps) {
  const [cliOk, setCliOk] = useState(false)
  const cliString = `npx @forgelabs-studio/motion add ${activePreset}`
  const displayName = DISPLAY_NAMES[activePreset]

  function copyCLI() {
    navigator.clipboard.writeText(cliString).then(() => {
      setCliOk(true)
      setTimeout(() => setCliOk(false), 2000)
    })
  }

  return (
    <div className="cli-win">
      <div className="cli-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="cli-dots">
            <div className="cli-dot" style={{ background: '#e24b4a', opacity: .6 }} />
            <div className="cli-dot" style={{ background: '#EF9F27', opacity: .6 }} />
            <div className="cli-dot" style={{ background: '#1D9E75', opacity: .6 }} />
          </div>
          <span className="cli-title">Install command — updates as you browse presets</span>
        </div>
        <div className="cli-actions">
          <button className={`cli-btn primary${cliOk ? ' ok' : ''}`} onClick={copyCLI}>
            {cliOk ? '✓ Copied!' : '⌘ Copy command'}
          </button>
        </div>
      </div>

      <div className="cli-body">
        <div className="cli-row">
          <span className="cli-prompt">$</span>
          <div className="cli-cmd">
            <span className="t-base">npx @forgelabs-studio/motion</span>
            {' '}
            <span className="t-sub">add</span>
            {' '}
            <span className="t-comp">{activePreset}</span>
            <span className="t-cursor" />
          </div>
        </div>

        <div className="cli-out">
          <span className="cli-arrow">→</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(240,237,232,.4)' }}>
            writes {displayName}.tsx → components/motion/
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(240,237,232,.2)' }}>
            requires framer-motion
          </span>
        </div>
      </div>
    </div>
  )
}
