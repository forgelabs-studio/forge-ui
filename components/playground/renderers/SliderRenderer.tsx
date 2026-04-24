"use client";
import { useId, useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { SliderProps } from "@/lib/types";

export default function SliderRenderer({ props: p }: { props: SliderProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [val, setVal] = useState(p.value ?? 8000);
  const [focused, setFocused] = useState(false);

  const fmt = (v: number) => `${p.unit || ""}${Number(v).toLocaleString()}`;
  const pct = ((val - p.min) / (p.max - p.min)) * 100;

  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const labelId = `${uid}-label`;
  const liveId = `${uid}-live`;
  const minId = `${uid}-min`;
  const maxId = `${uid}-max`;
  const trackId = `${uid}-track`;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}
    >
      {p.showValue && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            id={labelId}
            style={{ fontSize: 11, color: textColor, fontFamily }}
          >
            {p.label}
          </span>
          <span
            aria-live="polite"
            id={liveId}
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: lighten(col),
              fontFamily,
              letterSpacing: "-.02em",
            }}
          >
            {fmt(val)}
          </span>
        </div>
      )}

      <div style={{ position: "relative", padding: "8px 0" }}>
        <div
          id={trackId}
          aria-hidden="true"
          style={{
            height: 4,
            borderRadius: 100,
            background: "rgba(255,255,255,.08)",
            overflow: "hidden",
            boxShadow: focused ? `0 0 0 4px rgba(${rgb},.08)` : "none",
            transition: "box-shadow .12s",
          }}
        >
          <div
            style={{
              height: "100%",
              background: col,
              borderRadius: 100,
              width: `${pct}%`,
              boxShadow: `0 0 8px rgba(${rgb},.4)`,
            }}
          />
        </div>

        {/* Native range input kept for full AT/keyboard support.
            It's visually hidden but remains focusable; we add focus handlers
            to show a focus ring on the track so keyboard users see focus. */}
        <input
          aria-label={!showLabel ? p.label : undefined}
          aria-labelledby={showLabel ? labelId : undefined}
          aria-valuemin={p.min}
          aria-valuemax={p.max}
          aria-valuenow={val}
          aria-valuetext={fmt(val)}
          aria-describedby={`${minId} ${maxId}`}
          role="slider"
          type="range"
          min={p.min}
          max={p.max}
          step={p.step || 1}
          value={val}
          style={{
            WebkitAppearance: "none",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const v = +e.target.value;
            setVal(v);
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          id={minId}
          style={{ fontSize: 10, color: "var(--hint)", fontFamily }}
        >
          {fmt(p.min)}
        </span>
        <span
          id={maxId}
          style={{ fontSize: 10, color: "var(--hint)", fontFamily }}
        >
          {fmt(p.max)}
        </span>
      </div>
    </div>
  );
}
