"use client";
import { useId } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { AlertProps } from "@/lib/types";

export default function AlertRenderer({ props: p }: { props: AlertProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#1D9E75";
  const rgb = hexRgb(col);

  const VM: Record<
    string,
    { bg: string; bc: string; ic: string; icon: string; ib: string; ac: string }
  > = {
    success: {
      bg: "rgba(29,158,117,.07)",
      bc: "rgba(29,158,117,.22)",
      ic: "#1D9E75",
      icon: "✓",
      ib: "rgba(29,158,117,.15)",
      ac: "rgba(29,158,117,.8)",
    },
    error: {
      bg: "rgba(226,75,74,.07)",
      bc: "rgba(226,75,74,.22)",
      ic: "#e24b4a",
      icon: "✕",
      ib: "rgba(226,75,74,.15)",
      ac: "rgba(226,75,74,.8)",
    },
    warning: {
      bg: "rgba(239,159,39,.07)",
      bc: "rgba(239,159,39,.22)",
      ic: "#EF9F27",
      icon: "⚠",
      ib: "rgba(239,159,39,.15)",
      ac: "rgba(239,159,39,.8)",
    },
    info: {
      bg: `rgba(${rgb},.07)`,
      bc: `rgba(${rgb},.22)`,
      ic: col,
      icon: "i",
      ib: `rgba(${rgb},.15)`,
      ac: lighten(col),
    },
  };

  const v = VM[p.variant] ?? VM.success;

  // alert id and labelledby
  const titleId = `${uid}-alert-title`;
  const alertId = `${uid}-alert`;
  const actionId = `${uid}-alert-action`;
  const closeId = `${uid}-alert-close`;

  // choose assertive for error, polite otherwise
  const liveMode = p.variant === "error" ? "assertive" : "polite";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 10, width: 320 }}
    >
      <div
        id={alertId}
        role="alert"
        aria-live={liveMode}
        aria-atomic="true"
        aria-labelledby={titleId}
        style={{
          display: "flex",
          gap: 12,
          padding: "14px 16px",
          borderRadius: 10,
          border: `1px solid ${v.bc}`,
          background: v.bg,
          animation: "slide-up .3s ease",
        }}
      >
        {p.showIcon && (
          <div
            aria-hidden="true"
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: v.ib,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: v.ic,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            {v.icon}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div
            id={titleId}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: textColor,
              fontFamily,
              marginBottom: 4,
            }}
          >
            {p.title}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "rgba(240,237,232,.55)",
              fontFamily,
              fontWeight: 300,
              lineHeight: 1.55,
            }}
          >
            {p.message}
          </div>

          {p.showAction && (
            <div style={{ marginTop: 10 }}>
              <button
                id={actionId}
                type="button"
                aria-label={p.actionText ?? "Alert action"}
                // intentionally no onClick to preserve original behavior
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${v.bc}`,
                  background: "transparent",
                  color: v.ac,
                  fontFamily,
                  fontSize: 12,
                  cursor: "pointer",
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.06)`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {p.actionText}
              </button>
            </div>
          )}
        </div>

        {p.showClose && (
          <button
            id={closeId}
            type="button"
            aria-label="Dismiss alert"
            // intentionally no onClick to preserve original behavior
            style={{
              color: "rgba(240,237,232,.3)",
              fontSize: 12,
              cursor: "pointer",
              flexShrink: 0,
              background: "transparent",
              border: "none",
              padding: 6,
              borderRadius: 6,
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.06)`)
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            ✕
          </button>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: 0.35,
        }}
      >
        {Object.entries(VM)
          .filter(([k]) => k !== p.variant)
          .slice(0, 2)
          .map(([k, vv]) => (
            <div
              key={k}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 13px",
                borderRadius: 8,
                border: `1px solid ${vv.bc}`,
                background: vv.bg,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: vv.ib,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: vv.ic,
                  flexShrink: 0,
                }}
              >
                {vv.icon}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(240,237,232,.6)",
                  fontFamily,
                }}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
