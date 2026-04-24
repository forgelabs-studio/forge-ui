"use client";
import { useId } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { NavbarProps } from "@/lib/types";

export default function NavbarRenderer({ props: p }: { props: NavbarProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const isDark = p.variant === "dark";
  const bg = isDark ? "#0f0f12" : "rgba(255,255,255,.95)";
  const tc = isDark ? "rgba(240,237,232,.6)" : "rgba(0,0,0,.6)";
  const links: string[] = Array.isArray(p.links)
    ? p.links
    : (p.links || "Work,About,Services,Contact")
        .split(",")
        .map((s: string) => s.trim());

  const navLabel =
    p.label ?? (p.showLogo ? `${p.brand} navigation` : "Main navigation");

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <nav
        aria-label={navLabel}
        id={`${uid}-nav`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 16px",
          height: 50,
          background: bg,
          border: `1px solid ${isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.08)"}`,
          borderRadius: 10,
        }}
      >
        {/* Left: brand */}
        <div>
          {p.showLogo && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-.02em",
                color: textColor,
                fontFamily,
              }}
            >
              {p.brand}
            </div>
          )}
        </div>

        {/* Center: links — now using pure semantic HTML */}
        <div>
          <ul
            aria-label="Primary"
            style={{
              display: "flex",
              gap: 2,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {links.map((l: string, i: number) => {
              const isActive = i === 0;
              return (
                <li key={i}>
                  <a
                    href="#"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      display: "inline-block",
                      padding: "6px 11px",
                      borderRadius: 6,
                      fontSize: 12,
                      color: isActive ? textColor : tc,
                      fontFamily,
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all .15s",
                      background: isActive
                        ? isDark
                          ? "rgba(255,255,255,.06)"
                          : "rgba(0,0,0,.05)"
                        : "transparent",
                      outline: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = textColor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = isActive ? textColor : tc)
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    {l}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: CTA */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {p.showCta && (
            <button
              type="button"
              aria-label={p.ctaText ?? "Call to action"}
              style={{
                padding: "7px 14px",
                borderRadius: 7,
                border: `1px solid rgba(${rgb},.3)`,
                background: `rgba(${rgb},.1)`,
                color: lighten(col),
                fontFamily,
                fontSize: 12,
                cursor: "pointer",
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 0 4px rgba(${rgb},.08)`)
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {p.ctaText}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
