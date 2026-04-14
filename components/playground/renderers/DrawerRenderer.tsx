'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { DrawerProps } from '@/lib/types'
export default function DrawerRenderer({ props: p }: { props: DrawerProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [open, setOpen] = useState(true)
  const w = Math.min(p.width || 240, 360)
  const body =
    p.body ||
    'Drawer content goes here. Forms, navigation, settings, or anything you need.'
  return (
    <div
      style={{
        position: 'relative',
        width: w,
        height: 300,
        background: '#0a0a0b',
        border: '1px solid rgba(255,255,255,.06)',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {p.showOverlay && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,.5)',
            zIndex: 1,
            opacity: open ? 0.7 : 0,
            transition: 'opacity .3s',
            pointerEvents: open ? 'auto' : 'none',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          [p.side === 'right' ? 'right' : 'left']: 0,
          bottom: 0,
          width: 220,
          background: '#111113',
          borderLeft:
            p.side === 'right' ? '1px solid rgba(255,255,255,.08)' : undefined,
          borderRight:
            p.side === 'left' ? '1px solid rgba(255,255,255,.08)' : undefined,
          zIndex: 2,
          transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
          transform: open
            ? 'translateX(0)'
            : `translateX(${p.side === 'right' ? '100%' : '-100%'})`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 17px',
            borderBottom: '1px solid rgba(255,255,255,.07)',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: textColor,
              fontFamily,
            }}
          >
            {p.title}
          </span>
          <div
            onClick={() => setOpen(false)}
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 11,
              color: 'rgba(240,237,232,.4)',
            }}
          >
            ✕
          </div>
        </div>
        <div style={{ padding: 17 }}>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(240,237,232,.45)',
              fontFamily,
              fontWeight: 300,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {body}
          </p>
          <div
            style={{
              marginTop: 14,
              padding: 13,
              background: `rgba(${rgb},.07)`,
              border: `1px solid rgba(${rgb},.15)`,
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 11, color: lighten(col), fontFamily }}>
              Accent colour panel.
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 0,
          opacity: open ? 0.3 : 1,
          transition: 'opacity .3s',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            padding: '9px 18px',
            borderRadius: 8,
            border: `1px solid rgba(${rgb},.28)`,
            background: `rgba(${rgb},.08)`,
            color: lighten(col),
            fontFamily,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {open ? 'Close' : 'Open'} drawer
        </button>
      </div>
    </div>
  )
}
