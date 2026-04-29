"use client";

import { useReveal } from "@/lib/useReveal";
import { ForgeButton } from "@/components/forge/ForgeButton";
import { ForgeBadge } from "@/components/forge/ForgeBadge";
import { tools } from "@/lib/siteData";

export default function Tools() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="tools"
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <span className="section-tag">{"// The toolkit"}</span>
          <h2
            className="[font-family:var(--serif)] font-normal leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px,4vw,52px)" }}
          >
            Everything you need.
            <br />
            <em className="italic text-[var(--muted)]">
              Nothing you don&apos;t own.
            </em>
          </h2>
        </div>

        {/* Featured: FORGE.ui */}
        <div
          className="tool-card tool-featured reveal"
          style={{ marginBottom: 20 }}
        >
          <div className="tool-card-header">
            <div>
              <div
                className="flex items-center"
                style={{ gap: 12, marginBottom: 20 }}
              >
                <div className="gem size-10 rounded-[10px]" />
                <div>
                  <div className="tool-name">
                    FORGE<span>.ui</span>
                  </div>
                  <div className="text-[11px] text-[var(--hint)] [font-family:var(--mono)]">
                    @forgelabs-studio/ui
                  </div>
                </div>
              </div>
              <p className="tool-tagline mb-5">
                Spectrum-aware, motion-first React components. Configure
                visually, install with one command, own the code forever.
              </p>
              <div className="tool-stats">
                <div className="tool-stat">
                  <span className="tool-stat-num">40</span>
                  <span className="tool-stat-label">components</span>
                </div>
                <div className="tool-stat">
                  <span className="tool-stat-num">7</span>
                  <span className="tool-stat-label">groups</span>
                </div>
                <div className="tool-stat">
                  <span className="tool-stat-num">MIT</span>
                  <span className="tool-stat-label">licence</span>
                </div>
              </div>
              <div className="flex flex-wrap" style={{ gap: 10 }}>
                <ForgeButton
                  variant="solid"
                  color="#7F77DD"
                  onClick={() =>
                    window.open(
                      "https://forgelabs.studio/playground",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  Open playground
                </ForgeButton>
                <ForgeButton
                  variant="ghost"
                  color="#7F77DD"
                  onClick={() =>
                    window.open(
                      "https://github.com/forgelabs-studio/forge-ui",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  GitHub ↗
                </ForgeButton>
              </div>
            </div>

            <ForgeBadge variant="pill" color="#1D9E75" size="sm" dotPulse>
              Live
            </ForgeBadge>
          </div>

          <div className="tool-card-body">
            {/* CLI preview */}
            <div className="cli-preview">
              <div className="cli-preview-bar">
                <div className="flex gap-[5px]">
                  <div className="size-[9px] rounded-full bg-[#e24b4a] opacity-60" />
                  <div className="size-[9px] rounded-full bg-[#EF9F27] opacity-60" />
                  <div className="size-[9px] rounded-full bg-[#1D9E75] opacity-60" />
                </div>
                <span className="text-[10px] text-[var(--hint)] [font-family:var(--mono)]">
                  terminal
                </span>
                <span className="text-[10px] text-[rgba(93,202,165,0.6)] [font-family:var(--mono)]">
                  ● bash
                </span>
              </div>
              <div className="cli-preview-body">
                <div className="cli-line">
                  <span className="text-[rgba(127,119,221,0.5)]">$</span>
                  <span>
                    <span className="text-[#5dcaa5]">
                      npx @forgelabs-studio/ui
                    </span>
                    <span className="text-[var(--text)]"> add </span>
                    <span className="text-[var(--amber)]">button</span>
                    <span className="text-[#afa9ec]"> --color</span>
                    <span className="text-[var(--text)]">=</span>
                    <span className="text-[var(--text)]">#7F77DD</span>
                    <span className="text-[#afa9ec]"> --variant</span>
                    <span className="text-[var(--text)]">=glow</span>
                    <span className="cli-cursor" />
                  </span>
                </div>
                <div className="cli-out">
                  <span className="text-[rgba(93,202,165,0.5)]">✓</span>
                  <span>Created components/forge/ForgeButton.tsx</span>
                </div>
                <div className="cli-out">
                  <span className="text-[rgba(93,202,165,0.5)]">✓</span>
                  <span>Created components/forge/ForgeButton.css</span>
                </div>
                <div className="cli-out">
                  <span className="text-[rgba(127,119,221,0.4)]">→</span>
                  <span>{`import { ForgeButton } from '@/components/forge/ForgeButton'`}</span>
                </div>
              </div>
            </div>

            <div className="tool-tags" style={{ marginBottom: 0 }}>
              {[
                "React",
                "TypeScript",
                "Framer Motion",
                "CLI",
                "Zero runtime",
                "Spectrum-aware",
              ].map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary tools */}
        <div className="tools-secondary">
          {tools.map((tool, i) => {
            const [prefix, suffix] = tool.tag.split(".");
            const isMuted = i !== 1;
            return (
              <div
                key={tool.tag}
                className={`tool-card reveal reveal-delay-${i + 1}`}
              >
                <div
                  className="tool-card-header"
                  style={{ flexDirection: "column", gap: 12 }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className="size-9 rounded-[9px] flex items-center justify-center text-base"
                      style={{
                        background: tool.iconBg,
                        border: `1px solid ${tool.iconBorder}`,
                      }}
                    >
                      {tool.icon}
                    </div>
                    <ForgeBadge
                      variant="pill"
                      color="#EF9F27"
                      size="sm"
                      showDot={false}
                    >
                      {isMuted ? "Coming later" : "Coming soon"}
                    </ForgeBadge>
                  </div>
                  <div>
                    <div className="tool-name !text-[17px]">
                      {prefix}
                      <span>.{suffix}</span>
                    </div>
                    {!isMuted && (
                      <div className="text-[10px] text-[var(--hint)] [font-family:var(--mono)]">
                        {tool.sub}
                      </div>
                    )}
                  </div>
                </div>

                <div className="tool-card-body">
                  <div
                    style={
                      isMuted
                        ? {
                            opacity: 0.35,
                            filter: "blur(3px)",
                            userSelect: "none",
                            pointerEvents: "none",
                          }
                        : undefined
                    }
                  >
                    <p className="tool-desc">{tool.desc}</p>
                    <div className="tool-tags">
                      {tool.tags.map((t) => (
                        <span key={t} className="tag-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {!isMuted && (
                    <div className="tool-actions">
                      <ForgeButton
                        variant="ghost"
                        color="#7F77DD"
                        onClick={() =>
                          window.open(
                            "https://github.com/forgelabs-studio",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        Follow progress ↗
                      </ForgeButton>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
