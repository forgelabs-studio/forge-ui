"use client";

import { useReveal } from "@/lib/useReveal";
import { tenets } from "@/lib/siteData";

export default function Philosophy() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="about"
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        <div className="manifesto-grid">
          {/* Left — sticky */}
          <div className="manifesto-left reveal">
            <span className="section-tag">{"// The philosophy"}</span>
            <h2
              style={{ fontSize: "clamp(28px,3.5vw,46px)", marginBottom: 20 }}
              className="[font-family:var(--serif)] font-normal leading-[1.1] tracking-[-0.02em]"
            >
              Every tool built
              <br />
              <em className="italic text-[var(--muted)]">
                the way we&apos;d want
                <br />
                to use it.
              </em>
            </h2>
            <p className="text-sm font-light text-[var(--muted)] leading-[1.8] mb-5">
              The FORGE toolkit exists because the tools we needed didn&apos;t.
              A component library with a real colour system. A design token
              pipeline that doesn&apos;t need a PhD. Animation presets that feel
              considered, not assembled.
            </p>
            <p
              style={{ marginBottom: 20 }}
              className="text-sm font-light text-[var(--muted)] leading-[1.8]"
            >
              Everything is MIT licensed, everything ships as files you own, and
              everything is built with the same standard we hold our own work
              to.
            </p>
          </div>

          {/* Right — tenets */}
          <div>
            {tenets.map((t, i) => (
              <div
                key={t.num}
                className={`tenet reveal${i < 3 ? ` reveal-delay-${i + 1}` : ""}`}
              >
                <div className="[font-family:var(--mono)] text-[10px] text-[var(--hint)] tracking-[0.08em] pt-[3px] shrink-0 w-7">
                  {t.num}
                </div>
                <div>
                  <div
                    style={{ marginBottom: 4 }}
                    className="text-sm font-medium text-[var(--text)] tracking-[-0.01em]"
                  >
                    {t.title}
                  </div>
                  <div className="text-[12px] font-light text-[var(--muted)] leading-[1.65]">
                    {t.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
