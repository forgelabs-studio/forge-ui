"use client";

import { useReveal } from "@/lib/useReveal";
import Link from "next/link";
import { ForgeBadge } from "@/components/forge/ForgeBadge";
import { ForgeButton } from "@/components/forge/ForgeButton";
import { ForgeCard } from "@/components/forge/ForgeCard";

export default function SiteHero() {
  const ref = useReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px",
  });

  return (
    <section
      ref={ref}
      className="border-b border-[var(--line)]"
      style={{ padding: "140px 0 100px" }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(360px, 0.85fr)",
            gap: 80,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left column */}
          <div className="flex flex-col" style={{ gap: 24 }}>
            {/* Badge */}
            <div className="reveal">
              <ForgeBadge
                variant="pill"
                color="#7F77DD"
                size="sm"
                showDot
                dotPulse
              >
                forge.ui · v0.3.0
              </ForgeBadge>
            </div>

            {/* H1 */}
            <h1
              className="reveal reveal-delay-1 font-medium leading-[1.04] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font)",
                fontSize: "clamp(38px,5vw,64px)",
              }}
            >
              Ship polished React components
              <br />
              <span style={{ color: "#7F77DD" }}>you own.</span>
            </h1>

            {/* Italic line */}
            <p
              className="reveal reveal-delay-1"
              style={{
                fontSize: "clamp(16px,1.5vw,22px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "rgba(240,237,232,0.7)",
                lineHeight: 1.4,
              }}
            >
              Configure visually. Copy once. Keep the code.
            </p>

            {/* Subtext */}
            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: 440,
              }}
            >
              Forge UI gives you production-ready React components with editable
              props, CSS included, and no package lock-in. Generate the
              component, drop it into your app, and customise it like any other
              file.
            </p>

            {/* CTAs */}
            <div
              className="reveal reveal-delay-2 flex flex-wrap mt-8"
              style={{ gap: 12 }}
            >
              <Link href="/playground" style={{ textDecoration: "none" }}>
                <ForgeButton variant="glow" color="#7F77DD">
                  try the playground ↗
                </ForgeButton>
              </Link>
              <a
                href="https://github.com/forgelabs-studio/forge-ui"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <ForgeButton variant="ghost" color="#7F77DD">
                  view GitHub
                </ForgeButton>
              </a>
            </div>
          </div>

          {/* Right column — hidden on mobile */}
          <div className="reveal reveal-delay-2 hide-mobile">
            <ForgeCard
              title=""
              subtitle=""
              showTag={false}
              showBadge={false}
              showGlow={false}
              color="#7F77DD"
              radius={14}
              padding={0}
            >
              {/* Terminal block */}
              <div
                className="rounded-[14px] overflow-hidden border border-[var(--line2)]"
                style={{ background: "var(--bg)" }}
              >
                {/* Window bar */}
                <div
                  className="flex items-center gap-2 px-4 border-b border-[var(--line)]"
                  style={{ height: 36, background: "var(--bg2)" }}
                >
                  <div className="flex gap-[5px]">
                    <div
                      className="rounded-full"
                      style={{
                        width: 9,
                        height: 9,
                        background: "var(--red)",
                        opacity: 0.7,
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        width: 9,
                        height: 9,
                        background: "var(--amber)",
                        opacity: 0.7,
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        width: 9,
                        height: 9,
                        background: "var(--teal)",
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--hint)",
                      marginLeft: 8,
                    }}
                  >
                    terminal
                  </span>
                </div>

                {/* Terminal body */}
                <div
                  style={{
                    padding: "20px 20px",
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    lineHeight: 2,
                  }}
                >
                  {/* Command */}
                  <div className="flex items-center gap-2">
                    <span style={{ color: "rgba(127,119,221,0.5)" }}>$</span>
                    <span style={{ color: "var(--text)" }}>
                      npx @forgelabs-studio/ui add button
                    </span>
                  </div>

                  {/* Output */}
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ color: "var(--teal)", fontWeight: 500 }}>
                      ✓
                    </span>
                    <span style={{ color: "rgba(240,237,232,0.5)" }}>
                      ForgeButton.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--teal)", fontWeight: 500 }}>
                      ✓
                    </span>
                    <span style={{ color: "rgba(240,237,232,0.5)" }}>
                      ForgeButton.css
                    </span>
                  </div>

                  {/* Import line */}
                  <div
                    className="mt-3 rounded-[6px] px-3 py-2"
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ color: "rgba(127,119,221,0.6)" }}>
                      import{" "}
                    </span>
                    <span
                      style={{ color: "var(--text)" }}
                    >{`{ ForgeButton } `}</span>
                    <span style={{ color: "rgba(127,119,221,0.6)" }}>
                      from{" "}
                    </span>
                    <span style={{ color: "var(--teal-light)" }}>
                      &apos;@/components/forge/ForgeButton&apos;
                    </span>
                  </div>
                </div>
              </div>
            </ForgeCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
