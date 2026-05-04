'use client'

import { useState } from 'react'
import { MotionCanvas } from '@/components/motion/MotionCanvas'
import { MotionPropsPanel } from '@/components/motion/MotionPropsPanel'
import { MotionSidebar } from '@/components/motion/MotionSidebar'
import { ErrorBoundary } from '@/components/playground/ErrorBoundary'
import { useMotionPlaygroundStore } from '@/store/motion'

type MobileTab = 'presets' | 'preview' | 'props'

function PresetsIcon() {
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
  { id: 'presets', label: 'Presets', Icon: PresetsIcon },
  { id: 'preview', label: 'Preview', Icon: PreviewIcon },
  { id: 'props', label: 'Props', Icon: PropsIcon },
]

export function MotionPlaygroundLayout() {
  const [tab, setTab] = useState<MobileTab>('preview')
  const { activePreset, props, setActivePreset } = useMotionPlaygroundStore()
  const activeProps = props[activePreset]

  return (
    <>
      <div className="playground">
        <MotionSidebar activePreset={activePreset} onPresetChange={setActivePreset} />
        <ErrorBoundary>
          <MotionCanvas activePreset={activePreset} props={activeProps} />
        </ErrorBoundary>
        <ErrorBoundary>
          <MotionPropsPanel activePreset={activePreset} />
        </ErrorBoundary>
      </div>

      <div className="flex flex-col md:hidden" style={{ height: 'calc(100dvh - 48px)' }}>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {tab === 'presets' && (
            <MotionSidebar activePreset={activePreset} onPresetChange={setActivePreset} />
          )}
          {tab === 'preview' && (
            <ErrorBoundary>
              <MotionCanvas activePreset={activePreset} props={activeProps} />
            </ErrorBoundary>
          )}
          {tab === 'props' && (
            <ErrorBoundary>
              <MotionPropsPanel activePreset={activePreset} />
            </ErrorBoundary>
          )}
        </div>

        <nav
          className="flex shrink-0"
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--bg2)',
          }}
        >
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
    </>
  )
}
