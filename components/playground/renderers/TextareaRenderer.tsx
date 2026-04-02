'use client'
import { useState } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TextareaRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [count, setCount] = useState(0)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}
    >
      {(p.showLabel || p.showCount) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {p.showLabel && (
            <label style={{ fontSize: 11, color: textColor, fontFamily }}>
              {p.label}
            </label>
          )}
          {p.showCount && (
            <span
              style={{
                fontSize: 10,
                color: 'var(--hint)',
                fontFamily: 'var(--mono)',
              }}
            >
              {count}/{p.maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        placeholder={p.placeholder}
        maxLength={p.maxLength}
        rows={p.rows}
        style={{
          width: '100%',
          background: '#111113',
          border: '1px solid rgba(255,255,255,.09)',
          borderRadius: p.radius,
          padding: '10px 12px',
          fontSize: 13,
          color: textColor,
          fontFamily,
          outline: 'none',
          transition: 'all .2s',
          resize: 'vertical',
          lineHeight: 1.6,
        }}
        onChange={(e) => setCount(e.target.value.length)}
        onFocus={(e) => {
          e.target.style.borderColor = `rgba(${rgb},.45)`
          e.target.style.boxShadow = `0 0 0 3px rgba(${rgb},.08)`
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,.09)'
          e.target.style.boxShadow = 'none'
        }}
      />
      {p.showHint && (
        <span
          style={{ fontSize: 11, color: 'rgba(240,237,232,.22)', fontFamily }}
        >
          {p.hint}
        </span>
      )}
    </div>
  )
}
