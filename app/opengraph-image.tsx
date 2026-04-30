import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FORGE.labs - Tools for design engineers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SPECTRUM = [
  "#7F77DD",
  "#378ADD",
  "#1D9E75",
  "#EF9F27",
  "#D4537E",
  "#e24b4a",
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(9,9,11,0.85) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "#f0ede8",
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            FORGE.labs
          </span>
          <span
            style={{
              color: "#f0ede8",
              fontSize: 72,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 860,
            }}
          >
            Tools for design engineers.
          </span>
          <span
            style={{
              color: "rgba(240,237,232,0.48)",
              fontSize: 28,
              fontWeight: 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              maxWidth: 720,
            }}
          >
            Configure visually. No runtime. Own the code forever.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "rgba(240,237,232,0.3)",
              fontSize: 18,
              fontFamily: "monospace",
              letterSpacing: "0.02em",
            }}
          >
            forgelabs.studio
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {SPECTRUM.map((color) => (
              <div
                key={color}
                style={{
                  width: 22,
                  height: 22,
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
    size,
  );
}
