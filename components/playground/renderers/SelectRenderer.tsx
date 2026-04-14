'use client'
import { useState, useEffect, useRef } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { SelectProps } from '@/lib/types'
export default function SelectRenderer({ props: p }: { props: SelectProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const sz = (
    { sm: [7, 11], md: [9, 13], lg: [12, 15] } as Record<string, number[]>
  )[p.size] ?? [9, 13]
  const opts: string[] = Array.isArray(p.options)
    ? p.options
    : (p.options || '')
        .split(',')
        .map((o: string) => o.trim())
        .filter(Boolean)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const hoverCol = p.hoverColor || col

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const triggerText = selected || p.placeholder || 'Choose…'

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 260 }}
      ref={ref}
    >
      {p.showLabel && (
        <label style={{ fontSize: 11, color: textColor, fontFamily }}>
          {p.label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {/* Trigger */}
        <div
          onClick={() => setOpen((v) => !v)}
          style={{
            width: '100%',
            background: '#111113',
            border: `1px solid ${open ? `rgba(${rgb},.45)` : 'rgba(255,255,255,.09)'}`,
            boxShadow: open ? `0 0 0 3px rgba(${rgb},.08)` : 'none',
            borderRadius: p.radius,
            padding: `${sz[0]}px 32px ${sz[0]}px 12px`,
            fontSize: sz[1],
            color: selected ? textColor : 'rgba(240,237,232,.3)',
            fontFamily,
            cursor: 'pointer',
            transition: 'all .2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{triggerText}</span>
          <span
            style={{
              color: 'rgba(240,237,232,.3)',
              fontSize: 10,
              pointerEvents: 'none',
              transition: 'transform .2s',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          >
            ▾
          </span>
        </div>
        {/* Dropdown panel */}
        {open && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              zIndex: 100,
              background: '#18181b',
              border: '1px solid rgba(255,255,255,.09)',
              borderRadius: p.radius,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,.5)',
            }}
          >
            {opts.map((o: string) => (
              <div
                key={o}
                onClick={() => {
                  setSelected(o)
                  setOpen(false)
                }}
                style={{
                  padding: `${sz[0] + 2}px 12px`,
                  fontSize: sz[1],
                  fontFamily,
                  color:
                    selected === o ? lighten(hoverCol) : 'rgba(240,237,232,.7)',
                  background:
                    selected === o
                      ? `rgba(${hexRgb(hoverCol)},.1)`
                      : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background .15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.background =
                    `rgba(${hexRgb(hoverCol)},.07)`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.background =
                    selected === o
                      ? `rgba(${hexRgb(hoverCol)},.1)`
                      : 'transparent'
                }}
              >
                {o}
                {selected === o && (
                  <span style={{ fontSize: 10, color: lighten(hoverCol) }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
