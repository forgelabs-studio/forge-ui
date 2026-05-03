'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { motion } from 'framer-motion'

export interface CountUpPreviewProps {
  from?: number
  to?: number
  duration?: number
  once?: boolean
}

export default function CountUp({
  from = 0,
  to = 100,
  duration = 1.5,
  once = true,
}: CountUpPreviewProps) {
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.5 })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (v) => Math.round(v))
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (!inView) return
    count.set(from)
    const controls = animate(count, to, {
      duration: prefersReduced ? 0 : duration,
      ease: 'easeOut',
    })
    return controls.stop
  }, [inView, key, from, to, duration, prefersReduced, count])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <motion.span
        style={{
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {rounded}
      </motion.span>

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
