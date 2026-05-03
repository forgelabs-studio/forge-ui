'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Easing } from 'framer-motion'

export interface RevealPreviewProps {
  duration?: number
  delay?: number
  ease?: Easing
  once?: boolean
}

export default function Reveal({
  duration = 0.7,
  delay = 0,
  ease = 'easeOut' as Easing,
  once = true,
}: RevealPreviewProps) {
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      {/* Wrapper must have overflow:hidden for clip-path to work */}
      <div style={{ overflow: 'hidden', display: 'inline-block' }}>
        <motion.div
          key={key}
          initial={prefersReduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          transition={{ duration, delay, ease }}
          style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)' }}
        >
          Interfaces built to a standard you can feel.
        </motion.div>
      </div>

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
