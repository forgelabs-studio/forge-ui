'use client'
import { useState } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { TabsProps } from '@/lib/types'
export default function TabsRenderer({ props: p }: { props: TabsProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [active, setActive] = useState(p.active ?? 0)

  // Support both old tab1/tab2/tab3/tab4 props and new tabs array
  const tabs: string[] = Array.isArray(p.tabs)
  ? p.tabs
  : [p.tab1, p.tab2, p.tab3, p.tab4].filter((s): s is string => Boolean(s));

  const isPill = p.variant === 'pill',
    isLine = p.variant === 'line'
  return (
    <div style={{ width: 320 }}>
      <div
        style={{
          display: 'flex',
          ...(isPill
            ? {
                background: '#0f0f12',
                padding: 3,
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,.07)',
                gap: 2,
              }
            : { borderBottom: '1px solid rgba(255,255,255,.07)', gap: 0 }),
        }}
      >
        {tabs.map((t: string, i: number) => {
          const a = i === active
          if (isPill)
            return (
              <button
                type="button"
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  border: `1px solid ${a ? `rgba(${rgb},.28)` : 'transparent'}`,
                  background: a ? `rgba(${rgb},.1)` : 'transparent',
                  color: a ? lighten(col) : 'rgba(240,237,232,.4)',
                  fontFamily,
                  fontSize: 12,
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'all .15s',
                }}
              >
                {t}
              </button>
            )
          if (isLine)
            return (
              <button
                type="button"
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: '10px 14px',
                  border: 'none',
                  background: a ? 'rgba(255,255,255,.04)' : 'transparent',
                  color: a ? textColor : 'rgba(240,237,232,.4)',
                  fontFamily,
                  fontSize: 13,
                  cursor: 'pointer',
                  borderBottom: `2px solid ${a ? 'rgba(255,255,255,.2)' : 'transparent'}`,
                  marginBottom: -1,
                  transition: 'all .15s',
                }}
              >
                {t}
              </button>
            )
          return (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: '10px 14px',
                border: 'none',
                background: 'transparent',
                color: a ? textColor : 'rgba(240,237,232,.4)',
                fontFamily,
                fontSize: 13,
                cursor: 'pointer',
                borderBottom: `2px solid ${a ? col : 'transparent'}`,
                marginBottom: -1,
                transition: 'all .15s',
                fontWeight: a ? 400 : 300,
              }}
            >
              {t}
            </button>
          )
        })}
      </div>
      <div style={{ padding: '14px 0' }}>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(240,237,232,.4)',
            fontFamily,
            fontWeight: 300,
            lineHeight: 1.65,
          }}
        >
          {tabs[active]
            ? `${tabs[active]} — content for this tab.`
            : 'Select a tab above.'}
        </p>
      </div>
    </div>
  )
}
