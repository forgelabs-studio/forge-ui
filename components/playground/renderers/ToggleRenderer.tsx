"use client";
import { useId, useEffect, useState } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { ToggleProps } from "@/lib/types";

export default function ToggleRenderer({ props: p }: { props: ToggleProps }) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  // controlled internal state, synced from props
  const [on, setOn] = useState<boolean>(!!p.checked);
  useEffect(() => {
    setOn(!!p.checked);
  }, [p.checked]);

  const sz = (
    {
      sm: [32, 18, 12, 14],
      md: [40, 22, 14, 18],
      lg: [52, 28, 20, 24],
    } as Record<string, number[]>
  )[p.size] ?? [40, 22, 14, 18];

  const off = sz[2] + 4;
  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const id = `${uid}-toggle`;

  // focus visual state
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        flexDirection: p.labelPos === "left" ? "row-reverse" : "row",
        userSelect: "none",
      }}
    >
      {/* Label wraps the visual so clicking the visuals toggles the input */}
      <label
        htmlFor={id}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          fontFamily,
        }}
      >
        {/* Visual track */}
        <div
          aria-hidden="true"
          style={{
            width: sz[0],
            height: sz[1],
            borderRadius: 100,
            background: on ? `rgba(${rgb},.2)` : "#1a1a1d",
            border: `1px solid ${on ? `rgba(${rgb},.4)` : "rgba(255,255,255,.09)"}`,
            position: "relative",
            transition: "all .25s",
            flexShrink: 0,
            boxShadow: focused ? `0 0 0 4px rgba(${rgb},.08)` : undefined,
          }}
        >
          {/* Knob */}
          <span
            style={{
              position: "absolute",
              top: (sz[1] - sz[2]) / 2 - 1,
              left: 3,
              width: sz[2],
              height: sz[2],
              borderRadius: "50%",
              background: on ? col : "rgba(240,237,232,.25)",
              transition: "all .25s",
              transform: on ? `translateX(${off}px)` : "none",
              boxShadow: on ? `0 0 10px rgba(${rgb},.5)` : "none",
              display: "block",
            }}
          />
        </div>

        {/* Native input kept for semantics and keyboard support.
            It's visually transparent but focusable; focus state drives the visual ring above. */}
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={on}
          aria-label={!showLabel ? p.label : undefined}
          checked={on}
          onChange={() => setOn((v) => !v)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            // keep the input in the layout but visually transparent and overlaying the track
            position: "absolute",
            width: sz[0],
            height: sz[1],
            opacity: 0,
            margin: 0,
            padding: 0,
            cursor: "pointer",
          }}
        />
      </label>

      {p.showLabel && (
        <span
          style={{ fontSize: sz[3], color: "rgba(240,237,232,.6)", fontFamily }}
        >
          {p.label}
        </span>
      )}
    </div>
  );
}
