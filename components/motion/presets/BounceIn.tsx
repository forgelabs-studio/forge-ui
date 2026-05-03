'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export interface BounceInPreviewProps {
  delay?: number
  scale?: number
  stiffness?: number
  damping?: number
  once?: boolean
}

export default function BounceIn({
  delay = 0,
  scale = 0.7,
  stiffness = 400,
  damping = 10,
  once = true,
}: BounceInPreviewProps) {
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <motion.div
        key={key}
        initial={prefersReduced ? false : { opacity: 0, scale }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
        transition={{ type: 'spring', stiffness, damping, delay }}
        style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)' }}
      >
        Interfaces built to a standard you can feel.
      </motion.div>

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        style={{
          marginTop: 20,
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
