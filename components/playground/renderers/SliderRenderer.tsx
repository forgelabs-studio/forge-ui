'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { SliderProps } from '@/lib/types'
export default function SliderRenderer({ props: p }: { props: SliderProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [val, setVal] = useState(p.value ?? 8000)
  const fmt = (v: number) => `${p.unit || ''}${Number(v).toLocaleString()}`
  const pct = ((val - p.min) / (p.max - p.min)) * 100
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}
    >
      {p.showValue && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span style={{ fontSize: 11, color: textColor, fontFamily }}>
            {p.label}
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: lighten(col),
              fontFamily,
              letterSpacing: '-.02em',
            }}
          >
            {fmt(val)}
          </span>
        </div>
      )}
      <div style={{ position: 'relative', padding: '8px 0' }}>
        <div
          style={{
            height: 4,
            borderRadius: 100,
            background: 'rgba(255,255,255,.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: col,
              borderRadius: 100,
              width: `${pct}%`,
              boxShadow: `0 0 8px rgba(${rgb},.4)`,
            }}
          />
        </div>
        <input
          type="range"
          min={p.min}
          max={p.max}
          step={p.step || 1}
          value={val}
          style={{
            WebkitAppearance: 'none',
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
          onChange={(e) => setVal(+e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, color: 'var(--hint)', fontFamily }}>
          {fmt(p.min)}
        </span>
        <span style={{ fontSize: 10, color: 'var(--hint)', fontFamily }}>
          {fmt(p.max)}
        </span>
      </div>
    </div>
  )
}
