"use client";
import { hexRgb } from "./_utils";
import { useGlobals } from "./_useGlobals";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SpinnerRenderer({ props: p }: { props: any }) {
  const { fontFamily } = useGlobals();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const sz =
    ({ sm: 24, md: 36, lg: 48, xl: 64 } as Record<string, number>)[p.size] ??
    36;
  const dur =
    ({ slow: "1.8s", normal: ".9s", fast: ".4s" } as Record<string, string>)[
      p.speed
    ] ?? ".9s";
  const renderVariant = () => {
    switch (p.variant) {
      case "ring":
        return (
          <div
            style={{
              width: sz,
              height: sz,
              borderRadius: "50%",
              border: `${sz * 0.1}px solid rgba(${rgb},.15)`,
              borderTopColor: col,
              animation: `FORGE-spin ${dur} linear infinite`,
            }}
          />
        );
      case "dots":
        return (
          <div
            style={{ display: "flex", gap: sz * 0.18, alignItems: "center" }}
          >
            {[0, 0.15, 0.3].map((d) => (
              <div
                key={d}
                style={{
                  width: sz * 0.22,
                  height: sz * 0.22,
                  borderRadius: "50%",
                  background: col,
                  animation: `bounce-keys ${dur} ease-in-out infinite`,
                  animationDelay: `${d}s`,
                }}
              />
            ))}
          </div>
        );
      case "bars":
        return (
          <div
            style={{
              display: "flex",
              gap: sz * 0.1,
              alignItems: "flex-end",
              height: sz,
            }}
          >
            {[0, 0.1, 0.2, 0.3, 0.2, 0.1].map((d, i) => (
              <div
                key={i}
                style={{
                  width: sz * 0.1,
                  borderRadius: 2,
                  background: col,
                  animation: `wave ${dur} ease-in-out infinite`,
                  animationDelay: `${d}s`,
                  height: sz,
                }}
              />
            ))}
          </div>
        );
      case "orbit":
        return (
          <div
            style={{
              width: sz,
              height: sz,
              borderRadius: "50%",
              border: `1px solid rgba(${rgb},.15)`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: sz * 0.25,
                height: sz * 0.25,
                borderRadius: "50%",
                background: `rgba(${rgb},.4)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: sz * 0.22,
                height: sz * 0.22,
                marginTop: -(sz * 0.11),
                marginLeft: -(sz * 0.11),
                borderRadius: "50%",
                background: col,
                animation: `orbit ${dur} linear infinite`,
                boxShadow: `0 0 8px rgba(${rgb},.5)`,
              }}
            />
          </div>
        );
      case "pulse":
        return (
          <div
            style={{
              width: sz,
              height: sz,
              borderRadius: "50%",
              background: `rgba(${rgb},.2)`,
              animation: `pulse-dot ${dur} ease-in-out infinite`,
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      {renderVariant()}
      {p.showLabel && (
        <span
          style={{ fontSize: 12, color: "rgba(240,237,232,.4)", fontFamily }}
        >
          {p.label}
        </span>
      )}
    </div>
  );
}
