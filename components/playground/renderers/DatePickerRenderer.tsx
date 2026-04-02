'use client'
import { useState } from 'react'
import { hexRgb, contrast } from './_utils'
import { useGlobals } from './_useGlobals'
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DatePickerRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor, resolveRadius } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const initDate = new Date(p.selectedDate || '2025-03-15')
  const [yr, setYr] = useState(initDate.getFullYear())
  const [mo, setMo] = useState(initDate.getMonth())
  const [sel, setSel] = useState(initDate.getDate())
  const firstDay = new Date(yr, mo, 1).getDay()
  const daysInMonth = new Date(yr, mo + 1, 0).getDate()
  const cells: (number | '')[] = [
    ...Array(firstDay).fill(''),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  function prevMonth() {
    if (mo === 0) {
      setMo(11)
      setYr((y) => y - 1)
    } else setMo((m) => m - 1)
  }
  function nextMonth() {
    if (mo === 11) {
      setMo(0)
      setYr((y) => y + 1)
    } else setMo((m) => m + 1)
  }
  return (
    <div style={{ width: 258 }}>
      {p.showLabel && (
        <label
          style={{
            fontSize: 11,
            color: 'rgba(240,237,232,.45)',
            fontFamily,
            display: 'block',
            marginBottom: 8,
          }}
        >
          {p.label}
        </label>
      )}
      <div
        style={{
          background: '#111113',
          border: '1px solid rgba(255,255,255,.09)',
          borderRadius: resolveRadius(p.radius),
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '11px 14px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <button
            onClick={prevMonth}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(240,237,232,.4)',
              cursor: 'pointer',
              fontSize: 14,
              padding: '2px 6px',
            }}
          >
            ‹
          </button>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: textColor,
              fontFamily,
            }}
          >
            {MONTHS[mo]} {yr}
          </span>
          <button
            onClick={nextMonth}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(240,237,232,.4)',
              cursor: 'pointer',
              fontSize: 14,
              padding: '2px 6px',
            }}
          >
            ›
          </button>
        </div>
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7,1fr)',
              gap: 2,
              marginBottom: 4,
            }}
          >
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: 'rgba(240,237,232,.25)',
                  padding: 4,
                  fontFamily,
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7,1fr)',
              gap: 2,
            }}
          >
            {cells.map((d, i) =>
              d === '' ? (
                <div key={i} />
              ) : (
                <div
                  key={i}
                  onClick={() => setSel(d)}
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    padding: '6px 2px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontFamily,
                    transition: 'all .12s',
                    background: d === sel ? col : 'transparent',
                    color: d === sel ? contrast(col) : 'rgba(240,237,232,.6)',
                  }}
                  onMouseOver={(e) => {
                    if (d !== sel)
                      (e.target as HTMLElement).style.background =
                        `rgba(${rgb},.12)`
                  }}
                  onMouseOut={(e) => {
                    if (d !== sel)
                      (e.target as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {d}
                </div>
              ),
            )}
          </div>
        </div>
        <div
          style={{
            padding: '9px 14px',
            borderTop: '1px solid rgba(255,255,255,.06)',
            fontSize: 11,
            color: 'rgba(240,237,232,.4)',
            fontFamily,
          }}
        >
          {MONTHS[mo].slice(0, 3)} {sel}, {yr}
        </div>
      </div>
    </div>
  )
}
