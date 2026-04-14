'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { StatCardProps } from '@/lib/types'
export default function StatCardRenderer({ props: p }: { props: StatCardProps }) {
  const { textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [hovered, setHovered] = useState(false)
  const dir = p.deltaDir === 'up'
  return (
    <div style={{ width: 300 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#111113',
          border: `1px solid ${hovered ? `rgba(${rgb},.22)` : 'rgba(255,255,255,.07)'}`,
          borderRadius: 10,
          padding: 18,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all .25s',
          cursor: 'pointer',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: 'rgba(240,237,232,.3)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {p.showIcon && <span style={{ color: lighten(col) }}>{p.icon}</span>}
          {p.title}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: '-.03em',
            color: textColor,
            marginBottom: 6,
          }}
        >
          {p.value}
        </div>
        {p.showDelta && (
          <div
            style={{
              fontSize: 12,
              color: dir ? 'rgba(29,158,117,.8)' : 'rgba(226,75,74,.7)',
            }}
          >
            {p.delta} vs last month
          </div>
        )}
        {p.showBar && (
          <div
            style={{
              marginTop: 14,
              height: 3,
              background: 'rgba(255,255,255,.06)',
              borderRadius: 2,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${p.barValue}%`,
                background: col,
                borderRadius: 2,
                boxShadow: `0 0 6px rgba(${rgb},.4)`,
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          opacity: 0.4,
        }}
      >
        {[
          ['Visitors', '24.1k'],
          ['Projects', '14'],
          ['Score', '100%'],
        ].map(([t, v]) => (
          <div
            key={t}
            style={{
              background: '#111113',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 7,
              padding: 11,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'rgba(240,237,232,.3)',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              {t}
            </div>
            <div style={{ fontSize: 15, fontWeight: 300, color: '#f0ede8' }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
