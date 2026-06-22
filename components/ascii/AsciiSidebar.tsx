'use client'

import { CHARACTER_SETS, type CharacterSetId } from '@/lib/ascii'

interface AsciiSidebarProps {
  activeSet: CharacterSetId
  onSetChange: (id: CharacterSetId) => void
}

export function AsciiSidebar({ activeSet, onSetChange }: AsciiSidebarProps) {
  return (
    <div
      className="ascii-sidebar"
      style={{
        borderRight: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
      }}
    >
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
        Character sets
      </div>
      <nav style={{ overflowY: 'auto', flex: 1, padding: '6px 0' }}>
        {CHARACTER_SETS.map(({ id, name, ramp }) => {
          const active = id === activeSet
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSetChange(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 4,
                width: '100%',
                padding: '8px 14px',
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
              <span>{name}</span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: 'var(--hint)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {ramp}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
