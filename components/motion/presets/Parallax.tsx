'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface ParallaxPreviewProps {
  speed?: number
}

export default function Parallax({ speed = 0.3 }: ParallaxPreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <div
      ref={ref}
      style={{
        height: 200,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        style={{
          y,
          fontSize: 24,
          fontWeight: 300,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          textAlign: 'center',
        }}
      >
        Scroll to see parallax
      </motion.div>
    </div>
  )
}
