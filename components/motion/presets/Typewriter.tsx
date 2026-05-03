'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

export interface TypewriterPreviewProps {
  text?: string
  speed?: number
  once?: boolean
}

export default function Typewriter({
  text = 'Interfaces built to a standard you can feel.',
  speed = 40,
  once = true,
}: TypewriterPreviewProps) {
  const [key, setKey] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) {
      setDisplayed(text)
      return
    }
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [inView, key, text, speed, prefersReduced])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <span
        style={{
          fontSize: 24,
          fontWeight: 300,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {displayed}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: 'var(--purple)',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'pulse 1s step-end infinite',
          }}
          aria-hidden="true"
        />
      </span>

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        style={{
          marginTop: 20,
          display: 'block',
          margin: '20px auto 0',
          padding: '6px 14px',
          borderRadius: 6,
          border: '1px solid var(--line)',
          background: 'transparent',
          color: 'var(--muted)',
          fontFamily: 'var(--font)',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        ↺ Replay
      </button>
    </div>
  )
}
