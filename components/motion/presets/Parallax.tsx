'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface ParallaxPreviewProps {
  speed?: number
}

export default function Parallax({ speed = 0.3 }: ParallaxPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -80}px`, `${speed * 80}px`]
  )

  return (
    <div
      ref={containerRef}
      style={{
        height: 320,
        width: '100%',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Spacer to allow scroll */}
      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--hint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          ↓ scroll
        </span>
      </div>

      <div ref={targetRef} style={{ padding: '40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          style={{
            y: prefersReduced ? 0 : y,
            fontSize: 24,
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            textAlign: 'center',
          }}
        >
          Interfaces built<br />to a standard<br />you can feel.
        </motion.div>
      </div>

      {/* Spacer to allow scroll */}
      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--hint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          ↑ scroll
        </span>
      </div>
    </div>
  )
}
