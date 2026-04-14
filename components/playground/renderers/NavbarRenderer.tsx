'use client'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { NavbarProps } from '@/lib/types'
export default function NavbarRenderer({ props: p }: { props: NavbarProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const isDark = p.variant === 'dark'
  const bg = isDark ? '#0f0f12' : 'rgba(255,255,255,.95)'
  const tc = isDark ? 'rgba(240,237,232,.6)' : 'rgba(0,0,0,.6)'
  const links: string[] = Array.isArray(p.links)
    ? p.links
    : (p.links || 'Work,About,Services,Contact')
        .split(',')
        .map((s: string) => s.trim())
  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <nav
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0 16px',
          height: 50,
          background: bg,
          border: `1px solid ${isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
          borderRadius: 10,
        }}
      >
        {/* Left: brand */}
        <div>
          {p.showLogo && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '-.02em',
                color: textColor,
                fontFamily,
              }}
            >
              {p.brand}
            </div>
          )}
        </div>
        {/* Center: links */}
        <div style={{ display: 'flex', gap: 2 }}>
          {links.map((l: string, i: number) => (
            <a
              key={i}
              style={{
                padding: '6px 11px',
                borderRadius: 6,
                fontSize: 12,
                color: i === 0 ? textColor : tc,
                fontFamily,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all .15s',
                background:
                  i === 0
                    ? isDark
                      ? 'rgba(255,255,255,.06)'
                      : 'rgba(0,0,0,.05)'
                    : 'transparent',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = textColor)}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = i === 0 ? textColor : tc)
              }
            >
              {l}
            </a>
          ))}
        </div>
        {/* Right: CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {p.showCta && (
            <button
              style={{
                padding: '7px 14px',
                borderRadius: 7,
                border: `1px solid rgba(${rgb},.3)`,
                background: `rgba(${rgb},.1)`,
                color: lighten(col),
                fontFamily,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {p.ctaText}
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}
