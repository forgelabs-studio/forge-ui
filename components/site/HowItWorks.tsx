"use client";

import { useState, useEffect, useRef } from "react";
import { ForgeStepper } from "@/components/forge/ForgeStepper";

const STEPS = [
  "01 configure visually",
  "02 copy one command",
  "03 own the code",
];

const DESCS = [
  "Pick a component, tweak the props, and preview every change live in the playground.",
  "Copy the generated npx command when it feels right. One line adds everything you need.",
  "The component and CSS live in your repo. No runtime package, no lock-in — just your code.",
];

const SNIPPETS = [
  `// Open the playground\n// Configure any component visually — no code needed.`,
  `npx @forgelabs-studio/ui add button`,
  `// Components live in your repo:\nimport { ForgeButton } from "@/components/forge/ForgeButton";`,
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    ref.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <span className="section-tag">from playground to repo</span>

          <h2
            style={{
              fontSize: "clamp(28px,3vw,42px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            Configure it visually. <br /> Then make it yours.
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "rgba(240,237,232,0.48)",
              marginTop: 12,
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            No dependencies. No abstractions. Just components you control.
          </p>
        </div>

        <div
          className="reveal reveal-delay-1 hiw-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <ForgeStepper
            steps={STEPS}
            descs={DESCS}
            color="#7F77DD"
            variant="vertical"
            showDesc
            current={active}
            onChange={setActive}
          />

          <div
            className="rounded-[10px] overflow-hidden border border-[var(--line2)]"
            style={{
              background: "var(--bg2)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.22)",
            }}
          >
            <div
              className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2"
              style={{ background: "var(--bg3)" }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--hint)",
                  letterSpacing: "0.06em",
                }}
              >
                {active === 0
                  ? "configure"
                  : active === 1
                    ? "terminal"
                    : "your code"}
              </span>

              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--hint)",
                }}
              >
                step {String(active + 1).padStart(2, "0")}
              </span>
            </div>

            <pre
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                lineHeight: 1.8,
                padding: "22px 22px",
                color: "rgba(240,237,232,0.68)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
              }}
            >
              {SNIPPETS[active]}
            </pre>
          </div>
        </div>

        <style>{`
          #how-it-works .forge-step__line {
            height: 56px !important;
            margin: 6px 0 !important;
          }

          #how-it-works .forge-step__content {
            padding-bottom: 8px;
          }

          #how-it-works .forge-step__title {
            font-weight: 500;
          }

          #how-it-works .forge-step__desc {
            max-width: 460px;
          }

          @media (max-width: 767px) {
            #how-it-works .hiw-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
            #how-it-works .forge-step:not(.active) {
              opacity: 0.6;
            }
              #how-it-works .forge-step.active .forge-step__circle {
                box-shadow: 0 0 0 4px rgba(127,119,221,0.1);
              }
                #how-it-works .forge-step {
  opacity: 0.75;
}

#how-it-works .forge-step.active {
  opacity: 1;
}
        `}</style>
      </div>
    </section>
  );
}
