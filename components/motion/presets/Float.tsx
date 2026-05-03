'use client'

import { motion } from 'framer-motion'

export interface FloatPreviewProps {
  duration?: number
  distance?: number
}

export default function Float({ duration = 3, distance = 12 }: FloatPreviewProps) {
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -distance, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)' }}
      >
        Interfaces built to a standard you can feel.
      </motion.div>
    </div>
  )
}
