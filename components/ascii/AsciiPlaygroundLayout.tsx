'use client'

import { useState } from 'react'
import { AsciiCanvas } from '@/components/ascii/AsciiCanvas'
import { AsciiPropsPanel } from '@/components/ascii/AsciiPropsPanel'
import { AsciiSidebar } from '@/components/ascii/AsciiSidebar'
import { ErrorBoundary } from '@/components/playground/ErrorBoundary'
import { useAsciiPlaygroundStore } from '@/store/ascii'

type MobileTab = 'sets' | 'preview' | 'props'

function SetsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 3h10M2 7h10M2 11h10" strokeLinecap="round" />
      <path d="M4 2v2M8 6v2M6 10v2" strokeLinecap="round" />
    </svg>
  )
}

function PreviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M5.5 5l4 2-4 2V5z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PropsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 4h10M2 7h5.5M2 10h8" strokeLinecap="round" />
      <circle cx="10" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const TABS: { id: MobileTab; label: string; Icon: () => React.JSX.Element }[] = [
  { id: 'sets', label: 'Sets', Icon: SetsIcon },
  { id: 'preview', label: 'Preview', Icon: PreviewIcon },
  { id: 'props', label: 'Props', Icon: PropsIcon },
]

export function AsciiPlaygroundLayout() {
  const [tab, setTab] = useState<MobileTab>('preview')
  const { config, setConfigValue } = useAsciiPlaygroundStore()

  // Each panel mounts exactly once - on mobile, CSS (.mobile-active) decides which
  // pane is visible instead of a second JS-mounted tree, so AsciiCanvas never
  // double-mounts its own Web Worker and image-conversion pipeline.
  return (
    <div className="ascii-shell">
      <div className="playground ascii-playground">
        <div className={`ascii-pane${tab === 'sets' ? ' mobile-active' : ''}`}>
          <AsciiSidebar activeSet={config.characterSet} onSetChange={(id) => setConfigValue('characterSet', id)} />
        </div>
        <div className={`ascii-pane${tab === 'preview' ? ' mobile-active' : ''}`}>
          <ErrorBoundary>
            <AsciiCanvas config={config} />
          </ErrorBoundary>
        </div>
        <div className={`ascii-pane${tab === 'props' ? ' mobile-active' : ''}`}>
          <ErrorBoundary>
            <AsciiPropsPanel />
          </ErrorBoundary>
        </div>
      </div>

      <nav className="flex shrink-0 md:hidden" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}>
        {TABS.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 border-0 cursor-pointer transition-colors"
              style={{
                background: 'transparent',
                fontFamily: 'var(--font)',
                fontSize: '10px',
                color: active ? 'var(--text)' : 'var(--muted)',
                borderTop: `2px solid ${active ? 'var(--purple)' : 'transparent'}`,
                marginTop: '-1px',
              }}
            >
              <Icon />
              {label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
