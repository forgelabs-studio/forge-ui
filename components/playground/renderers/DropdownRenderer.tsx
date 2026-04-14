'use client'
import { useState } from 'react'
import { useGlobals } from './_useGlobals'
import type { DropdownProps } from '@/lib/types'
export default function DropdownRenderer({ props: p }: { props: DropdownProps }) {
  const { fontFamily, textColor } = useGlobals()
  const [open, setOpen] = useState(true)
  const items: string[] = Array.isArray(p.items)
    ? p.items
    : (p.items || 'Edit,Duplicate,Share,Archive,Delete')
        .split(',')
        .map((x: string) => x.trim())
  const dangerItems: boolean[] = Array.isArray(p.dangerItems)
    ? p.dangerItems
    : []
  const icons = ['✏', '⧉', '↗', '◁', '✕']
  return (
    <div style={{ position: 'relative', width: 200 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '9px 14px',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,.1)',
          background: '#111113',
          color: textColor,
          fontFamily,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all .2s',
          gap: 8,
        }}
      >
        {p.label}
        <span
          style={{
            fontSize: 10,
            color: 'rgba(240,237,232,.4)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s',
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div
          style={{
            position: 'relative',
            top: 5,
            width: '100%',
            background: '#111113',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,.4)',
            animation: 'slide-up .15s ease',
          }}
        >
          {items.map((item: string, i: number) => {
            const isDanger = dangerItems[i] === true
            const baseColor = isDanger
              ? 'rgba(226,75,74,.8)'
              : 'rgba(240,237,232,.7)'
            const hoverColor = isDanger ? '#e24b4a' : '#f0ede8'
            return (
              <div key={i}>
                {p.showDivider && i === items.length - 1 && (
                  <div
                    style={{
                      height: 1,
                      background: 'rgba(255,255,255,.06)',
                      margin: '4px 0',
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '9px 13px',
                    cursor: 'pointer',
                    fontFamily,
                    fontSize: 13,
                    color: baseColor,
                    transition: 'all .12s',
                  }}
                  onMouseOver={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.background =
                      'rgba(255,255,255,.04)'
                    ;(e.currentTarget as HTMLDivElement).style.color =
                      hoverColor
                  }}
                  onMouseOut={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.background =
                      'transparent'
                    ;(e.currentTarget as HTMLDivElement).style.color = baseColor
                  }}
                >
                  <span style={{ fontSize: 12, opacity: 0.5 }}>
                    {icons[i] || '•'}
                  </span>
                  {item}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
