"use client";
import { useState, useMemo } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { FadeUpProps } from "@/lib/types";
import { useId } from "react";

export default function FadeUpRenderer({ props: p }: { props: FadeUpProps }) {
  const { fontFamily, textColor } = useGlobals();
  const col = p.color ?? "#7F77DD";
  const rgb = hexRgb(col);
  const uid = useId();
  const [key, setKey] = useState(0);

  const lines = useMemo(
    () =>
      (p.text ?? "Interfaces built\nto a standard\nyou can feel.").split("\n"),
    [p.text],
  );

  const dur = ((p.duration ?? 600) / 1000).toFixed(3);
  const prefersReduced =
    typeof window !== "undefined" && "matchMedia" in window
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // A single, stable string for screen readers (announced when the component mounts or replayed)
  const srText = lines.join(" ") + " — FORGE.labs — Design engineering studio";

  return (
    <div
      role="region"
      aria-label={p.ariaLabel ?? "Animated headline"}
      style={{ textAlign: "center", maxWidth: 320, fontFamily }}
    >
      {/* Screen reader friendly summary — polite live region so it announces on replay */}
      <div
        id={`${uid}-sr`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
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
        {srText}
      </div>

      {lines.map((l: string, i: number) => (
        <div
          key={`${key}-${i}`}
          style={{ overflow: "hidden", marginBottom: 2 }}
        >
          <div
            // hide the visual animation from AT; screen readers get the stable summary above
            aria-hidden={true}
            style={{
              fontSize: "clamp(20px,3.5vw,28px)",
              fontWeight: 300,
              letterSpacing: "-.03em",
              color: textColor,
              animation: prefersReduced
                ? "none"
                : `fadeUp ${dur}s ease ${p.stagger ? i * 0.1 : 0}s both`,
            }}
          >
            {l}
          </div>
        </div>
      ))}

      <div key={`${key}-sub`} style={{ overflow: "hidden", marginTop: 12 }}>
        <div
          aria-hidden={true}
          style={{
            fontSize: 12,
            color: `rgba(${rgb},.7)`,
            animation: prefersReduced
              ? "none"
              : `fadeUp ${dur}s ease ${p.stagger ? lines.length * 0.1 : 0}s both`,
          }}
        >
          FORGE.labs — Design engineering studio
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          onClick={() => {
            // bump key to re-render animated elements and re-announce the SR text
            setKey((k) => k + 1);
          }}
          aria-label="Replay animation and announce headline"
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: `1px solid rgba(${rgb},.25)`,
            background: `rgba(${rgb},.07)`,
            color: lighten(col),
            fontFamily,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          ↺ Replay
        </button>
      </div>
    </div>
  );
}
