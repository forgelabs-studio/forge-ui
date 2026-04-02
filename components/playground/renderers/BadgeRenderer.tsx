'use client'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BadgeRenderer({ props: p }: { props: any }) {
  const { fontFamily, resolveRadius } = useGlobals()
  const col = p.color || '#1D9E75'
  const rgb = hexRgb(col)
  // [paddingY, paddingX, fontSize]
  const sz = (
    { sm: [6, 12, 10], md: [8, 16, 12], lg: [11, 20, 14] } as Record<
      string,
      number[]
    >
  )[p.size] ?? [8, 16, 12]
  const dotSz = ({ sm: 6, md: 7, lg: 9 } as Record<string, number>)[p.size] ?? 7
  const br =
    p.variant === 'pill' ? '100px' : p.variant === 'tag' ? '4px' : '8px'
  const txt = p.uppercase
    ? (p.text || '').toUpperCase()
    : p.text || 'Open for work'
  const others: [string, string][] = [
    ['#1D9E75', 'Online'],
    ['#EF9F27', 'Away'],
    ['#e24b4a', 'Busy'],
    ['rgba(240,237,232,.18)', 'Offline'],
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: `${sz[0]}px ${sz[1]}px`,
          borderRadius: br,
          background: `rgba(${rgb},.08)`,
          border: `1px solid rgba(${rgb},.22)`,
          fontSize: sz[2],
          color: lighten(col),
          fontFamily,
        }}
      >
        {p.showDot && (
          <span
            style={{
              width: dotSz,
              height: dotSz,
              borderRadius: '50%',
              background: col,
              boxShadow: `0 0 6px rgba(${rgb},.6)`,
              animation: p.dotPulse
                ? 'pulse-dot 2s ease-in-out infinite'
                : undefined,
              display: 'inline-block',
            }}
          />
        )}
        {txt}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 7,
          justifyContent: 'center',
          opacity: 0.4,
        }}
      >
        {others.map(([c, l]) => {
          const r = hexRgb(c)
          return (
            <div
              key={l}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 11px',
                borderRadius: 100,
                background: `rgba(${r},.07)`,
                border: `1px solid rgba(${r},.18)`,
                fontSize: 11,
                color: lighten(c, 40),
                fontFamily,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: c,
                  display: 'inline-block',
                }}
              />
              {l}
            </div>
          )
        })}
      </div>
    </div>
  )
}
