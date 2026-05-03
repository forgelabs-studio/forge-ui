'use client'

import { useState } from 'react'
import { buildMotionCLIFlags, buildMotionCLIString } from '@/lib/motion-cli-builder'
import { MOTION_PRESET_BY_ID, type MotionPresetId, type MotionPresetProps } from '@/lib/motion'

interface MotionCLIWindowProps {
  activePreset: MotionPresetId
  props: MotionPresetProps
}

export function MotionCLIWindow({ activePreset, props }: MotionCLIWindowProps) {
  const [cliOk, setCliOk] = useState(false)
  const cliString = buildMotionCLIString(activePreset, props)
  const flags = buildMotionCLIFlags(activePreset, props)
  const displayName = MOTION_PRESET_BY_ID[activePreset].displayName

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
            {flags.map(({ key, value }) => (
              <span key={key} className="flag-new">
                {' '}
                <span className="t-key">{key}</span>
                {value !== null && (
                  <>
                    =
                    <span className="t-val">{value}</span>
                  </>
                )}
              </span>
            ))}
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
