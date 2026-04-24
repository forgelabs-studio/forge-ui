"use client";
import { useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { CardProps } from "@/lib/types";
import { useId } from "react";

export default function CardRenderer({ props: p }: { props: CardProps }) {
  const { fontFamily, textColor, resolveRadius } = useGlobals();
  const uid = useId();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [hovered, setHovered] = useState(false);

  const cardId = `${uid}-card`;
  const titleId = `${uid}-card-title`;
  const subtitleId = `${uid}-card-sub`;
  const badgeId = `${uid}-card-badge`;

  return (
    <article
      id={cardId}
      role="article"
      aria-labelledby={titleId}
      aria-describedby={p.showBadge ? badgeId : subtitleId}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        // non-functional: allow Enter/Space to toggle the hover visual for keyboard users
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setHovered((h) => !h);
        }
      }}
      style={{
        background: hovered ? "#161618" : "#111113",
        border: `1px solid ${hovered ? `rgba(${rgb},.22)` : "rgba(255,255,255,.07)"}`,
        borderRadius: resolveRadius(p.radius ?? 4),
        padding: p.padding,
        width: p.width ?? 280,
        cursor: "pointer",
        transition: "all .3s",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 40px rgba(${rgb},.09)` : "none",
        outline: "none",
      }}
      onFocusCapture={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 6px rgba(${rgb},.06)`)
      }
      onBlurCapture={(e) =>
        (e.currentTarget.style.boxShadow = hovered
          ? `0 12px 40px rgba(${rgb},.09)`
          : "none")
      }
    >
      {/* decorative gradient glow — hidden from AT */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: `linear-gradient(to top, ${col}, transparent)`,
          filter: "blur(8px)",
          opacity: hovered ? 0.5 : 0,
          transition: "opacity .4s",
          pointerEvents: "none",
        }}
      />

      {p.showTag && (
        <div
          style={{
            fontSize: 10,
            color: "rgba(240,237,232,.22)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: 14,
            fontFamily,
          }}
        >
          {p.tag}
        </div>
      )}

      <h3
        id={titleId}
        style={{
          fontSize: 16,
          fontWeight: 300,
          letterSpacing: "-.02em",
          marginBottom: 8,
          color: textColor,
          position: "relative",
          zIndex: 1,
          fontFamily,
        }}
      >
        {p.title}
      </h3>

      <p
        id={subtitleId}
        style={{
          fontSize: 12,
          color: "rgba(240,237,232,.45)",
          fontWeight: 300,
          lineHeight: 1.65,
          position: "relative",
          zIndex: 1,
          margin: 0,
          fontFamily,
        }}
      >
        {p.subtitle}
      </p>

      {p.showBadge && (
        <div
          id={badgeId}
          role="status"
          aria-live="polite"
          style={{
            marginTop: 14,
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: 5,
            fontSize: 10,
            background: `rgba(${rgb},.12)`,
            color: lighten(col),
            border: `1px solid rgba(${rgb},.22)`,
            position: "relative",
            zIndex: 1,
            fontFamily,
          }}
        >
          {p.badge}
        </div>
      )}
    </article>
  );
}
