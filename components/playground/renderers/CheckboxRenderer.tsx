"use client";
import { useId, useState } from "react";
import { hexRgb, contrast } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { CheckboxProps } from "@/lib/types";

export default function CheckboxRenderer({
  props: p,
}: {
  props: CheckboxProps;
}) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const sz =
    ({ sm: 14, md: 18, lg: 22 } as Record<string, number>)[p.size] ?? 18;
  const br =
    p.variant === "round" ? "50%" : p.variant === "square" ? "4px" : "6px";

  const items: string[] = Array.isArray(p.items)
    ? p.items
    : (p.items || p.label || "I agree to the terms")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);

  // Safely normalize initial checked state
  const initialChecked = (() => {
    // If checked is an array, treat it as boolean[]
    if (Array.isArray(p.checked)) {
      const arr = p.checked as boolean[];
      return items.map((_, i) => !!arr[i]);
    }
    // If checked is a boolean, apply to first item
    if (typeof p.checked === "boolean") {
      return items.map((_, i) => (i === 0 ? !!p.checked : false));
    }
    // Default all false
    return items.map(() => false);
  })();

  const [checked, setChecked] = useState<boolean[]>(initialChecked);

  const toggle = (i: number) =>
    setChecked((arr) => arr.map((v, j) => (j === i ? !v : v)));

  // Handle optional showLabel safely even if CheckboxProps doesn't declare it
  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const groupLabel = p.label ?? undefined;

  return (
    <fieldset
      aria-label={!showLabel && groupLabel ? groupLabel : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 11,
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

      {items.map((l, i) => {
        const id = `${uid}-checkbox-${i}`;
        const isChecked = !!checked[i];
        return (
          <label
            key={id}
            htmlFor={id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              id={id}
              type="checkbox"
              checked={isChecked}
              onChange={() => toggle(i)}
              style={{
                width: sz,
                height: sz,
                borderRadius: br,
                border: `1px solid ${isChecked ? col : "rgba(255,255,255,.18)"}`,
                background: isChecked ? col : "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .15s",
                flexShrink: 0,
                boxShadow: isChecked ? `0 0 10px rgba(${rgb},.3)` : "none",
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
                  isChecked ? `0 0 10px rgba(${rgb},.3)` : "none";
              }}
              aria-checked={isChecked}
            />
            <span
              style={{
                fontSize: 13,
                color: `rgba(240,237,232,${isChecked ? 0.6 : 0.35})`,
                fontFamily,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {l}
            </span>
            <span
              aria-hidden="true"
              style={{
                marginLeft: "auto",
                fontSize: sz * 0.55,
                color: isChecked ? contrast(col) : "transparent",
                fontWeight: 500,
                lineHeight: 1,
                transition: "color .15s",
              }}
            >
              {isChecked ? "✓" : ""}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
