'use client'
import { lighten } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BreadcrumbRenderer({ props: p }: { props: any }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#7F77DD'
  const items = (p.items || 'Home,Components,Button')
    .split(',')
    .map((x: string) => x.trim())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        {p.showHome && (
          <>
            <a
              style={{
                fontSize: 12,
                color: 'rgba(240,237,232,.4)',
                fontFamily,
                cursor: 'pointer',
                transition: 'color .12s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = 'rgba(240,237,232,.4)')
              }
            >
              ⌂
            </a>
            <span style={{ color: 'rgba(240,237,232,.2)', fontSize: 12 }}>
              {p.separator}
            </span>
          </>
        )}
        {items.map((item: string, i: number) => (
          <>
            {i > 0 && (
              <span
                key={`sep-${i}`}
                style={{ color: 'rgba(240,237,232,.2)', fontSize: 12 }}
              >
                {p.separator}
              </span>
            )}
            <a
              key={item}
              style={{
                fontSize: 12,
                color:
                  i === items.length - 1
                    ? lighten(col)
                    : 'rgba(240,237,232,.4)',
                fontFamily,
                cursor: 'pointer',
                fontWeight: i === items.length - 1 ? 400 : 300,
                transition: 'color .12s',
              }}
            >
              {item}
            </a>
          </>
        ))}
      </nav>
      <div
        style={{
          opacity: 0.35,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
        }}
      >
        {[
          ['Home', 'Docs', 'Button'],
          ['Home', 'Charts', 'Donut'],
        ].map((trail, ti) => (
          <nav
            key={ti}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            {trail.map((item, i) => (
              <>
                <span
                  key={`s${i}`}
                  style={{
                    color: 'rgba(240,237,232,.2)',
                    fontSize: 11,
                    display: i > 0 ? undefined : 'none',
                  }}
                >
                  /
                </span>
                <span
                  key={item}
                  style={{
                    fontSize: 11,
                    color:
                      i === trail.length - 1
                        ? 'rgba(240,237,232,.6)'
                        : 'rgba(240,237,232,.3)',
                    fontFamily,
                  }}
                >
                  {item}
                </span>
              </>
            ))}
          </nav>
        ))}
      </div>
    </div>
  )
}
