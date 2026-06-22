'use client'

import Link from 'next/link'

export default function PlaygroundPage() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '40px 24px',
        background: 'var(--bg)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font)',
          fontSize: 12,
          color: 'var(--muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Select a playground
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/playground/ui" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 260,
              padding: '28px 28px 24px',
              background: 'var(--bg2)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(127,119,221,0.5)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 32px rgba(127,119,221,0.08)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: 'rgba(127,119,221,0.12)',
                  border: '1px solid rgba(127,119,221,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(127,119,221,0.9)" strokeWidth="1.4">
                  <rect x="1" y="1" width="5" height="5" rx="1" />
                  <rect x="8" y="1" width="5" height="5" rx="1" />
                  <rect x="1" y="8" width="5" height="5" rx="1" />
                  <rect x="8" y="8" width="5" height="5" rx="1" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>FORGE.ui</div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>41 components</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Spectrum-aware React components. Configure visually, copy one command, own the files.
            </p>
            <div
              style={{
                marginTop: 20,
                fontFamily: 'var(--font)',
                fontSize: 12,
                color: 'rgba(127,119,221,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Open playground
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/playground/motion" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 260,
              padding: '28px 28px 24px',
              background: 'var(--bg2)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(55,138,221,0.5)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 32px rgba(55,138,221,0.08)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: 'rgba(55,138,221,0.12)',
                  border: '1px solid rgba(55,138,221,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(55,138,221,0.9)" strokeWidth="1.4">
                  <path d="M2 7c0-2.76 2.24-5 5-5s5 2.24 5 5" strokeLinecap="round" />
                  <path d="M7 4v3l2 1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>FORGE.motion</div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>14 presets</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Scroll-triggered and viewport-aware animation presets. Built on Framer Motion.
            </p>
            <div
              style={{
                marginTop: 20,
                fontFamily: 'var(--font)',
                fontSize: 12,
                color: 'rgba(55,138,221,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Open playground
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/playground/ascii" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 260,
              padding: '28px 28px 24px',
              background: 'var(--bg2)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(239,159,39,0.5)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 32px rgba(239,159,39,0.08)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: 'rgba(239,159,39,0.12)',
                  border: '1px solid rgba(239,159,39,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(239,159,39,0.9)" strokeWidth="1.4">
                  <path d="M2 3h10M2 7h6M2 11h8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>FORGE.ascii</div>
                <div style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>image to art</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Turn an image into animated ASCII art on canvas. Export self-contained HTML and CSS — zero dependencies.
            </p>
            <div
              style={{
                marginTop: 20,
                fontFamily: 'var(--font)',
                fontSize: 12,
                color: 'rgba(239,159,39,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Open playground
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
