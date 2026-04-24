"use client";
import { useId, useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { PaginationProps } from "@/lib/types";

export default function PaginationRenderer({
  props: p,
}: {
  props: PaginationProps;
}) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  const totalPages = Math.ceil((p.total || 48) / (p.perPage || 10));
  const [cur, setCur] = useState(p.current || 3);

  const pages: number[] = [];
  for (let i = Math.max(1, cur - 2); i <= Math.min(totalPages, cur + 2); i++)
    pages.push(i);

  const btnBase = {
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,.08)",
    background: "transparent",
    fontFamily,
    fontSize: 13,
    cursor: "pointer",
    transition: "all .12s",
    padding: "7px 12px",
    color: "rgba(240,237,232,.4)",
    minWidth: 34,
  } as const;

  const fmtStart = (page: number) => (page - 1) * (p.perPage || 10) + 1;
  const fmtEnd = (page: number) =>
    Math.min(
      page * (p.perPage || 10),
      p.total ?? totalPages * (p.perPage || 10),
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Navigation landmark with semantic list of pages */}
      <nav aria-label={p.label ?? "Pagination"} id={`${uid}-pagination`}>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {p.showArrows && (
            <li role="none">
              <button
                type="button"
                aria-label="Previous page"
                disabled={cur <= 1}
                onClick={() => setCur((c: number) => Math.max(1, c - 1))}
                style={{
                  ...btnBase,
                  padding: "7px 11px",
                  opacity: cur <= 1 ? 0.4 : 1,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                ‹
              </button>
            </li>
          )}

          {cur > 3 && (
            <>
              <li role="none">
                <button
                  type="button"
                  onClick={() => setCur(1)}
                  style={{ ...btnBase, border: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,.04)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  1
                </button>
              </li>
              <li role="presentation" aria-hidden="true">
                <span
                  style={{
                    color: "rgba(240,237,232,.2)",
                    fontSize: 12,
                    padding: "0 2px",
                  }}
                >
                  …
                </span>
              </li>
            </>
          )}

          {pages.map((pg) => (
            <li key={pg} role="none">
              <button
                type="button"
                onClick={() => setCur(pg)}
                aria-current={pg === cur ? "page" : undefined}
                style={{
                  ...btnBase,
                  border: `1px solid ${pg === cur ? `rgba(${rgb},.35)` : "transparent"}`,
                  background: pg === cur ? `rgba(${rgb},.12)` : "transparent",
                  color: pg === cur ? lighten(col) : "rgba(240,237,232,.4)",
                }}
                onMouseOver={(e) => {
                  if (pg !== cur)
                    e.currentTarget.style.background = "rgba(255,255,255,.04)";
                }}
                onMouseOut={(e) => {
                  if (pg !== cur)
                    e.currentTarget.style.background = "transparent";
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {pg}
              </button>
            </li>
          ))}

          {cur < totalPages - 2 && (
            <>
              <li role="presentation" aria-hidden="true">
                <span
                  style={{
                    color: "rgba(240,237,232,.2)",
                    fontSize: 12,
                    padding: "0 2px",
                  }}
                >
                  …
                </span>
              </li>
              <li role="none">
                <button
                  type="button"
                  onClick={() => setCur(totalPages)}
                  style={{ ...btnBase, border: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,.04)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          {p.showArrows && (
            <li role="none">
              <button
                type="button"
                aria-label="Next page"
                disabled={cur >= totalPages}
                onClick={() =>
                  setCur((c: number) => Math.min(totalPages, c + 1))
                }
                style={{
                  ...btnBase,
                  padding: "7px 11px",
                  opacity: cur >= totalPages ? 0.4 : 1,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                ›
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Count with polite live region so screen readers hear updates */}
      {p.showCount && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ fontSize: 11, color: "rgba(240,237,232,.3)", fontFamily }}
        >
          Showing {fmtStart(cur)}–{fmtEnd(cur)} of{" "}
          {p.total ?? totalPages * (p.perPage || 10)}
        </div>
      )}
    </div>
  );
}
