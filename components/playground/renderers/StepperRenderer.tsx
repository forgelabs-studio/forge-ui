"use client";
import { useId, useState } from "react";
import { hexRgb, lighten, contrast } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { StepperProps } from "@/lib/types";

export default function StepperRenderer({ props: p }: { props: StepperProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  // Support array or legacy step1/step2/step3/step4
  const steps: string[] = Array.isArray(p.steps)
    ? p.steps
    : [p.step1, p.step2, p.step3, p.step4].filter((s): s is string =>
        Boolean(s),
      );

  const descs: string[] = Array.isArray(p.descs)
    ? p.descs
    : [
        "Choose your colours, layout, and features.",
        "We handle the rest — build, test, deploy.",
        "Review live preview before final sign-off.",
        "Your project is live and handed over.",
      ];

  const [cur, setCur] = useState<number>(p.current ?? 0);
  const isH = p.variant === "horizontal";

  const liveId = `${uid}-stepper-live`;

  return (
    <div style={{ width: isH ? 360 : 220 }}>
      {/* Navigation landmark for the stepper */}
      <nav aria-label={p.label ?? "Progress"} style={{ position: "relative" }}>
        {/* Polite live region announcing current step */}
        <div
          id={liveId}
          aria-live="polite"
          aria-atomic="true"
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
          {`Step ${cur + 1} of ${steps.length}: ${steps[cur] ?? ""}`}
        </div>

        {/* Ordered list of steps (semantic) */}
        <ol
          style={{
            display: "flex",
            flexDirection: isH ? "row" : "column",
            gap: 0,
            position: "relative",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {steps.map((step: string, i: number) => {
            const done = i < cur;
            const active = i === cur;
            return (
              <li
                key={i}
                role="listitem"
                aria-current={active ? "step" : undefined}
                style={{
                  display: "flex",
                  flexDirection: isH ? "column" : "row",
                  alignItems: "center",
                  gap: isH ? 4 : 12,
                  ...(isH ? { flex: 1 } : {}),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    ...(isH
                      ? { flexDirection: "column" as const, width: "100%" }
                      : {}),
                  }}
                >
                  <div
                    aria-hidden="false"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background:
                        done || active ? col : "rgba(255,255,255,.07)",
                      border: `1px solid ${done || active ? col : "rgba(255,255,255,.12)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color:
                        done || active ? contrast(col) : "rgba(240,237,232,.3)",
                      flexShrink: 0,
                      transition: "all .25s",
                      boxShadow: active ? `0 0 12px rgba(${rgb},.4)` : "none",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>

                  {/* Decorative connector — hidden from AT */}
                  {i < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      style={
                        isH
                          ? {
                              flex: 1,
                              height: 1,
                              background: done ? col : "rgba(255,255,255,.08)",
                              minWidth: 20,
                              transition: "background .25s",
                            }
                          : {
                              width: 1,
                              minHeight: 40,
                              background: done ? col : "rgba(255,255,255,.08)",
                              margin: "4px 0",
                              transition: "background .25s",
                              alignSelf: "stretch",
                            }
                      }
                    />
                  )}
                </div>

                <div
                  style={
                    isH
                      ? { textAlign: "center" as const, paddingBottom: 4 }
                      : {}
                  }
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: active
                        ? textColor
                        : done
                          ? lighten(col, 20)
                          : "rgba(240,237,232,.35)",
                      fontFamily,
                      fontWeight: active ? 500 : 400,
                      transition: "color .25s",
                    }}
                  >
                    {step}
                  </div>

                  {p.showDesc && (
                    <div
                      style={{
                        fontSize: 10,
                        color: active
                          ? "rgba(240,237,232,.4)"
                          : "rgba(240,237,232,.2)",
                        fontFamily,
                        marginTop: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      {active ? descs[i] || "Current step" : done ? "Done" : ""}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Controls (no behavior changes) */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <button
          type="button"
          onClick={() => setCur((c) => Math.max(0, c - 1))}
          disabled={cur <= 0}
          style={{
            padding: "7px 14px",
            borderRadius: 7,
            border: "1px solid rgba(255,255,255,.1)",
            background: "transparent",
            color: `rgba(240,237,232,${cur <= 0 ? 0.2 : 0.5})`,
            fontFamily,
            fontSize: 12,
            cursor: cur <= 0 ? "not-allowed" : "pointer",
            transition: "all .12s",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          aria-label="Previous step"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={() => setCur((c) => Math.min(steps.length - 1, c + 1))}
          disabled={cur >= steps.length - 1}
          style={{
            padding: "7px 16px",
            borderRadius: 7,
            border: `1px solid rgba(${rgb},.28)`,
            background: `rgba(${rgb},.1)`,
            color: lighten(col),
            fontFamily,
            fontSize: 12,
            cursor: cur >= steps.length - 1 ? "not-allowed" : "pointer",
            transition: "all .12s",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          aria-label="Next step"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
