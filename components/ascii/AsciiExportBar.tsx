'use client'

import { useState } from 'react'
import { buildAdvancedExport, buildAsciiExportHtml } from '@/lib/ascii-export'
import { ADVANCED_ANIMATION_BY_ID, ANIMATION_BY_ID, isAdvancedAnimation, type AsciiConfig } from '@/lib/ascii'

interface AsciiExportBarProps {
  asciiText: string
  config: AsciiConfig
}

export function AsciiExportBar({ asciiText, config }: AsciiExportBarProps) {
  const [exportOk, setExportOk] = useState(false)
  const [rawOk, setRawOk] = useState(false)

  const exportHtml =
    config.animation && isAdvancedAnimation(config.animation)
      ? buildAdvancedExport(asciiText, config.animation, config)
      : buildAsciiExportHtml(asciiText, config)

  const animationLabel = config.animation
    ? isAdvancedAnimation(config.animation)
      ? ADVANCED_ANIMATION_BY_ID[config.animation].name
      : ANIMATION_BY_ID[config.animation].name
    : 'None'

  function copyExport() {
    navigator.clipboard.writeText(exportHtml).then(() => {
      setExportOk(true)
      setTimeout(() => setExportOk(false), 2000)
    })
  }

  function copyRaw() {
    navigator.clipboard.writeText(asciiText).then(() => {
      setRawOk(true)
      setTimeout(() => setRawOk(false), 2000)
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
          <span className="cli-title">Export — updates as you adjust the preview</span>
        </div>
        <div className="cli-actions">
          <button type="button" className={`cli-btn${rawOk ? ' ok' : ''}`} onClick={copyRaw} disabled={!asciiText}>
            {rawOk ? '✓ Copied!' : '⌗ Copy raw ASCII'}
          </button>
          <button type="button" className={`cli-btn primary${exportOk ? ' ok' : ''}`} onClick={copyExport} disabled={!asciiText}>
            {exportOk ? '✓ Copied!' : '⌘ Copy export'}
          </button>
        </div>
      </div>

      <div className="cli-body">
        <div className="cli-row">
          <span className="cli-prompt">html</span>
          <div className="cli-cmd" style={{ whiteSpace: 'pre-wrap' }}>
            {asciiText ? (
              <>
                <span className="t-sub">&lt;pre class=&quot;forge-ascii&quot;&gt;</span>
                <span className="t-base">…</span>
                <span className="t-sub">&lt;/pre&gt;</span>
                {'  '}
                <span className="t-key">animation</span>
                {': '}
                <span className="t-val">{animationLabel}</span>
                <span className="t-cursor" />
              </>
            ) : (
              <span className="t-sub">upload an image to generate export code…</span>
            )}
          </div>
        </div>

        <div className="cli-out">
          <span className="cli-arrow">→</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(240,237,232,.4)' }}>
            self-contained HTML + CSS keyframes, zero dependencies
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(240,237,232,.2)' }}>
            {asciiText ? `${asciiText.length.toLocaleString()} characters` : 'no image yet'}
          </span>
        </div>
      </div>
    </div>
  )
}
