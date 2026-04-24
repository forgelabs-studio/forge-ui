"use client";
import { useId, useMemo } from "react";
import { hexRgb } from "@/lib/utils";
import type { MorphBlobProps } from "@/lib/types";

export default function MorphBlobRenderer({
  props: p,
}: {
  props: MorphBlobProps;
}) {
  const uid = useId();
  const col = p.color ?? "#7F77DD";
  const rgb = hexRgb(col);

  const dur =
    ({ slow: "6s", normal: "4s", fast: "2s" } as Record<string, string>)[
      p.speed ?? "normal"
    ] ?? "4s";

  const bg = p.gradient
    ? `linear-gradient(135deg,${col},${p.color2 ?? "#D4537E"})`
    : `rgba(${rgb},.6)`;

  const prefersReduced =
    typeof window !== "undefined" && "matchMedia" in window
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const animation = useMemo(
    () => (prefersReduced ? "none" : `morph ${dur} ease-in-out infinite`),
    [prefersReduced, dur],
  );

  // If an accessible label or description is provided, expose the blob as an image.
  // Otherwise keep it decorative and hidden from AT to avoid noisy announcements.
  const isAccessible = Boolean(p.ariaLabel || p.ariaDescription);
  // const imgRole = isAccessible ? "img" : undefined;
  const ariaLabel = p.ariaLabel ?? undefined;
  const descId = p.ariaDescription ? `${uid}-morph-desc` : undefined;

  return (
    <div
      {...(isAccessible
        ? {
            role: "img" as const,
            "aria-label": ariaLabel,
            "aria-describedby": descId,
          }
        : {
            "aria-hidden": true,
          })}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 200,
      }}
    >
      <div
        style={{
          width: p.size ?? 120,
          height: p.size ?? 120,
          background: bg,
          animation,
          opacity: p.opacity ?? 0.8,
          filter: p.blur ? `blur(${p.blur}px)` : undefined,
          borderRadius: "50%",
        }}
      />

      {p.ariaDescription && (
        <span
          id={descId}
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
          {p.ariaDescription}
        </span>
      )}
    </div>
  );
}
