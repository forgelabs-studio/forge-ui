"use client";
import { useEffect, useRef, useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { CountUpProps } from "@/lib/types";
import { useId } from "react";

export default function CountUpRenderer({ props: p }: { props: CountUpProps }) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color ?? "#7F77DD";
  const rgb = hexRgb(col);

  const [val, setVal] = useState<number>(p.from ?? 0);
  const [key, setKey] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  const szMap: Record<string, string> = {
    sm: "24px",
    md: "32px",
    lg: "44px",
    xl: "56px",
  };

  const fmt = (n: number) =>
    `${p.prefix ?? ""}${Math.round(n).toLocaleString("en-GB")}${p.suffix ?? ""}`;

  useEffect(() => {
    let cur = p.from ?? 0;
    const to = p.to ?? 48200;
    const dur = p.duration ?? 2000;
    const start = performance.now();

    // Respect reduced motion preference: if user prefers reduced motion, jump to final value.
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReduced) {
      setVal(to);
      return;
    }

    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      cur = (p.from ?? 0) + (to - (p.from ?? 0)) * t;
      setVal(cur);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [key, p.from, p.to, p.duration]);

  const containerId = `${uid}-countup`;
  const labelId = `${uid}-countup-label`;

  return (
    <div style={{ textAlign: "center", fontFamily }}>
      {/* Live region: announces value updates politely and atomically */}
      <div
        id={containerId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ outline: "none" }}
      >
        <div
          id={labelId}
          style={{
            fontSize: szMap[p.size] || "44px",
            fontWeight: 300,
            letterSpacing: "-.04em",
            color: lighten(col),
            marginBottom: p.showLabel ? 6 : 0,
          }}
        >
          {fmt(val)}
        </div>
      </div>

      {p.showLabel && (
        <div
          style={{
            fontSize: 12,
            color: "rgba(240,237,232,.4)",
            marginTop: 6,
          }}
        >
          {p.label}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          aria-label="Replay count animation"
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
