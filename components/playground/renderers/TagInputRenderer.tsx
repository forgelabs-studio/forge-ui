'use client'
import { useState, useEffect } from 'react'
import { hexRgb, lighten } from './_utils'
import { useGlobals } from './_useGlobals'
import type { TagInputProps } from '@/lib/types'
export default function TagInputRenderer({ props: p }: { props: TagInputProps }) {
  const { fontFamily, textColor } = useGlobals()
  const col = p.color || '#7F77DD'
  const rgb = hexRgb(col)
  const parseTags = () =>
    Array.isArray(p.tags)
      ? p.tags
      : (p.tags || 'Next.js,TypeScript,Tailwind')
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
  const [tags, setTags] = useState<string[]>(parseTags)
  const [inp, setInp] = useState('')
  // sync when p.tags changes from PropsPanel
  useEffect(() => {
    setTags(parseTags())
  }, [p.tags]) // eslint-disable-line react-hooks/exhaustive-deps
  const add = () => {
    if (inp.trim()) {
      setTags((t) => [...t, inp.trim()])
      setInp('')
    }
  }
  const remove = (i: number) => setTags((t) => t.filter((_, j) => j !== i))
  const br = p.variant === 'pill' ? '100px' : '5px'
  return (
    <div style={{ width: 280 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          padding: 10,
          background: '#111113',
          border: '1px solid rgba(255,255,255,.09)',
          borderRadius: 8,
          minHeight: 44,
        }}
      >
        {tags.map((t: string, i: number) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              borderRadius: br,
              background: `rgba(${rgb},.1)`,
              border: `1px solid rgba(${rgb},.22)`,
              fontSize: 11,
              color: lighten(col),
              fontFamily,
            }}
          >
            {t}
            {p.removable && (
              <span
                onClick={() => remove(i)}
                style={{ cursor: 'pointer', opacity: 0.5, fontSize: 10 }}
              >
                ✕
              </span>
            )}
          </div>
        ))}
        <input
          placeholder={p.placeholder}
          value={inp}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: 12,
            color: textColor,
            fontFamily,
            minWidth: 80,
            flex: 1,
          }}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') add()
          }}
        />
      </div>
    </div>
  )
}
