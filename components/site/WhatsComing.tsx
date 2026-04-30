'use client'

import { useEffect, useRef } from 'react'
import { ForgeAccordion } from '@/components/forge/ForgeAccordion'

const ITEMS = [
  'FORGE.tokens — coming soon',
  'FORGE.motion — coming later',
  'FORGE.blocks — coming later',
]

const BODIES = [
  'A Figma-to-code token pipeline. Connect your Figma variables, generate CSS custom properties and TypeScript types automatically. Zero runtime dependency.',
  'Animation primitives built for design engineers. Stagger groups, scroll-linked sequences, and physics-based gestures — all installable with a single npx command.',
  'Pre-composed page sections built entirely from FORGE.ui components. Drop in a hero, features grid, or pricing table and own every pixel.',
]

export default function WhatsComing() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    if (ref.current) {
      ref.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="roadmap"
      className="border-t border-[var(--line)]"
      style={{ padding: '120px 0' }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: 32 }}>
          <span className="section-tag">roadmap · what&apos;s coming</span>
        </div>

        <div
          className="reveal reveal-delay-1"
          style={{ maxWidth: 680 }}
        >
          <ForgeAccordion
            items={ITEMS}
            bodies={BODIES}
            color="#7F77DD"
            radius={10}
            allowMultiple={false}
          />
        </div>
      </div>

      <style>{`
        #roadmap .forge-accordion__trigger {
          padding: 20px 20px !important;
        }
        #roadmap .forge-accordion__body {
          padding: 0 20px 24px !important;
        }
      `}</style>
    </section>
  )
}
