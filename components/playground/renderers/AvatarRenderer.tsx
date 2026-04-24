"use client";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { AvatarProps } from "@/lib/types";
import React from "react";

export default function AvatarRenderer({ props: p }: { props: AvatarProps }) {
  const { fontFamily } = useGlobals();

  const col = p.color ?? "#7F77DD";
  const rgb = hexRgb(col);

  const szMap: Record<"xs" | "sm" | "md" | "lg" | "xl", number> = {
    xs: 20,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 88,
  };

  const sc: Record<string, string> = {
    online: "#1D9E75",
    away: "#EF9F27",
    busy: "#e24b4a",
    offline: "rgba(240,237,232,.2)",
  };

  const sizes = ["xl", "lg", "md", "sm", "xs"] as const;

  const opacityMap: Record<(typeof sizes)[number], number> = {
    xl: 1,
    lg: 0.5,
    md: 0.3,
    sm: 0.2,
    xs: 0.1,
  };

  const mainSize = (p.size ?? "md") as (typeof sizes)[number];
  const mainIndex = sizes.indexOf(mainSize);

  const avatarLabel = p.name
    ? `${p.name}${p.showStatus && p.status ? `, ${p.status}` : ""}`
    : `${p.initials ?? "User"} avatar${p.showStatus && p.status ? `, ${p.status}` : ""}`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {sizes.map((sz, idx) => {
        const sn = szMap[sz];
        const isMain = idx === mainIndex;

        const br =
          p.shape === "circle"
            ? "50%"
            : p.shape === "squircle"
              ? `${sn * 0.28}px`
              : "8px";

        const op = isMain ? 1 : opacityMap[sz];

        return (
          <div key={sz} style={{ position: "relative", opacity: op }}>
            <div
              {...(isMain
                ? {
                    role: "img" as const,
                    tabIndex: 0,
                    "aria-label": avatarLabel,
                  }
                : {
                    "aria-hidden": true,
                  })}
              onFocus={
                isMain
                  ? (e: React.FocusEvent<HTMLDivElement>) => {
                      e.currentTarget.style.boxShadow = `0 0 0 6px rgba(${rgb},.06)`;
                    }
                  : undefined
              }
              onBlur={
                isMain
                  ? (e: React.FocusEvent<HTMLDivElement>) => {
                      e.currentTarget.style.boxShadow = "none";
                    }
                  : undefined
              }
              style={{
                width: sn,
                height: sn,
                borderRadius: br,
                background: `rgba(${rgb},.2)`,
                border: p.showRing
                  ? `2px solid rgba(${rgb},.5)`
                  : "1px solid rgba(255,255,255,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: Math.max(sn * 0.28, 8),
                fontWeight: 500,
                color: lighten(col),
                fontFamily,
                letterSpacing: "-.02em",
                outline: "none",
              }}
            >
              <span aria-hidden={!isMain}>{p.initials}</span>
            </div>

            {p.showStatus && isMain && (
              <div
                aria-live="polite"
                style={{
                  position: "absolute",
                  bottom: 1,
                  right: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  {p.status ? `Status ${p.status}` : "Status unknown"}
                </span>

                <div
                  aria-hidden="true"
                  style={{
                    width: Math.max(7, sn * 0.14),
                    height: Math.max(7, sn * 0.14),
                    borderRadius: "50%",
                    background: sc[p.status] || sc.online,
                    border: "2px solid #09090b",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
