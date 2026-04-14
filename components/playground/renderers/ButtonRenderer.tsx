"use client";
import { useRef } from "react";
import { hexRgb, lighten, contrast } from "./_utils";
import { usePlaygroundStore } from "@/store/playground";
import type { ButtonProps, RadiusScale } from "@/lib/types";

const ICONS: Record<string, string> = {
  none: "",
  arrow: "→",
  arrowLeft: "←",
  star: "✦",
  plus: "+",
  check: "✓",
  bolt: "⚡",
  send: "↗",
  heart: "♡",
  moon: "◐",
  eye: "◎",
  lock: "⚿",
  flame: "✶",
  x: "✕",
  search: "⌕",
};

const SIZE_PRESETS: Record<
  string,
  { paddingY: number; paddingX: number; textSize: number }
> = {
  sm: { paddingY: 6, paddingX: 14, textSize: 11 },
  md: { paddingY: 10, paddingX: 20, textSize: 13 },
  lg: { paddingY: 14, paddingX: 28, textSize: 15 },
  xl: { paddingY: 18, paddingX: 36, textSize: 17 },
};

export default function ButtonRenderer({
  props: p,
}: {
  props: ButtonProps & {
    iconName?: string;
    iconSide?: "left" | "right";
    globalFont?: string;
    globalRadius?: RadiusScale;
  };
}) {
  const { globalFont, globalRadius, globalTextColor } = usePlaygroundStore();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const btnRef = useRef<HTMLButtonElement>(null);

  // If p.icon is already a raw character (not a key like 'arrow'), use it directly.
  // If it's a key name, look it up in the ICONS map. If it's 'none' or empty, use ''.
  const icon =
    p.icon === "none" || !p.icon
      ? ""
      : ICONS[p.icon] !== undefined
        ? ICONS[p.icon]
        : p.icon;
  const txt = p.uppercase
    ? (p.text || "").toUpperCase()
    : p.text || "Start a project";

  const V: Record<string, { bg: string; b: string; c: string }> = {
    glow: { bg: `rgba(${rgb},.1)`, b: `rgba(${rgb},.28)`, c: lighten(col) },
    solid: { bg: col, b: col, c: contrast(col) },
    ghost: {
      bg: "transparent",
      b: "rgba(255,255,255,.1)",
      c: "rgba(240,237,232,.5)",
    },
    outline: { bg: "transparent", b: `rgba(${rgb},.5)`, c: lighten(col) },
    soft: { bg: `rgba(${rgb},.07)`, b: "transparent", c: lighten(col) },
    spectrum: { bg: "#111113", b: "transparent", c: "#f0ede8" },
  };
  const v = V[p.variant] ?? V.glow;

  // Apply globalTextColor override for variants where it makes sense.
  // solid and spectrum manage their own text colour for contrast/brand reasons.
  const effectiveTextColor = ["solid", "spectrum"].includes(p.variant)
    ? v.c
    : globalTextColor || v.c;

  // Use size preset values if size prop changed, fallback to individual values
  const preset = SIZE_PRESETS[p.size] ?? SIZE_PRESETS.md;
  const paddingY = p.paddingY ?? preset.paddingY;
  const paddingX = p.paddingX ?? preset.paddingX;
  const textSize = p.textSize ?? preset.textSize;

  const baseRadius: number = p.radius ?? 8;
  const effectiveRadius =
    globalRadius === "sharp"
      ? Math.min(baseRadius, 4)
      : globalRadius === "rounded"
        ? Math.max(baseRadius, 20)
        : baseRadius;

  const isSpectrum = p.variant === "spectrum";
  const specWrap: React.CSSProperties = isSpectrum
    ? {
        position: "relative",
        borderRadius: effectiveRadius + 1,
        background:
          "conic-gradient(from var(--ang),#e24b4a,#EF9F27,#f5e642,#1D9E75,#378ADD,#7F77DD,#D4537E,#e24b4a)",
        padding: "1.5px",
        animation: p.disabled
          ? "spin 3s linear infinite paused"
          : "spin 3s linear infinite",
        display: "inline-block",
        opacity: p.disabled ? 0.4 : 1,
      }
    : { display: "inline-block", opacity: p.disabled ? 0.4 : 1 };

  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: effectiveRadius,
    fontSize: textSize,
    fontWeight: p.weight ?? "400",
    background: v.bg,
    border: `1px solid ${v.b}`,
    color: effectiveTextColor,
    cursor: p.disabled ? "not-allowed" : "pointer",
    fontFamily: `${globalFont}, sans-serif`,
    letterSpacing: p.letterSpacing ?? "-.01em",
    transition: "all .2s ease",
    width: p.fullWidth ? 240 : undefined,
    position: "relative",
    overflow: "hidden",
  };

  const shadowMap: Record<string, string> = {
    glow: `0 0 20px rgba(${rgb},.25),0 4px 16px rgba(${rgb},.12)`,
    soft: "0 6px 20px rgba(0,0,0,.35)",
    hard: `4px 4px 0 rgba(${rgb},.4)`,
    none: "none",
  };
  const hoverMap: Record<string, string> = {
    lift: "translateY(-2px)",
    scale: "scale(1.04)",
    glow: "none",
    none: "none",
  };

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    if (p.hoverEffect !== "none")
      btn.style.boxShadow = shadowMap[p.shadow] ?? "none";
    btn.style.transform = hoverMap[p.hoverEffect] ?? "none";
    if (p.variant === "glow") {
      btn.style.borderColor = `rgba(${rgb},.55)`;
      btn.style.color = lighten(col, 80);
    }
    if (p.variant === "ghost") {
      btn.style.background = "rgba(255,255,255,.05)";
      btn.style.color = "#f0ede8";
    }
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    btn.style.boxShadow = "none";
    btn.style.transform = "none";
    btn.style.background = v.bg;
    btn.style.borderColor = v.b;
    btn.style.color = effectiveTextColor;
  }
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (p.clickAnim === "ripple") {
      const btn = e.currentTarget;
      const r = document.createElement("span");
      r.style.cssText = `position:absolute;border-radius:50%;width:10px;height:10px;transform:scale(0);background:rgba(255,255,255,.25);pointer-events:none;animation:ripple-out .5s ease-out forwards;`;
      const rect = btn.getBoundingClientRect();
      r.style.left = e.clientX - rect.left - 5 + "px";
      r.style.top = e.clientY - rect.top - 5 + "px";
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    }
    if (p.clickAnim === "scale" && btnRef.current) {
      btnRef.current.style.transform = "scale(.95)";
      setTimeout(() => {
        if (btnRef.current) btnRef.current.style.transform = "none";
      }, 120);
    }
    if (p.clickAnim === "bounce" && btnRef.current) {
      const btn = btnRef.current;
      btn.style.transform = "scale(.92)";
      setTimeout(() => {
        btn.style.transform = "scale(1.07)";
      }, 100);
      setTimeout(() => {
        btn.style.transform = "scale(.97)";
      }, 200);
      setTimeout(() => {
        btn.style.transform = "scale(1.02)";
      }, 300);
      setTimeout(() => {
        btn.style.transform = "none";
      }, 400);
    }
  }

  const ghostVariants = ["ghost", "outline", "soft"]
    .filter((k) => k !== p.variant)
    .slice(0, 2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={specWrap}>
        <button
          ref={btnRef}
          style={btnStyle}
          disabled={p.disabled}
          onMouseEnter={p.disabled ? undefined : handleMouseEnter}
          onMouseLeave={p.disabled ? undefined : handleMouseLeave}
          onClick={p.disabled ? undefined : handleClick}
        >
          {icon && (p.iconPos ?? p.iconSide ?? "left") === "left" && (
            <span style={{ fontSize: textSize + 2 }}>{icon}</span>
          )}
          <span>{txt}</span>
          {icon && (p.iconPos ?? p.iconSide ?? "left") === "right" && (
            <span style={{ fontSize: textSize + 2 }}>{icon}</span>
          )}
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, opacity: 0.2 }}>
        {ghostVariants.map((k) => {
          const vv = V[k];
          return (
            <button
              key={k}
              style={{
                padding: "6px 14px",
                borderRadius: effectiveRadius,
                fontSize: 11,
                background: vv.bg,
                border: `1px solid ${vv.b}`,
                color: vv.c,
                fontFamily: `${globalFont}, sans-serif`,
                cursor: "pointer",
              }}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
