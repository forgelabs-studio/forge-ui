'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { CardProps } from '@/lib/types'
export default function CardRenderer({ props: p }: { props: CardProps }) {
  const { fontFamily, textColor, resolveRadius } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: hovered ? '#161618' : '#111113',
        border: `1px solid ${hovered ? `rgba(${rgb},.22)` : 'rgba(255,255,255,.07)'}`,
        borderRadius: resolveRadius(p.radius),
        padding: p.padding,
        width: p.width ?? 280,
        cursor: 'pointer',
        transition: 'all .3s',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 12px 40px rgba(${rgb},.09)` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* bottom-up linear gradient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: `linear-gradient(to top, ${col}, transparent)`,
          filter: 'blur(8px)',
          opacity: hovered ? 0.5 : 0,
          transition: 'opacity .4s',
          pointerEvents: 'none',
        }}
      />

      {p.showTag && (
        <div
          style={{
            fontSize: 10,
            color: 'rgba(240,237,232,.22)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          {p.tag}
        </div>
      )}
      <div
        style={{
          fontSize: 16,
          fontWeight: 300,
          letterSpacing: '-.02em',
          marginBottom: 8,
          color: textColor,
          position: 'relative',
          zIndex: 1,
          fontFamily,
        }}
      >
        {p.title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'rgba(240,237,232,.45)',
          fontWeight: 300,
          lineHeight: 1.65,
          position: 'relative',
          zIndex: 1,
          fontFamily,
        }}
      >
        {p.subtitle}
      </div>
      {p.showBadge && (
        <div
          style={{
            marginTop: 14,
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: 5,
            fontSize: 10,
            background: `rgba(${rgb},.12)`,
            color: lighten(col),
            border: `1px solid rgba(${rgb},.22)`,
            position: 'relative',
            zIndex: 1,
            fontFamily,
          }}
        >
          {p.badge}
        </div>
      )}
    </div>
  )
}
