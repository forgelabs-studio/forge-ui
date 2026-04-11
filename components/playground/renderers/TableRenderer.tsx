'use client'
import { useState } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [hovered, setHovered] = useState(-1)
  const rows = [
    ['Regula app', 'Mobile app', 'In progress', '#7F77DD'],
    ['FORGE.labs site', 'Website', 'Live', '#1D9E75'],
    ['Law Tech dash', 'Dashboard', 'Review', '#EF9F27'],
    ['Component lib', 'Open source', 'Planning', '#378ADD'],
    ['Client NDA', 'SaaS app', 'Scoping', '#D4537E'],
  ]
  const sc: Record<string, string> = {
    Live: '#1D9E75',
    'In progress': '#EF9F27',
    Review: '#378ADD',
    Planning: 'rgba(240,237,232,.3)',
    Scoping: '#D4537E',
  }

  // Support plus/minus columns or default
  const cols: string[] =
    Array.isArray(p.columns) && p.columns.length > 0
      ? p.columns
      : ['Project', 'Type', 'Status']

  // Map column names to row data indices
  const colIdx = cols.map((c) => {
    const l = c.toLowerCase()
    if (l.includes('project') || l.includes('name')) return 0
    if (l.includes('type') || l.includes('category')) return 1
    if (l.includes('status') || l.includes('state')) return 2
    return 0
  })

  return (
    <div
      style={{
        width: 360,
        background: '#0f0f12',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {p.caption && (
        <div
          style={{
            padding: '13px 16px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <span style={{ fontSize: 13, color: textColor, fontFamily }}>
            {p.caption}
          </span>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            {cols.map((c) => (
              <th
                key={c}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  fontSize: 10,
                  color: 'rgba(240,237,232,.3)',
                  fontFamily,
                  fontWeight: 500,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const isHov = p.showHover && hovered === i
            const base =
              p.showStripes && i % 2 === 0
                ? 'rgba(255,255,255,.015)'
                : 'transparent'
            return (
              <tr
                key={i}
                onMouseEnter={() => p.showHover && setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                style={{
                  borderBottom:
                    i < rows.length - 1
                      ? '1px solid rgba(255,255,255,.04)'
                      : 'none',
                  background: isHov ? `rgba(${rgb},.05)` : base,
                  transition: 'background .12s',
                }}
              >
                {cols.map((_, ci) => {
                  const dataIdx = colIdx[ci]
                  if (ci === 0)
                    return (
                      <td
                        key={ci}
                        style={{
                          padding: `${p.compact ? 8 : 12}px 14px`,
                          fontSize: 13,
                          color: textColor,
                          fontFamily,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: r[3],
                              flexShrink: 0,
                            }}
                          />
                          {r[dataIdx]}
                        </div>
                      </td>
                    )
                  if (dataIdx === 2)
                    return (
                      <td
                        key={ci}
                        style={{ padding: `${p.compact ? 8 : 12}px 14px` }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            color: sc[r[2]] || 'rgba(240,237,232,.4)',
                            fontFamily,
                          }}
                        >
                          {r[2]}
                        </span>
                      </td>
                    )
                  return (
                    <td
                      key={ci}
                      style={{
                        padding: `${p.compact ? 8 : 12}px 14px`,
                        fontSize: 12,
                        color: 'rgba(240,237,232,.45)',
                        fontFamily,
                      }}
                    >
                      {r[dataIdx]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
