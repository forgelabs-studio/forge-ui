'use client'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { AvatarProps } from '@/lib/types'
export default function AvatarRenderer({ props: p }: { props: AvatarProps }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const szMap: Record<string, number> = {
    xs: 20,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 88,
  }
  const sc: Record<string, string> = {
    online: '#1D9E75',
    away: '#EF9F27',
    busy: '#e24b4a',
    offline: 'rgba(240,237,232,.2)',
  }
  const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
  // opacity: xl=1, lg=0.5, md=0.3, sm=0.2, xs=0.1
  const opacityMap: Record<string, number> = {
    xl: 1,
    lg: 0.5,
    md: 0.3,
    sm: 0.2,
    xs: 0.1,
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {sizes.map((sz) => {
        const sn = szMap[sz]
        const isMain = sz === p.size
        const br =
          p.shape === 'circle'
            ? '50%'
            : p.shape === 'squircle'
              ? `${sn * 0.28}px`
              : '8px'
        const op = isMain ? 1 : opacityMap[sz]
        return (
          <div key={sz} style={{ position: 'relative', opacity: op }}>
            <div
              style={{
                width: sn,
                height: sn,
                borderRadius: br,
                background: `rgba(${rgb},.2)`,
                border: p.showRing
                  ? `2px solid rgba(${rgb},.5)`
                  : '1px solid rgba(255,255,255,.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: Math.max(sn * 0.28, 8),
                fontWeight: 500,
                color: lighten(col),
                fontFamily,
                letterSpacing: '-.02em',
              }}
            >
              {p.initials}
            </div>
            {p.showStatus && isMain && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: Math.max(7, sn * 0.14),
                  height: Math.max(7, sn * 0.14),
                  borderRadius: '50%',
                  background: sc[p.status] || sc.online,
                  border: '2px solid #09090b',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
