"use client";
import { useId, useState } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { AccordionProps } from "@/lib/types";

export default function AccordionRenderer({
  props: p,
}: {
  props: AccordionProps;
}) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const [openIdx, setOpenIdx] = useState(0);

  const titles: string[] = Array.isArray(p.items)
    ? p.items
    : [
        p.item1 || "What do you build?",
        p.item2 || "How long does it take?",
        p.item3 || "What does it cost?",
      ];
  const bodies: string[] = Array.isArray(p.bodies)
    ? p.bodies
    : [
        p.body1 ||
          "Landing pages, marketing websites, SaaS products and web apps.",
        p.body2 || "Most projects take 4–12 weeks depending on scope.",
        p.body3 ||
          "From £2,400 for landing pages to £8,000+ for SaaS products.",
      ];

  return (
    <div
      style={{
        width: 320,
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: p.radius ?? 10,
        overflow: "hidden",
        background: "#0f0f12",
      }}
    >
      {titles.map((title, i) => {
        const isOpen = i === openIdx;
        const headerId = `${uid}-acc-header-${i}`;
        const panelId = `${uid}-acc-panel-${i}`;

        return (
          <div
            key={i}
            style={{
              borderBottom:
                i < titles.length - 1
                  ? "1px solid rgba(255,255,255,.06)"
                  : "none",
            }}
          >
            <div style={{ padding: 0 }}>
              <button
                id={headerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIdx((o) => (o === i ? -1 : i))}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "14px 16px",
                  cursor: "pointer",
                  transition: "background .12s",
                  background: isOpen ? `rgba(${rgb},.04)` : "transparent",
                  border: "none",
                  textAlign: "left",
                  fontFamily,
                  color: "inherit",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.06)`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: textColor,
                    fontFamily,
                    fontWeight: isOpen ? 400 : 300,
                  }}
                >
                  {title}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: 13,
                    color: `rgba(${rgb},${isOpen ? 0.7 : 0.25})`,
                    transition: "transform .25s",
                    display: "inline-block",
                    transform: isOpen ? "rotate(45deg)" : "none",
                  }}
                >
                  {isOpen ? "×" : "+"}
                </span>
              </button>
            </div>

            {/* FIXED: aria-hidden added */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!isOpen}
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 500 : 0,
                opacity: isOpen ? 1 : 0,
                transition: "max-height .3s ease, opacity .25s ease",
              }}
            >
              <div style={{ padding: "0 16px 16px 16px" }}>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(240,237,232,.45)",
                    fontFamily,
                    lineHeight: 1.65,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {bodies[i] || ""}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
