'use client'
import { useEffect, useRef, useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CountUpRenderer({ props: p }: { props: any }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [val, setVal] = useState(p.from ?? 0)
  const [key, setKey] = useState(0)
  const rafRef = useRef<number>()
  const szMap: Record<string, string> = {
    sm: '24px',
    md: '32px',
    lg: '44px',
    xl: '56px',
  }
  const fmt = (n: number) =>
    `${p.prefix || ''}${Math.round(n).toLocaleString('en-GB')}${p.suffix || ''}`

  useEffect(() => {
    let cur = p.from ?? 0
    const to = p.to ?? 48200
    const dur = p.duration ?? 2000
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      cur = (p.from ?? 0) + (to - (p.from ?? 0)) * t
      setVal(cur)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [key, p.from, p.to, p.duration])

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: szMap[p.size] || '44px',
          fontWeight: 300,
          letterSpacing: '-.04em',
          color: lighten(col),
          fontFamily,
        }}
      >
        {fmt(val)}
      </div>
      {p.showLabel && (
        <div
          style={{
            fontSize: 12,
            color: 'rgba(240,237,232,.4)',
            fontFamily,
            marginTop: 6,
          }}
        >
          {p.label}
        </div>
      )}
      <button
        onClick={() => setKey((k) => k + 1)}
        style={{
          marginTop: 14,
          padding: '6px 14px',
          borderRadius: 6,
          border: `1px solid rgba(${rgb},.25)`,
          background: `rgba(${rgb},.07)`,
          color: lighten(col),
          fontFamily,
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        ↺ Replay
      </button>
    </div>
  )
}
