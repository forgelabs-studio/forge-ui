'use client'
import { useState, useEffect } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ToggleRenderer({ props: p }: { props: any }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [on, setOn] = useState(!!p.checked)
  // sync when prop changes from PropsPanel
  useEffect(() => {
    setOn(!!p.checked)
  }, [p.checked])
  const sz = (
    {
      sm: [32, 18, 12, 14],
      md: [40, 22, 14, 18],
      lg: [52, 28, 20, 24],
    } as Record<string, number[]>
  )[p.size] ?? [40, 22, 14, 18]
  const off = sz[2] + 4
  return (
    <label
      onClick={() => setOn((v) => !v)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        userSelect: 'none',
        flexDirection: p.labelPos === 'left' ? 'row-reverse' : 'row',
      }}
    >
      <div
        style={{
          width: sz[0],
          height: sz[1],
          borderRadius: 100,
          background: on ? `rgba(${rgb},.2)` : '#1a1a1d',
          border: `1px solid ${on ? `rgba(${rgb},.4)` : 'rgba(255,255,255,.09)'}`,
          position: 'relative',
          transition: 'all .25s',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: (sz[1] - sz[2]) / 2 - 1,
            left: 3,
            width: sz[2],
            height: sz[2],
            borderRadius: '50%',
            background: on ? col : 'rgba(240,237,232,.25)',
            transition: 'all .25s',
            transform: on ? `translateX(${off}px)` : 'none',
            boxShadow: on ? `0 0 10px rgba(${rgb},.5)` : 'none',
            display: 'block',
          }}
        />
      </div>
      {p.showLabel && (
        <span
          style={{ fontSize: sz[3], color: 'rgba(240,237,232,.6)', fontFamily }}
        >
          {p.label}
        </span>
      )}
    </label>
  )
}
