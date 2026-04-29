'use client'

import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

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

  return ref
}
