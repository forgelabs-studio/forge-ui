import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FORGE.labs — Tools for design engineers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          padding: '64px 72px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radial vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(9,9,11,0.85) 100%)',
          }}
        />

        {/* Top-left: FORGE.labs */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: '#f0ede8',
              fontSize: 48,
              fontWeight: 500,
              letterSpacing: '-0.03em',
            }}
          >
            FORGE.labs
          </span>
        </div>

        {/* Centre block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: '#f0ede8',
              fontSize: 64,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Tools for design engineers.
          </span>
          <span
            style={{
              color: 'rgba(240,237,232,0.45)',
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
            }}
          >
            Configure visually. No runtime. Own the code forever.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Bottom-left: domain */}
          <span
            style={{
              color: 'rgba(240,237,232,0.3)',
              fontSize: 18,
              fontFamily: 'monospace',
              letterSpacing: '0.02em',
            }}
          >
            forgelabs.studio
          </span>

          {/* Bottom-right: version pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(127,119,221,0.2)',
              border: '1px solid rgba(127,119,221,0.4)',
              borderRadius: 6,
              padding: '6px 14px',
            }}
          >
            <span
              style={{
                color: '#7F77DD',
                fontSize: 14,
                fontFamily: 'monospace',
                letterSpacing: '0.04em',
              }}
            >
              forge.ui · v0.3.0
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
