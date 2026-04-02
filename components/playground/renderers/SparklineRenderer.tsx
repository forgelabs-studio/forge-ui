'use client'
import { useEffect, useRef } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SparklineRenderer({ props: p }: { props: any }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null)
  const height = p.height || 60

  const rawData: string[] = Array.isArray(p.data) ? p.data : []
  const data =
    rawData.length > 0
      ? rawData.map((s: string) => Number(s.split(',')[1] ?? s) || 0)
      : [4, 7, 5, 9, 6, 11, 8, 13, 10, 15, 12, 16]

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
      type: p.variant || 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: col,
            backgroundColor: p.fill ? `rgba(${rgb},.1)` : 'transparent',
            borderWidth: 2,
            pointRadius: [...Array(data.length - 1).fill(0), p.showDot ? 3 : 0],
            pointBackgroundColor: col,
            tension: 0.4,
            fill: p.fill,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: p.animated ? 800 : 0 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1a1f',
            borderColor: 'rgba(255,255,255,.08)',
            borderWidth: 1,
            titleColor: '#f0ede8',
            bodyColor: 'rgba(240,237,232,.5)',
            padding: 6,
            cornerRadius: 5,
          },
        },
        scales: { x: { display: false }, y: { display: false } },
      },
    })
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [col, p.fill, p.showDot, p.animated, p.variant, p.data]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      style={{
        background: '#111113',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 10,
        padding: '16px 20px',
        width: 260,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: textColor,
            fontFamily,
            letterSpacing: '-.03em',
          }}
        >
          £24,100
        </span>
        <span
          style={{ fontSize: 11, color: 'rgba(29,158,117,.8)', fontFamily }}
        >
          +18.2%
        </span>
      </div>
      <div style={{ height, position: 'relative' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
