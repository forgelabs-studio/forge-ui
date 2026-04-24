"use client";
import { useId, useState } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { RadioProps } from "@/lib/types";

export default function RadioRenderer({ props: p }: { props: RadioProps }) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  const sz =
    ({ sm: 14, md: 18, lg: 22 } as Record<string, number>)[p.size] ?? 18;
  const labelSz =
    ({ sm: 11, md: 13, lg: 15 } as Record<string, number>)[p.size] ?? 13;

  const opts: string[] = Array.isArray(p.options)
    ? p.options
    : (p.options || "ASAP,1–2 months,3–6 months,Flexible")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);

  // Normalize initial selected index safely
  const initialSelected = (() => {
    if (
      typeof p.selected === "number" &&
      p.selected >= 0 &&
      p.selected < opts.length
    ) {
      return p.selected;
    }
    // if selected is a string matching an option, use its index
    if (typeof p.selected === "string") {
      const idx = opts.indexOf(p.selected);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  })();

  const [sel, setSel] = useState<number>(initialSelected);

  // handle optional showLabel prop safely
  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const groupLabel = p.label ?? undefined;

  // radio group name must be shared so native radios behave as a group
  const groupName = `${uid}-radios`;

  return (
    <fieldset
      aria-label={!showLabel && groupLabel ? groupLabel : undefined}
      style={{
        display: "flex",
        flexDirection: p.layout === "horizontal" ? "row" : "column",
        gap: 11,
        flexWrap: "wrap",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {showLabel && groupLabel && (
        <legend
          style={{
            fontSize: 13,
            color: "rgba(240,237,232,.9)",
            fontFamily,
            marginBottom: 4,
          }}
        >
          {groupLabel}
        </legend>
      )}

      {opts.map((opt: string, i: number) => {
        const id = `${uid}-radio-${i}`;
        const isSelected = i === sel;
        return (
          <label
            key={id}
            htmlFor={id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              id={id}
              name={groupName}
              type="radio"
              value={opt}
              checked={isSelected}
              onChange={() => setSel(i)}
              style={{
                width: sz,
                height: sz,
                borderRadius: "50%",
                border: `1px solid ${isSelected ? col : "rgba(255,255,255,.18)"}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .2s",
                flexShrink: 0,
                boxShadow: isSelected ? `0 0 8px rgba(${rgb},.3)` : "none",
                // visually neutralize native appearance while keeping semantics
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  `0 0 0 3px rgba(${rgb},.12)`;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  isSelected ? `0 0 8px rgba(${rgb},.3)` : "none";
              }}
              aria-checked={isSelected}
            />
            {/* inner dot for selected state */}
            <span
              aria-hidden="true"
              style={{
                width: isSelected ? sz * 0.44 : 0,
                height: isSelected ? sz * 0.44 : 0,
                borderRadius: "50%",
                background: isSelected ? col : "transparent",
                transition: "all .15s",
                marginLeft: -sz, // visually place inside the radio area
                pointerEvents: "none",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: labelSz,
                color: `rgba(240,237,232,${isSelected ? 0.7 : 0.4})`,
                fontFamily,
              }}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
