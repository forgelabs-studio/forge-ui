import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "FORGE.ui — Spectrum-aware, motion-first React components"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const SPECTRUM = ["#7F77DD", "#378ADD", "#1D9E75", "#EF9F27", "#D4537E", "#e24b4a"]

export default async function Image() {
  let fontData: ArrayBuffer | null = null
  try {
    fontData = await fetch(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
    ).then((r) => r.arrayBuffer())
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Spectrum gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #7F77DD 0%, #378ADD 20%, #1D9E75 40%, #EF9F27 60%, #D4537E 80%, #e24b4a 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "80px",
            paddingTop: "110px",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: "28px" }}>
            <span
              style={{
                color: "#f0ede8",
                fontSize: "104px",
                fontWeight: 400,
                letterSpacing: "-4px",
                lineHeight: 1,
              }}
            >
              FORGE
            </span>
            <span
              style={{
                color: "#7F77DD",
                fontSize: "104px",
                fontWeight: 400,
                letterSpacing: "-4px",
                lineHeight: 1,
              }}
            >
              .ui
            </span>
          </div>

          <div
            style={{
              color: "rgba(240, 237, 232, 0.5)",
              fontSize: "30px",
              fontWeight: 400,
              letterSpacing: "-0.5px",
              lineHeight: 1.5,
              maxWidth: "680px",
            }}
          >
            Spectrum-aware, motion-first React components.
            <br />
            Configure visually. One command. Own the code.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px 64px",
          }}
        >
          <span
            style={{
              color: "rgba(240, 237, 232, 0.25)",
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "0.5px",
            }}
          >
            forgelabs.studio
          </span>

          <div style={{ display: "flex", gap: "14px" }}>
            {SPECTRUM.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.75,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: "Inter", data: fontData, style: "normal", weight: 400 }] }
        : {}),
    }
  )
}
