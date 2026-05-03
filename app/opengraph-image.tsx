import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FORGE.labs - Tools for design engineers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Grid — vertical lines */}
        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: i * 40,
              top: 0,
              width: 1,
              height: 630,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        ))}
        {/* Grid — horizontal lines */}
        {Array.from({ length: 17 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: i * 40,
              left: 0,
              width: 1200,
              height: 1,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        ))}


        {/* Main content row */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            padding: "56px 80px 0",
            position: "relative",
            zIndex: 1,
            gap: 64,
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 20,
            }}
          >
            {/* Badge */}
            <div style={{ display: "flex" }}>
              <span
                style={{
                  background: "rgba(127,119,221,0.12)",
                  border: "1px solid rgba(127,119,221,0.28)",
                  borderRadius: 99,
                  padding: "5px 16px",
                  color: "#7F77DD",
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                forge.ui · v0.4.0
              </span>
            </div>

            {/* Heading */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#f0ede8",
                  fontSize: 64,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.04,
                }}
              >
                Ship polished
              </span>
              <span
                style={{
                  color: "#f0ede8",
                  fontSize: 64,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.04,
                }}
              >
                React components
              </span>
              <span
                style={{
                  color: "#7F77DD",
                  fontSize: 64,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.04,
                }}
              >
                you own.
              </span>
            </div>

            {/* Italic tagline */}
            <span
              style={{
                color: "rgba(240,237,232,0.7)",
                fontSize: 22,
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              Configure visually. Copy once. Keep the code.
            </span>

            {/* Body */}
            <span
              style={{
                color: "rgba(240,237,232,0.42)",
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 420,
              }}
            >
              Production-ready React components with editable props, CSS
              included, and no package lock-in.
            </span>
          </div>

          {/* RIGHT COLUMN — Terminal mockup */}
          <div style={{ display: "flex", width: 420, flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "#09090b",
              }}
            >
              {/* Title bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 16px",
                  height: 38,
                  background: "#0f0f12",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#e24b4a",
                      opacity: 0.75,
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#EF9F27",
                      opacity: 0.75,
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#1D9E75",
                      opacity: 0.75,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "rgba(240,237,232,0.2)",
                    marginLeft: 8,
                  }}
                >
                  terminal
                </span>
              </div>

              {/* Terminal body */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "18px 20px",
                  fontFamily: "monospace",
                  fontSize: 14,
                  lineHeight: 2,
                }}
              >
                {/* Command */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(127,119,221,0.5)" }}>$</span>
                  <span style={{ color: "#f0ede8" }}>
                    npx @forgelabs-studio/ui add button
                  </span>
                </div>
                {/* Output */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#1D9E75" }}>+</span>
                  <span style={{ color: "rgba(240,237,232,0.5)" }}>
                    ForgeButton.tsx
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#1D9E75" }}>+</span>
                  <span style={{ color: "rgba(240,237,232,0.5)" }}>
                    ForgeButton.css
                  </span>
                </div>
                {/* Import block */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 12,
                    borderRadius: 6,
                    padding: "10px 14px",
                    background: "#0f0f12",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <span style={{ color: "rgba(127,119,221,0.6)" }}>
                      {"import "}
                    </span>
                    <span style={{ color: "#f0ede8" }}>{"{ ForgeButton } "}</span>
                    <span style={{ color: "rgba(127,119,221,0.6)" }}>from</span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <span style={{ color: "#5dcaa5", marginLeft: 16 }}>
                      {"'@/components/forge/ForgeButton'"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spectrum bar */}
        <div
          style={{
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #e24b4a, #EF9F27, #f5e642, #1D9E75, #378ADD, #7F77DD, #D4537E, transparent)",
            opacity: 0.65,
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            padding: "0 80px 44px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "rgba(240,237,232,0.25)",
              fontSize: 16,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            forgelabs.studio
          </span>
        </div>
      </div>
    ),
    size,
  );
}
