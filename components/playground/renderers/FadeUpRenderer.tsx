'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FadeUpRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [key, setKey] = useState(0)
  const lines = (
    p.text || 'Interfaces built\nto a standard\nyou can feel.'
  ).split('\n')
  const dur = (p.duration || 600) / 1000
  return (
    <div style={{ textAlign: 'center', maxWidth: 320 }}>
      {lines.map((l: string, i: number) => (
        <div
          key={`${key}-${i}`}
          style={{ overflow: 'hidden', marginBottom: 2 }}
        >
          <div
            style={{
              fontSize: 'clamp(20px,3.5vw,28px)',
              fontWeight: 300,
              letterSpacing: '-.03em',
              color: textColor,
              animation: `fadeUp ${dur}s ease ${p.stagger ? i * 0.1 : 0}s both`,
            }}
          >
            {l}
          </div>
        </div>
      ))}
      <div key={`${key}-sub`} style={{ overflow: 'hidden', marginTop: 12 }}>
        <div
          style={{
            fontSize: 12,
            color: `rgba(${rgb},.7)`,
            animation: `fadeUp ${dur}s ease ${p.stagger ? lines.length * 0.1 : 0}s both`,
          }}
        >
          FORGE.labs — Design engineering studio
        </div>
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        style={{
          marginTop: 12,
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
