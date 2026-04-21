"use client";
import { useState } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { RadioProps } from "@/lib/types";
export default function RadioRenderer({ props: p }: { props: RadioProps }) {
  const { fontFamily } = useGlobals();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [sel, setSel] = useState(p.selected ?? 0);
  const sz =
    ({ sm: 14, md: 18, lg: 22 } as Record<string, number>)[p.size] ?? 18;
  const labelSz =
    ({ sm: 11, md: 13, lg: 15 } as Record<string, number>)[p.size] ?? 13;
  const opts: string[] = Array.isArray(p.options)
    ? p.options
    : (p.options || "ASAP,1–2 months,3–6 months,Flexible")
        .split(",")
        .map((s: string) => s.trim());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: p.layout === "horizontal" ? "row" : "column",
        gap: 11,
        flexWrap: "wrap",
      }}
    >
      {opts.map((opt: string, i: number) => (
        <div
          key={i}
          onClick={() => setSel(i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: sz,
              height: sz,
              borderRadius: "50%",
              border: `1px solid ${i === sel ? col : "rgba(255,255,255,.18)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .2s",
              flexShrink: 0,
              boxShadow: i === sel ? `0 0 8px rgba(${rgb},.3)` : "none",
            }}
          >
            {i === sel && (
              <div
                style={{
                  width: sz * 0.44,
                  height: sz * 0.44,
                  borderRadius: "50%",
                  background: col,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <span
            style={{
              fontSize: labelSz,
              color: `rgba(240,237,232,${i === sel ? 0.7 : 0.4})`,
              fontFamily,
            }}
          >
            {opt}
          </span>
        </div>
      ))}
    </div>
  );
}
