"use client";

import { useReveal } from "@/lib/useReveal";
import { useRouter } from "next/navigation";
import { ForgeButton } from "@/components/forge/ForgeButton";
import { ForgeTicker } from "@/components/forge/ForgeTicker";
import { tickerItems } from "@/lib/siteData";

export default function Hero() {
  const ref = useReveal();
  const router = useRouter();

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center text-center relative"
      style={{ padding: "160px 40px 120px" }}
    >
      {/* Eyebrow */}
      <div
        className="reveal inline-flex items-center gap-2 rounded-full [font-family:var(--mono)]"
        style={{
          padding: "6px 14px",
          marginBottom: 32,
          background: "rgba(29,158,117,0.1)",
          border: "1px solid rgba(29,158,117,0.22)",
          fontSize: 12,
          color: "rgba(93,202,165,0.8)",
          letterSpacing: "0.04em",
        }}
      >
        Building in public · Open source · MIT licence
      </div>

      {/* Headline */}
      <h1
        className="reveal reveal-delay-1"
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(48px,7vw,92px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          marginBottom: 28,
          maxWidth: 900,
        }}
      >
        Tools for design engineers.
        <br />
        <em className="italic text-[var(--muted)]">
          Built the way we&apos;d want to use them.
        </em>
      </h1>

      {/* Sub */}
      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: "clamp(16px,2vw,19px)",
          fontWeight: 300,
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: 540,
          marginBottom: 40,
        }}
      >
        Open source React components, design token pipelines, and animation
        primitives. Configure visually, install with one command, own the code
        forever.
      </p>

      {/* CTAs */}
      <div
        className="reveal reveal-delay-2 flex flex-wrap justify-center"
        style={{
          gap: 14,
          marginBottom: 64,
        }}
      >
        <ForgeButton
          variant="solid"
          color="#7F77DD"
          onClick={() => router.push("/playground")}
        >
          Explore the toolkit
        </ForgeButton>
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
          Star on GitHub ↗
        </ForgeButton>
      </div>

      {/* Ticker */}
      <div
        className="reveal reveal-delay-3"
        style={{ width: "100%", maxWidth: 800, marginBottom: 80 }}
      >
        <ForgeTicker
          items={tickerItems}
          speed="slow"
          bordered
          pauseOnHover={false}
        />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-[var(--hint)] tracking-[0.1em] uppercase [font-family:var(--mono)]">
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
