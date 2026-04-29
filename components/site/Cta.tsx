"use client";

import { useReveal } from "@/lib/useReveal";
import { ForgeButton } from "@/components/forge/ForgeButton";

export default function Cta() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-spectrum" />
          <div
            className="gem"
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              margin: "0 auto 28px",
            }}
          />
          <h2
            className="[font-family:var(--serif)] font-normal leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 16 }}
          >
            Built in public.
            <br />
            <em className="italic text-[var(--muted)]">Used by anyone.</em>
          </h2>
          <p
            className="text-base font-light text-[var(--muted)] leading-[1.7]"
            style={{ marginBottom: 36 }}
          >
            Star the repo, open an issue, contribute a component.
            <br />
            Everything is MIT licensed and lives on GitHub.
          </p>
          <div
            className="flex items-center justify-center flex-wrap"
            style={{ gap: 12 }}
          >
            <ForgeButton
              variant="solid"
              color="#7F77DD"
              onClick={() =>
                window.open(
                  "https://github.com/forgelabs-studio/forge-ui",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Star on GitHub ↗
            </ForgeButton>
            <ForgeButton
              variant="ghost"
              color="#7F77DD"
              onClick={() =>
                window.open(
                  "https://forgelabs.studio/playground",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Try the playground
            </ForgeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
