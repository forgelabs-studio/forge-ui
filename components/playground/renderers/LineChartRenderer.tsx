'use client'
import { useEffect, useRef } from 'react'
import { hexRgb } from './_utils'
import { useGlobals } from './_useGlobals'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LineChartRenderer({ props: p }: { props: any }) {
  const { fontFamily } = useGlobals()
  const col = p.color || '#1D9E75'
  const rgb = hexRgb(col)
  const col2 = p.color2 || '#EF9F27'
  const rgb2 = hexRgb(col2)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null)

  const rawData: string[] = Array.isArray(p.data) ? p.data : []
  const hasData = rawData.length > 0
  const labels = hasData
    ? rawData.map((s: string) => s.split(',')[0] || '')
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  const vals1 = hasData
    ? rawData.map((s: string) => Number(s.split(',')[1]) || 0)
    : [2.1, 3.4, 2.8, 4.2, 3.9, 5.8, 5.2, 7.1]
  const vals2 = hasData
    ? rawData.map((s: string) => Number(s.split(',')[2]) || 0)
    : [0.8, 1.2, 1, 1.8, 2.1, 2.8, 2.4, 3.6]

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
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: vals1,
            borderColor: col,
            backgroundColor: `rgba(${rgb},.07)`,
            tension: p.tension,
            fill: p.fill,
            borderWidth: 2,
            pointBackgroundColor: col,
            pointRadius: p.showDots ? 3 : 0,
            pointHoverRadius: 5,
          },
          {
            data: vals2,
            borderColor: col2,
            backgroundColor: `rgba(${rgb2},.07)`,
            tension: p.tension,
            fill: p.fill,
            borderWidth: 2,
            pointBackgroundColor: col2,
            pointRadius: p.showDots ? 3 : 0,
            pointHoverRadius: 5,
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
        scales: {
          x: {
            grid: { display: p.showGrid, color: 'rgba(255,255,255,.05)' },
            ticks: {
              color: 'rgba(240,237,232,.3)',
              font: { size: 10, family: fontFamily },
            },
          },
          y: {
            grid: { display: p.showGrid, color: 'rgba(255,255,255,.05)' },
            ticks: {
              color: 'rgba(240,237,232,.3)',
              font: { size: 10, family: fontFamily },
            },
            border: { display: false },
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
  }, [col, col2, p.tension, p.fill, p.animated, p.showGrid, p.showDots, p.data]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      style={{
        background: '#111113',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 10,
        padding: 18,
        width: 300,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: 'rgba(240,237,232,.55)',
          marginBottom: 14,
          fontFamily,
        }}
      >
        {p.title}
      </div>
      <canvas ref={canvasRef} height={150} />
    </div>
  )
}
