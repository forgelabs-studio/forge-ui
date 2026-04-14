'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { PaginationProps } from '@/lib/types'
export default function PaginationRenderer({ props: p }: { props: PaginationProps }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const total = Math.ceil((p.total || 48) / (p.perPage || 10))
  const [cur, setCur] = useState(p.current || 3)
  const pages: number[] = []
  for (let i = Math.max(1, cur - 2); i <= Math.min(total, cur + 2); i++)
    pages.push(i)
  const btnBase = {
    borderRadius: 7,
    border: '1px solid rgba(255,255,255,.08)',
    background: 'transparent',
    fontFamily,
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all .12s',
    padding: '7px 12px',
    color: 'rgba(240,237,232,.4)',
    minWidth: 34,
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {p.showArrows && (
          <button
            disabled={cur <= 1}
            onClick={() => setCur((c: number) => Math.max(1, c - 1))}
            style={{
              ...btnBase,
              padding: '7px 11px',
              opacity: cur <= 1 ? 0.4 : 1,
            }}
          >
            ‹
          </button>
        )}
        {cur > 3 && (
          <>
            <button
              onClick={() => setCur(1)}
              style={{ ...btnBase, border: 'none' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,.04)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              1
            </button>
            <span
              style={{
                color: 'rgba(240,237,232,.2)',
                fontSize: 12,
                padding: '0 2px',
              }}
            >
              …
            </span>
          </>
        )}
        {pages.map((pg) => (
          <button
            key={pg}
            onClick={() => setCur(pg)}
            style={{
              ...btnBase,
              border: `1px solid ${pg === cur ? `rgba(${rgb},.35)` : 'transparent'}`,
              background: pg === cur ? `rgba(${rgb},.12)` : 'transparent',
              color: pg === cur ? lighten(col) : 'rgba(240,237,232,.4)',
            }}
            onMouseOver={(e) => {
              if (pg !== cur)
                e.currentTarget.style.background = 'rgba(255,255,255,.04)'
            }}
            onMouseOut={(e) => {
              if (pg !== cur) e.currentTarget.style.background = 'transparent'
            }}
          >
            {pg}
          </button>
        ))}
        {cur < total - 2 && (
          <>
            <span
              style={{
                color: 'rgba(240,237,232,.2)',
                fontSize: 12,
                padding: '0 2px',
              }}
            >
              …
            </span>
            <button
              onClick={() => setCur(total)}
              style={{ ...btnBase, border: 'none' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,.04)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {total}
            </button>
          </>
        )}
        {p.showArrows && (
          <button
            disabled={cur >= total}
            onClick={() => setCur((c: number) => Math.min(total, c + 1))}
            style={{
              ...btnBase,
              padding: '7px 11px',
              opacity: cur >= total ? 0.4 : 1,
            }}
          >
            ›
          </button>
        )}
      </div>
      {p.showCount && (
        <div
          style={{ fontSize: 11, color: 'rgba(240,237,232,.3)', fontFamily }}
        >
          Showing {(cur - 1) * (p.perPage || 10) + 1}–
          {Math.min(cur * (p.perPage || 10), p.total || 48)} of {p.total || 48}
        </div>
      )}
    </div>
  )
}
