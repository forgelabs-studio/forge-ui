'use client'
import { useState } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AccordionRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const [openIdx, setOpenIdx] = useState(0)

  // Support plus/minus arrays (p.items + p.bodies) or legacy p.item1/body1…
  const titles: string[] = Array.isArray(p.items)
    ? p.items
    : [
        p.item1 || 'What do you build?',
        p.item2 || 'How long does it take?',
        p.item3 || 'What does it cost?',
      ]
  const bodies: string[] = Array.isArray(p.bodies)
    ? p.bodies
    : [
        p.body1 ||
          'Landing pages, marketing websites, SaaS products and web apps.',
        p.body2 || 'Most projects take 4–12 weeks depending on scope.',
        p.body3 ||
          'From £2,400 for landing pages to £8,000+ for SaaS products.',
      ]

  return (
    <div
      style={{
        width: 320,
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: p.radius ?? 10,
        overflow: 'hidden',
        background: '#0f0f12',
      }}
    >
      {titles.map((title, i) => {
        const isOpen = i === openIdx
        return (
          <div
            key={i}
            style={{
              borderBottom:
                i < titles.length - 1
                  ? '1px solid rgba(255,255,255,.06)'
                  : 'none',
            }}
          >
            <div
              onClick={() => setOpenIdx((o) => (o === i ? -1 : i))}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'background .12s',
                background: isOpen ? `rgba(${rgb},.04)` : 'transparent',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: textColor,
                  fontFamily,
                  fontWeight: isOpen ? 400 : 300,
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: `rgba(${rgb},${isOpen ? 0.7 : 0.25})`,
                  transition: 'transform .25s',
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                }}
              >
                {isOpen ? '×' : '+'}
              </span>
            </div>
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? 500 : 0,
                opacity: isOpen ? 1 : 0,
                transition: 'max-height .3s ease, opacity .25s ease',
              }}
            >
              <div style={{ padding: '0 16px 16px 16px' }}>
                <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(240,237,232,.45)',
                    fontFamily,
                    lineHeight: 1.65,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {bodies[i] || ''}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
