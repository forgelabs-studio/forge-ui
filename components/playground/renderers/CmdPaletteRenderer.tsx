'use client'
import { useState } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CmdPaletteRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [flash, setFlash] = useState<number | null>(null)

  // Parse items: array of "Category:Label" strings, or fallback hardcoded
  const rawItems: string[] = Array.isArray(p.items) ? p.items : []
  const hasItems = rawItems.length > 0

  // Group by category
  type Row = { icon: string; label: string; kbd: string }
  type Group = { cat: string; rows: Row[] }
  const defaultGroups: Group[] = [
    {
      cat: 'Components',
      rows: [
        { icon: '⬛', label: 'Button', kbd: 'B' },
        { icon: '▭', label: 'Card', kbd: 'C' },
        { icon: '▱', label: 'Input', kbd: 'I' },
      ],
    },
    {
      cat: 'Actions',
      rows: [
        { icon: '⌘', label: 'Copy command', kbd: '⌘C' },
        { icon: '⬇', label: 'Export', kbd: '⌘E' },
      ],
    },
  ]
  const groups: Group[] = hasItems
    ? (() => {
        const map = new Map<string, Row[]>()
        rawItems.forEach((s, i) => {
          const [cat, label = ''] = s.split(':')
          if (!map.has(cat)) map.set(cat, [])
          map.get(cat)!.push({ icon: '◆', label, kbd: String(i + 1) })
        })
        return Array.from(map.entries()).map(([cat, rows]) => ({ cat, rows }))
      })()
    : defaultGroups

  let rowIdx = 0
  return (
    <div style={{ width: 340 }}>
      <div
        style={{
          background: '#111113',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,.6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 15px',
            borderBottom: '1px solid rgba(255,255,255,.07)',
          }}
        >
          <span style={{ color: 'rgba(240,237,232,.3)', fontSize: 14 }}>⌕</span>
          <input
            placeholder={p.placeholder}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: textColor,
              fontFamily,
              flex: 1,
            }}
            readOnly
          />
          <div
            style={{
              padding: '3px 7px',
              borderRadius: 4,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              fontSize: 10,
              color: 'rgba(240,237,232,.3)',
              fontFamily: 'var(--mono)',
            }}
          >
            ESC
          </div>
        </div>
        <div style={{ padding: 6 }}>
          {groups.map((cat) => (
            <div key={cat.cat}>
              {p.showCategories && (
                <div
                  style={{
                    fontSize: 9,
                    color: 'rgba(240,237,232,.25)',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    padding: '8px 10px 4px',
                    fontFamily,
                  }}
                >
                  {cat.cat}
                </div>
              )}
              {cat.rows.map((item) => {
                const idx = rowIdx++
                const isFlash = flash === idx
                return (
                  <div
                    key={item.label}
                    onClick={() => {
                      setFlash(idx)
                      setTimeout(() => setFlash(null), 200)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 10px',
                      borderRadius: 7,
                      cursor: 'pointer',
                      transition: 'all .12s',
                      background: isFlash
                        ? `rgba(${rgb},.18)`
                        : idx === 0
                          ? `rgba(${rgb},.08)`
                          : '',
                      border: `1px solid ${idx === 0 ? `rgba(${rgb},.15)` : 'transparent'}`,
                    }}
                    onMouseOver={(e) => {
                      if (!isFlash)
                        (e.currentTarget as HTMLDivElement).style.background =
                          `rgba(${rgb},.06)`
                    }}
                    onMouseOut={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.background =
                        idx === 0 ? `rgba(${rgb},.08)` : ''
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 5,
                        background: 'rgba(255,255,255,.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        flex: 1,
                        fontSize: 13,
                        color: textColor,
                        fontFamily,
                      }}
                    >
                      {item.label}
                    </span>
                    {p.showShortcuts && (
                      <kbd
                        style={{
                          fontSize: 10,
                          color: 'rgba(240,237,232,.3)',
                          background: 'rgba(255,255,255,.05)',
                          border: '1px solid rgba(255,255,255,.08)',
                          borderRadius: 4,
                          padding: '2px 6px',
                          fontFamily: 'var(--mono)',
                        }}
                      >
                        {item.kbd}
                      </kbd>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
