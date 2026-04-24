"use client";
import { useId, useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { TooltipProps } from "@/lib/types";

export default function TooltipRenderer({ props: p }: { props: TooltipProps }) {
  const { fontFamily, textColor } = useGlobals();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [visible, setVisible] = useState(false);
  const isLight = p.variant === "light";
  const uid = useId();
  const triggerId = `${uid}-tooltip-trigger`;
  const tipId = `${uid}-tooltip`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          id={triggerId}
          aria-describedby={visible ? tipId : undefined}
          aria-expanded={visible}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setVisible(false);
            }
          }}
          style={{
            padding: "9px 18px",
            borderRadius: 8,
            border: `1px solid rgba(${rgb},.28)`,
            background: `rgba(${rgb},.08)`,
            color: lighten(col),
            fontFamily,
            fontSize: 13,
            cursor: "pointer",
            transition: "all .2s",
          }}
        >
          {p.text}
        </button>

        <div
          id={tipId}
          role="tooltip"
          aria-hidden={!visible}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: `translateX(-50%) translateY(${visible ? "-3px" : "0"})`,
            background: isLight ? "#f0ede8" : "#1a1a1f",
            border: `1px solid ${isLight ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.1)"}`,
            borderRadius: 7,
            padding: "8px 12px",
            fontSize: 11,
            color: isLight ? "#1a1a1f" : textColor,
            whiteSpace: "nowrap",
            pointerEvents: visible ? "auto" : "none",
            fontFamily,
            opacity: visible ? 1 : 0,
            transition: "opacity .15s,transform .15s",
            boxShadow: "0 8px 24px rgba(0,0,0,.3)",
          }}
        >
          {p.tip}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              border: "5px solid transparent",
              borderTopColor: isLight
                ? "rgba(0,0,0,.1)"
                : "rgba(255,255,255,.1)",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, opacity: 0.35 }}>
        {["Top", "Bottom", "Left"].map((pos) => (
          <div
            key={pos}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,.08)",
              fontSize: 11,
              color: "rgba(240,237,232,.5)",
              fontFamily,
            }}
          >
            {pos}
          </div>
        ))}
      </div>
    </div>
  );
}
