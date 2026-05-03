'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Easing } from 'framer-motion'

export interface StaggerPreviewProps {
  duration?: number
  delay?: number
  staggerDelay?: number
  distance?: number
  ease?: Easing
  once?: boolean
}

const ITEMS = [
  'Design systems',
  'Motion presets',
  'Component libraries',
  'CLI generators',
]

export default function Stagger({
  duration = 0.5,
  delay = 0,
  staggerDelay = 0.1,
  distance = 24,
  ease = 'easeOut' as Easing,
  once = true,
}: StaggerPreviewProps) {
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      {ITEMS.map((item, i) => (
        <motion.div
          key={`${key}-${i}`}
          initial={prefersReduced ? false : { opacity: 0, y: distance }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
          transition={{ duration, ease, delay: delay + i * staggerDelay }}
          style={{
            fontSize: 18,
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          {item}
        </motion.div>
      ))}

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        style={{
          marginTop: 16,
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
