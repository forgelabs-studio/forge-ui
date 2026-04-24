"use client";
import { useState, useMemo } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { TickerProps } from "@/lib/types";
import { useId } from "react";

export default function TickerRenderer({ props: p }: { props: TickerProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color ?? "#7F77DD";
  const rgb = hexRgb(col);

  const dur =
    ({ slow: "35s", normal: "20s", fast: "8s" } as Record<string, string>)[
      p.speed ?? "normal"
    ] ?? "20s";

  const [paused, setPaused] = useState(false);

  const items: string[] = useMemo(
    () =>
      Array.isArray(p.items)
        ? p.items
        : (p.items || "Landing pages,Websites,SaaS apps,Open source")
            .split(",")
            .map((x: string) => x.trim()),
    [p.items],
  );

  const doubled = useMemo(() => [...items, ...items], [items]);

  // IDs for accessibility
  const tickerRegionId = `${uid}-ticker-region`;
  const tickerAnimId = `${uid}-ticker-anim`;
  const srListId = `${uid}-ticker-list`;

  // Respect reduced motion preference
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const handleToggle = () => setPaused((s) => !s);

  return (
    <div
      role="region"
      aria-label={p.ariaLabel ?? "News ticker"}
      id={tickerRegionId}
      style={{
        width: 340,
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "10px 0",
        background: "#0f0f12",
        fontFamily,
      }}
    >
      {/* Screen-reader friendly static list of items */}
      <ul
        id={srListId}
        aria-hidden={false}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          border: 0,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>

      {/* Pause/Play control */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 8px",
          marginBottom: 6,
        }}
      >
        <button
          type="button"
          aria-controls={tickerAnimId}
          aria-pressed={paused}
          onClick={handleToggle}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,.06)",
            background: paused ? `rgba(${rgb},.12)` : "transparent",
            color: textColor,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <div style={{ fontSize: 12, color: "rgba(240,237,232,.45)" }}>
          <span aria-hidden="true">•</span>
          <span style={{ marginLeft: 8 }}>{p.label ?? "Ticker"}</span>
        </div>
      </div>

      {/* Visual ticker — marked presentation for AT to avoid repeated announcements */}
      <div
        id={tickerAnimId}
        aria-hidden={true}
        style={{
          display: "flex",
          gap: 0,
          whiteSpace: "nowrap",
          // animation is paused when user toggles or when reduced motion is preferred
          animation: prefersReduced ? "none" : `ticker ${dur} linear infinite`,
          animationPlayState: paused || prefersReduced ? "paused" : "running",
        }}
      >
        {doubled.map((item: string, i: number) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: (p.gap ?? 12) / 2,
              padding: `0 ${(p.gap ?? 12) / 2}px`,
              fontSize: 12,
              color: textColor,
            }}
          >
            <span>{item}</span>
            <span aria-hidden="true" style={{ color: `rgba(${rgb},.5)` }}>
              {p.separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
