"use client";

import { useReveal } from "@/lib/useReveal";
import { ForgeButton } from "@/components/forge/ForgeButton";

const LINKS = [
  { label: "GitHub ↗", href: "https://github.com/forgelabs-studio" },
  { label: "X / Twitter ↗", href: "https://x.com/forgelabs_studio" },
  { label: "npm ↗", href: "https://www.npmjs.com/org/forgelabs-studio" },
];

export default function BuiltBy() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="border-t border-[var(--line)]"
      style={{ padding: "80px 0" }}
    >
      <div className="container">
        <div className="built-by-inner reveal">
          <div className="flex items-center" style={{ gap: 16 }}>
            <div className="avatar">T</div>
            <div className="flex flex-col" style={{ gap: 2 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Built by Talia — FORGE.labs
              </span>
              <span
                style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300 }}
              >
                Design engineer · Sheffield · Building in public
              </span>
            </div>
          </div>

          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {LINKS.map(({ label, href }) => (
              <ForgeButton
                key={label}
                variant="ghost"
                color="#7F77DD"
                onClick={() =>
                  window.open(href, "_blank", "noopener,noreferrer")
                }
              >
                {label}
              </ForgeButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
