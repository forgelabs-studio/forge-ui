"use client";
import { useId, useState } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { TextareaProps } from "@/lib/types";

export default function TextareaRenderer({
  props: p,
}: {
  props: TextareaProps;
}) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();
  const textareaId = `${uid}-textarea`;
  const hintId = `${uid}-hint`;
  const countId = `${uid}-count`;

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [count, setCount] = useState(0);

  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}
    >
      {(showLabel || p.showCount) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showLabel && (
            <label
              htmlFor={textareaId}
              style={{ fontSize: 11, color: textColor, fontFamily }}
            >
              {p.label}
            </label>
          )}
          {p.showCount && (
            <span
              id={countId}
              aria-live="polite"
              aria-atomic="true"
              style={{
                fontSize: 10,
                color: "var(--hint)",
                fontFamily: "var(--mono)",
              }}
            >
              {count}/{p.maxLength ?? "∞"}
            </span>
          )}
        </div>
      )}

      <textarea
        id={textareaId}
        placeholder={p.placeholder}
        maxLength={p.maxLength}
        rows={p.rows}
        aria-label={!showLabel ? p.label : undefined}
        aria-describedby={
          [p.showHint ? hintId : undefined, p.showCount ? countId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-invalid={p.state === "error"}
        style={{
          width: "100%",
          background: "#111113",
          border: `1px solid rgba(255,255,255,.09)`,
          borderRadius: p.radius,
          padding: "10px 12px",
          fontSize: 13,
          color: textColor,
          fontFamily,
          transition: "all .2s",
          resize: "vertical",
          lineHeight: 1.6,
          // keep native focus outline behavior; we add a subtle focus ring below
        }}
        onInput={(e) =>
          setCount((e.target as HTMLTextAreaElement).value.length)
        }
        onFocus={(e) => {
          (e.target as HTMLTextAreaElement).style.borderColor =
            `rgba(${rgb},.45)`;
          (e.target as HTMLTextAreaElement).style.boxShadow =
            `0 0 0 3px rgba(${rgb},.08)`;
        }}
        onBlur={(e) => {
          (e.target as HTMLTextAreaElement).style.borderColor =
            "rgba(255,255,255,.09)";
          (e.target as HTMLTextAreaElement).style.boxShadow = "none";
        }}
      />

      {p.showHint && (
        <span
          id={hintId}
          aria-live={p.state === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          style={{ fontSize: 11, color: "rgba(240,237,232,.22)", fontFamily }}
        >
          {p.hint}
        </span>
      )}
    </div>
  );
}
