'use client'

import { motion } from 'framer-motion'

export interface PulsePreviewProps {
  duration?: number
  scale?: number
}

export default function Pulse({ duration = 2, scale = 1.05 }: PulsePreviewProps) {
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div
        animate={prefersReduced ? {} : { scale: [1, scale, 1] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)' }}
      >
        Interfaces built to a standard you can feel.
      </motion.div>
    </div>
  )
}
