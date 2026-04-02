'use client'
import { useEffect, useRef } from 'react'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DonutRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null)

  const rawData: string[] = Array.isArray(p.data) ? p.data : []
  const hasData = rawData.length > 0
  const defaultColors = [col, '#378ADD', '#EF9F27', '#D4537E']
  const defaultLabels = ['Direct', 'Organic', 'Referral', 'Social']
  const defaultVals = [40, 25, 22, 13]
  const labels = hasData
    ? rawData.map((s: string) => s.split(',')[0] || '')
    : defaultLabels
  const data = hasData
    ? rawData.map((s: string) => Number(s.split(',')[1]) || 0)
    : defaultVals
  const colors = labels.map((_, i) => defaultColors[i % defaultColors.length])

  useEffect(() => {
    if (!canvasRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Chart = (window as any).Chart
    if (!Chart) return
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.map((c) => `${c}cc`),
            borderColor: colors,
            borderWidth: 1,
            cutout: `${100 - p.thickness}%`,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: p.animated ? 1000 : 0 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1a1f',
            borderColor: 'rgba(255,255,255,.08)',
            borderWidth: 1,
            titleColor: '#f0ede8',
            bodyColor: 'rgba(240,237,232,.5)',
            padding: 8,
            cornerRadius: 6,
          },
        },
      },
    })
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [col, p.thickness, p.animated, p.data]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      style={{
        background: '#111113',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 10,
        padding: 18,
        width: 230,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: 'rgba(240,237,232,.55)',
          marginBottom: 12,
          fontFamily,
        }}
      >
        {p.title}
      </div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} height={170} />
        {p.showCenter && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: textColor,
                letterSpacing: '-.02em',
              }}
            >
              {p.centerText}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(240,237,232,.35)' }}>
              visitors
            </div>
          </div>
        )}
      </div>
      {p.showLabels && (
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}
        >
          {labels.map((l, i) => (
            <div
              key={l}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                color: 'rgba(240,237,232,.45)',
                fontFamily,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 2,
                  background: colors[i],
                  display: 'inline-block',
                }}
              />
              {l}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
