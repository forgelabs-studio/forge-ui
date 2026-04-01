'use client'
import { useState } from 'react'
import { usePlaygroundStore } from '@/store/playground'
import { buildCLIFlags, buildCLIString } from '@/lib/cli-builder'
import { REGISTRY_BY_ID } from '@/lib/registry'

export default function CLIWindow() {
  const { activeComponent, props } = usePlaygroundStore()
  const [initOk, setInitOk] = useState(false)
  const [cliOk, setCliOk] = useState(false)

  const currentProps = props[activeComponent] ?? {}
  const flags = buildCLIFlags(activeComponent, currentProps)
  const cliString = buildCLIString(activeComponent, currentProps)
  const meta = REGISTRY_BY_ID[activeComponent]
  const displayName = meta?.displayName ?? `Forge${activeComponent.charAt(0).toUpperCase()}${activeComponent.slice(1)}`

  function copyInit() {
    navigator.clipboard.writeText('npx @forgelabs-studio/ui@latest init').then(() => {
      setInitOk(true)
      setTimeout(() => setInitOk(false), 2000)
    })
  }

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
          <span className="cli-title">Install command — updates as you customise</span>
        </div>
        <div className="cli-actions">
          <button className={`cli-btn${initOk ? ' ok' : ''}`} onClick={copyInit}>
            {initOk ? '✓ Copied!' : '⬡ npx @forgelabs-studio/ui init'}
          </button>
          <button className={`cli-btn primary${cliOk ? ' ok' : ''}`} onClick={copyCLI}>
            {cliOk ? '✓ Copied!' : '⌘ Copy command'}
          </button>
        </div>
      </div>

      <div className="cli-body">
        <div className="cli-row">
          <span className="cli-prompt">$</span>
          <div className="cli-cmd">
            <span className="t-base">npx @forgelabs-studio/ui</span>
            {' '}
            <span className="t-sub">add</span>
            {' '}
            <span className="t-comp">{activeComponent}</span>
            {flags.map(({ key, value, isColor }) => (
              <span key={key} className="flag-new">
                {' '}
                <span className="t-key">{key}</span>
                {value !== null && (
                  <>
                    =
                    {isColor ? (
                      <span className="t-val">
                        <span className="t-col-dot" style={{ background: value }} />
                        {value}
                      </span>
                    ) : (
                      <span className="t-val">{value}</span>
                    )}
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
            writes {displayName}.tsx + {displayName}.css → components/forge/
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(240,237,232,.2)' }}>
            import {'{ '}{displayName}{' }'} from &apos;@/components/forge/{displayName}&apos;
          </span>
        </div>
      </div>
    </div>
  )
}
