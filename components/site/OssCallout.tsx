"use client";

import { useReveal } from "@/lib/useReveal";
import { useRouter } from "next/navigation";
import { ForgeButton } from "@/components/forge/ForgeButton";

const STEPS = [
  {
    num: "01",
    title: "Configure in the playground.",
    desc: "Pick a component, adjust props. Every change updates the CLI command live.",
  },
  {
    num: "02",
    title: "Copy one command.",
    desc: "Run it in your project terminal. Two files land — a .tsx and a .css.",
  },
  {
    num: "03",
    title: "Own the files.",
    desc: "Import the component. Edit anything. No dependency to maintain.",
  },
];

export default function OssCallout() {
  const ref = useReveal();
  const router = useRouter();

  return (
    <section
      ref={ref}
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        <div className="oss-inner">
          {/* Left */}
          <div className="reveal">
            <span className="section-tag">{"// How it works"}</span>
            <h2
              style={{ fontSize: "clamp(28px,3.5vw,46px)", marginBottom: 20 }}
              className="[font-family:var(--serif)] font-normal leading-[1.1] tracking-[-0.02em]"
            >
              Configure once.
              <br />
              <em className="italic text-[var(--muted)]">Own it forever.</em>
            </h2>
            <p
              style={{ marginBottom: 20 }}
              className="text-sm font-light text-[var(--muted)] leading-[1.8]"
            >
              Every FORGE tool follows the same model — not a package you depend
              on at runtime, but a generator that writes production-ready code
              into your project. After that, it&apos;s just your code. No
              version lock. No breaking changes. No surprises.
            </p>

            <div
              className="flex flex-col"
              style={{ gap: 14, marginBottom: 32 }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  className="flex items-start"
                  style={{ gap: 12 }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      marginTop: 2,
                      borderRadius: 5,
                      background: "rgba(127,119,221,0.12)",
                      border: "1px solid rgba(127,119,221,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontFamily: "var(--mono)",
                      color: "rgba(175,169,236,0.8)",
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[13px] font-light text-[var(--muted)] leading-[1.6]">
                    <strong className="text-[var(--text)] font-medium">
                      {s.title}
                    </strong>{" "}
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap" style={{ gap: 12 }}>
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
                Try the playground
              </ForgeButton>
              <ForgeButton
                variant="ghost"
                color="#7F77DD"
                onClick={() => router.push("/docs")}
              >
                Read the docs
              </ForgeButton>
            </div>
          </div>

          {/* Right — code block */}
          <div className="reveal reveal-delay-2">
            <div className="oss-code">
              <div className="oss-code-bar">
                <span className="text-[11px] text-[var(--hint)] [font-family:var(--mono)]">
                  ForgeButton.tsx
                </span>
                <span className="text-[10px] text-[rgba(93,202,165,0.6)] [font-family:var(--mono)]">
                  your project
                </span>
              </div>
              <div className="oss-code-body">
                <div>
                  <span className="code-comment">
                    {"// This file is yours. Edit anything."}
                  </span>
                </div>
                <div>
                  <span className="code-comment">
                    {"// No dependency on @forgelabs-studio at runtime."}
                  </span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="code-key">&apos;use client&apos;</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="code-muted">interface </span>
                  <span className="text-[var(--text)]">ForgeButtonProps</span>
                  <span className="code-muted"> {"{"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">children</span>
                  <span className="code-muted">: </span>
                  <span className="text-[var(--text)]">React.ReactNode</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">color</span>
                  <span className="code-muted">?: </span>
                  <span className="text-[var(--text)]">string</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">variant</span>
                  <span className="code-muted">?: </span>
                  <span className="code-str">&apos;glow&apos;</span>
                  <span className="code-muted"> | </span>
                  <span className="code-str">&apos;solid&apos;</span>
                  <span className="code-muted"> | </span>
                  <span className="code-str">&apos;ghost&apos;</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">onClick</span>
                  <span className="code-muted">?: () =&gt; void</span>
                </div>
                <div>
                  <span className="code-muted">{"}"}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="code-muted">export function </span>
                  <span className="text-[var(--text)]">ForgeButton</span>
                  <span className="code-muted">{"({"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">children</span>
                  <span className="code-muted">, </span>
                  <span className="code-key">color</span>
                  <span className="code-muted"> = </span>
                  <span className="code-str">&apos;#7F77DD&apos;</span>
                  <span className="code-muted">,</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-key">variant</span>
                  <span className="code-muted"> = </span>
                  <span className="code-str">&apos;glow&apos;</span>
                  <span className="code-muted">, ...props</span>
                </div>
                <div>
                  <span className="code-muted">{"}: ForgeButtonProps) {"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-muted">return (</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-muted">&lt;</span>
                  <span className="code-key">button</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-key">className</span>
                  <span className="code-muted">
                    ={"{`forge-btn forge-btn--${"}
                  </span>
                  <span className="code-key">variant</span>
                  <span className="code-muted">{"}`}"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-key">style</span>
                  <span className="code-muted">={"{{"} </span>
                  <span className="code-key">&apos;--forge-color&apos;</span>
                  <span className="code-muted">: color {"}}"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-muted">{"  {...props}>"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-muted">{"  {children}"}</span>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-muted">{"</"}button&gt;</span>
                </div>
                <div>
                  &nbsp;&nbsp;<span className="code-muted">)</span>
                </div>
                <div>
                  <span className="code-muted">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
