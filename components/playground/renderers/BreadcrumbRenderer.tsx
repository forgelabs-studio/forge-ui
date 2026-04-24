"use client";
import { useId } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { BreadcrumbProps } from "@/lib/types";

export default function BreadcrumbRenderer({
  props: p,
}: {
  props: BreadcrumbProps;
}) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const items = (p.items || "Home,Components,Button")
    .split(",")
    .map((x: string) => x.trim());

  const separator = p.separator ?? "/";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <nav
        aria-label={p.label ?? "Breadcrumb"}
        id={`${uid}-breadcrumb`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {/* Optional home link */}
        {p.showHome && (
          <>
            <a
              href="#"
              aria-label="Home"
              style={{
                fontSize: 12,
                color: "rgba(240,237,232,.4)",
                fontFamily,
                cursor: "pointer",
                transition: "color .12s",
                display: "inline-block",
                padding: 2,
                borderRadius: 4,
                textDecoration: "none",
                outline: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#f0ede8")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "rgba(240,237,232,.4)")
              }
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${hexRgb(
                  col,
                )},.06)`)
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              ⌂
            </a>

            <span
              aria-hidden="true"
              style={{ color: "rgba(240,237,232,.2)", fontSize: 12 }}
            >
              {separator}
            </span>
          </>
        )}

        {/* Semantic breadcrumb list */}
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {items.map((item: string, i: number) => {
            const isLast = i === items.length - 1;
            return (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {/* Separator between items (hidden from AT) */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{ color: "rgba(240,237,232,.2)", fontSize: 12 }}
                  >
                    {separator}
                  </span>
                )}

                {/* Link for each crumb; last item marked as current page */}
                <a
                  href="#"
                  role="link"
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    fontSize: 12,
                    color: isLast ? lighten(col) : "rgba(240,237,232,.4)",
                    fontFamily,
                    cursor: "pointer",
                    fontWeight: isLast ? 400 : 300,
                    transition: "color .12s",
                    textDecoration: "none",
                    padding: 2,
                    borderRadius: 4,
                    outline: "none",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#f0ede8")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = isLast
                      ? lighten(col)
                      : "rgba(240,237,232,.4)")
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${hexRgb(col)},.06)`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Example secondary breadcrumb trails (visual only) */}
      <div
        style={{
          opacity: 0.35,
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {[
          ["Home", "Docs", "Button"],
          ["Home", "Charts", "Donut"],
        ].map((trail, ti) => (
          <nav
            key={ti}
            aria-hidden="true"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            {trail.map((item, i) => (
              <span key={i}>
                <span
                  style={{
                    color: "rgba(240,237,232,.2)",
                    fontSize: 11,
                    display: i > 0 ? undefined : "none",
                  }}
                >
                  /
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color:
                      i === trail.length - 1
                        ? "rgba(240,237,232,.6)"
                        : "rgba(240,237,232,.3)",
                    fontFamily,
                  }}
                >
                  {item}
                </span>
              </span>
            ))}
          </nav>
        ))}
      </div>
    </div>
  );
}
