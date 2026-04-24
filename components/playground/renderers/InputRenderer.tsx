"use client";
import { useId } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { InputProps } from "@/lib/types";

export default function InputRenderer({ props: p }: { props: InputProps }) {
  const { fontFamily, textColor, resolveRadius } = useGlobals();
  const uid = useId();
  const inputId = `${uid}-input`;
  const hintId = `${uid}-hint`;

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const sz = (
    { sm: [7, 11], md: [9, 13], lg: [12, 15] } as Record<string, number[]>
  )[p.size] ?? [9, 13];
  const SS: Record<string, { b: string; fc: string; sh: string }> = {
    default: {
      b: "rgba(255,255,255,.09)",
      fc: `rgba(${rgb},.45)`,
      sh: `rgba(${rgb},.08)`,
    },
    error: {
      b: "rgba(226,75,74,.35)",
      fc: "rgba(226,75,74,.45)",
      sh: "rgba(226,75,74,.08)",
    },
    success: {
      b: "rgba(29,158,117,.35)",
      fc: "rgba(29,158,117,.45)",
      sh: "rgba(29,158,117,.08)",
    },
    disabled: { b: "rgba(255,255,255,.05)", fc: "", sh: "" },
  };
  const ss = SS[p.state] ?? SS.default;
  const hc: Record<string, string> = {
    default: "rgba(240,237,232,.22)",
    error: "rgba(226,75,74,.65)",
    success: "rgba(29,158,117,.65)",
    disabled: "rgba(240,237,232,.15)",
  };
  const ht: Record<string, string> = {
    default: p.hint ?? "Enter a value",
    error: "Please enter a valid email.",
    success: "Looks good!",
    disabled: "This field is locked.",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}
    >
      {p.showLabel && (
        <label
          htmlFor={inputId}
          style={{ fontSize: 11, color: "rgba(240,237,232,.45)", fontFamily }}
        >
          {p.label}
        </label>
      )}
      <input
        id={inputId}
        placeholder={p.placeholder}
        type={p.type}
        disabled={p.state === "disabled"}
        autoComplete={p.type === "password" ? "new-password" : "off"}
        data-1p-ignore
        data-lpignore="true"
        data-form-type="other"
        aria-describedby={p.showHint ? hintId : undefined}
        aria-invalid={p.state === "error"}
        aria-label={!p.showLabel ? p.label : undefined}
        style={{
          width: "100%",
          background: "#111113",
          border: `1px solid ${ss.b}`,
          borderRadius: resolveRadius(p.radius ?? 4),
          padding: `${sz[0]}px 12px`,
          fontSize: sz[1],
          color: textColor,
          fontFamily,
          outline: "none",
          transition: "all .2s",
          opacity: p.state === "disabled" ? 0.4 : 1,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = ss.fc;
          e.target.style.boxShadow = `0 0 0 3px ${ss.sh}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = ss.b;
          e.target.style.boxShadow = "none";
        }}
      />
      {p.showHint && (
        <span
          id={hintId}
          aria-live={p.state === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          style={{ fontSize: 11, color: hc[p.state] ?? hc.default, fontFamily }}
        >
          {ht[p.state] ?? ht.default}
        </span>
      )}
    </div>
  );
}
