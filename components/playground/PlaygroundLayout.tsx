'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Canvas from '@/components/playground/Canvas'
import PropsPanel from '@/components/playground/PropsPanel'
import { ErrorBoundary } from '@/components/playground/ErrorBoundary'

type MobileTab = 'components' | 'preview' | 'props'

function ComponentsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1" width="5" height="5" rx="1" />
      <rect x="8" y="1" width="5" height="5" rx="1" />
      <rect x="1" y="8" width="5" height="5" rx="1" />
      <rect x="8" y="8" width="5" height="5" rx="1" />
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
      <path d="M2 4h10M2 7h5.5M2 10h8" />
      <circle cx="10" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const TABS: { id: MobileTab; label: string; Icon: () => React.JSX.Element }[] = [
  { id: 'components', label: 'Components', Icon: ComponentsIcon },
  { id: 'preview',    label: 'Preview',    Icon: PreviewIcon    },
  { id: 'props',      label: 'Props',      Icon: PropsIcon      },
]

export function PlaygroundLayout() {
  const [tab, setTab] = useState<MobileTab>('preview')

  return (
    <>
      {/* Desktop — .playground sits directly in .app's 1fr grid row */}
      <div className="playground">
        <Sidebar />
        <ErrorBoundary><Canvas /></ErrorBoundary>
        <ErrorBoundary><PropsPanel /></ErrorBoundary>
      </div>

      {/* Mobile — tab-based, one panel mounted at a time */}
      <div
        className="flex flex-col md:hidden"
        style={{ height: 'calc(100dvh - 48px)' }}
      >
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {tab === 'components' && <Sidebar />}
          {tab === 'preview'    && <ErrorBoundary><Canvas /></ErrorBoundary>}
          {tab === 'props'      && <ErrorBoundary><PropsPanel /></ErrorBoundary>}
        </div>

        <nav
          className="flex shrink-0"
          style={{ borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
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
    </>
  )
}
