'use client'
import { useState } from 'react'
import { hexRgb, contrast } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CheckboxRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const sz =
    ({ sm: 14, md: 18, lg: 22 } as Record<string, number>)[p.size] ?? 18
  const br =
    p.variant === 'round' ? '50%' : p.variant === 'square' ? '4px' : '6px'
  const items: string[] = Array.isArray(p.items)
    ? p.items
    : (p.items || p.label || 'I agree to the terms')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean)
  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map((_, i) => (i === 0 ? !!p.checked : false)),
  )
  const toggle = (i: number) =>
    setChecked((arr) => arr.map((v, j) => (j === i ? !v : v)))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      {items.map((l, i) => (
        <div
          key={i}
          onClick={() => toggle(i)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: sz,
              height: sz,
              borderRadius: br,
              border: `1px solid ${checked[i] ? col : 'rgba(255,255,255,.18)'}`,
              background: checked[i] ? col : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .2s',
              flexShrink: 0,
              boxShadow: checked[i] ? `0 0 10px rgba(${rgb},.3)` : 'none',
            }}
          >
            {checked[i] && (
              <span
                style={{
                  color: contrast(col),
                  fontSize: sz * 0.55,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
            )}
          </div>
          <span
            style={{
              fontSize: 13,
              color: `rgba(240,237,232,${checked[i] ? 0.6 : 0.35})`,
              fontFamily,
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  )
}
