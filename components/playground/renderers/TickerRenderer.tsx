'use client'
import { useState } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TickerRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const dur =
    ({ slow: '35s', normal: '20s', fast: '8s' } as Record<string, string>)[
      p.speed
    ] ?? '20s'
  const [paused, setPaused] = useState(false)
  const items: string[] = Array.isArray(p.items)
    ? p.items
    : (p.items || 'Landing pages,Websites,SaaS apps,Open source')
        .split(',')
        .map((x: string) => x.trim())
  const doubled = [...items, ...items]
  return (
    <div
      style={{
        width: 340,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,.07)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        padding: '10px 0',
        background: '#0f0f12',
      }}
      onMouseEnter={() => p.pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          gap: 0,
          whiteSpace: 'nowrap',
          animation: `ticker ${dur} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((item: string, i: number) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: p.gap / 2,
              padding: `0 ${p.gap / 2}px`,
              fontSize: 12,
              color: textColor,
              fontFamily,
            }}
          >
            {item}
            <span style={{ color: `rgba(${rgb},.5)` }}>{p.separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
