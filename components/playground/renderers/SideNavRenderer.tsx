'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { SideNavProps } from '@/lib/types'
export default function SideNavRenderer({ props: p }: { props: SideNavProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [collapsed, setCollapsed] = useState(!!p.collapsed)
  const [active, setActive] = useState(p.active ?? 1)

  // items: array of "icon,label" strings or plain label strings
  const rawItems: string[] = Array.isArray(p.items)
    ? p.items
    : (p.items || 'Dashboard,Components,Charts,Motion,Settings')
        .split(',')
        .map((x: string) => x.trim())
  const defaultIcons = ['◎', '⊞', '╱', '↑', '⚙']
  const items = rawItems.map((s: string, i: number) => {
    const parts = s.split(',')
    return parts.length >= 2
      ? { icon: parts[0].trim(), label: parts[1].trim() }
      : { icon: defaultIcons[i] || '◎', label: s }
  })

  const w = collapsed ? 54 : 196
  return (
    <div
      style={{
        width: w,
        background: '#0f0f12',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'width .25s',
      }}
    >
      <div
        style={{
          padding: 13,
          borderBottom: '1px solid rgba(255,255,255,.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {!collapsed ? (
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: textColor,
              fontFamily,
              letterSpacing: '-.02em',
            }}
          >
            {p.brand}
          </span>
        ) : (
          <span
            style={{
              fontSize: 11,
              color: 'rgba(240,237,232,.3)',
              fontFamily,
              margin: '0 auto',
            }}
          >
            P
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(240,237,232,.3)',
            cursor: 'pointer',
            fontSize: 12,
            padding: 2,
          }}
        >
          ◧
        </button>
      </div>
      <div style={{ padding: 7 }}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: `9px ${collapsed ? '0' : '10px'}`,
              justifyContent: collapsed ? 'center' : undefined,
              borderRadius: 7,
              cursor: 'pointer',
              transition: 'all .12s',
              marginBottom: 2,
              background: i === active ? `rgba(${rgb},.1)` : 'transparent',
              border: `1px solid ${i === active ? `rgba(${rgb},.2)` : 'transparent'}`,
            }}
            onMouseOver={(e) => {
              if (i !== active)
                (e.currentTarget as HTMLDivElement).style.background =
                  'rgba(255,255,255,.04)'
            }}
            onMouseOut={(e) => {
              if (i !== active)
                (e.currentTarget as HTMLDivElement).style.background =
                  'transparent'
            }}
          >
            {p.showIcons && (
              <span
                style={{
                  fontSize: 13,
                  color: i === active ? lighten(col) : 'rgba(240,237,232,.35)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
            )}
            {!collapsed && (
              <span
                style={{
                  fontSize: 12,
                  color: i === active ? lighten(col) : 'rgba(240,237,232,.5)',
                  fontFamily,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
