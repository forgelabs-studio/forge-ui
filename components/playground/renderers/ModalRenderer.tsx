"use client";
import { hexRgb, lighten } from "@/lib/utils";

import { useGlobals } from "./_useGlobals";
import type { ModalProps } from "@/lib/types";
export default function ModalRenderer({ props: p }: { props: ModalProps }) {
  const { fontFamily, textColor, resolveRadius } = useGlobals();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  return (
    <div
      style={{
        width: 340,
        background: "#0f0f12",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: resolveRadius(p.radius ?? 4),
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,.5)",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,.06)",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: textColor,
            fontFamily,
            letterSpacing: "-.01em",
          }}
        >
          {p.title}
        </div>
        {p.showClose && (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 11,
              color: "rgba(240,237,232,.4)",
            }}
          >
            ✕
          </div>
        )}
      </div>
      <div style={{ padding: 20 }}>
        <p
          style={{
            fontSize: 13,
            color: "rgba(240,237,232,.5)",
            fontFamily,
            fontWeight: 300,
            lineHeight: 1.65,
          }}
        >
          {p.body}
        </p>
      </div>
      {p.showFooter && (
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 7,
              border: "1px solid rgba(255,255,255,.1)",
              background: "transparent",
              color: "rgba(240,237,232,.45)",
              fontFamily,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {p.secondaryBtn}
          </button>
          <button
            style={{
              padding: "8px 18px",
              borderRadius: 7,
              border: `1px solid rgba(${rgb},.3)`,
              background: `rgba(${rgb},.1)`,
              color: lighten(col),
              fontFamily,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {p.primaryBtn}
          </button>
        </div>
      )}
    </div>
  );
}
