"use client";
import { useState } from "react";

function CodeBlock({
  lang,
  code,
  copyText,
}: {
  lang: string;
  code: React.ReactNode;
  copyText: string;
}) {
  const [ok, setOk] = useState(false);
  function copy() {
    navigator.clipboard.writeText(copyText).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    });
  }
  return (
    <div className="code-block">
      <div className="cb-header">
        <span className="cb-lang">{lang}</span>
        <button className={`cb-copy${ok ? " ok" : ""}`} onClick={copy}>
          {ok ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div className="cb-body">{code}</div>
    </div>
  );
}

const ALL_COMPONENTS =
  "button card input badge toggle select checkbox radio slider textarea avatar statcard taginput datepicker spinner fadeup ticker morphblob countup barchart linechart donut progress sparkline cmdpalette navbar breadcrumb pagination sidenav tabs modal toast tooltip dropdown drawer skeleton alert stepper accordion table";

export default function HowItWorksPage() {
  return (
    <div className="howto-page">
      <div className="howto">
        <div className="ht-eyebrow">The workflow</div>
        <h1 className="ht-h1">
          From playground
          <br />
          <em>to production.</em>
        </h1>
        <p className="ht-lead">
          Four steps. No package to install at runtime. No API surface to break.
          Just your code, configured exactly how you want it, living in your
          project.
        </p>

        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-title">Pick a component and configure it</div>
            <div className="step-desc">
              Open the Playground. Select any of the 40 components from the
              sidebar. Every property you change — colour, variant, size, hover
              effect, animation — updates the live preview instantly.
              You&apos;re not just browsing, you&apos;re configuring.
            </div>
            <div className="step-icon">⊞</div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-title">
              A command builds itself as you work
            </div>
            <div className="step-desc">
              Watch the terminal window at the bottom of the screen. Every
              property change adds or updates a flag in the CLI command. Change
              colour to red — <code>--color=#e24b4a</code> appears. Switch to
              solid variant — <code>--variant=solid</code> is added. The command
              is always in sync.
            </div>
            <div className="step-icon">⌘</div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-title">Copy and run in your project</div>
            <div className="step-desc">
              Hit{" "}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                ⌘ Copy command
              </strong>
              . Paste it into your terminal at the root of your Next.js or React
              project. Two files are written: <code>ForgeButton.tsx</code> and{" "}
              <code>ForgeButton.css</code>. They&apos;re pre-configured to your
              exact specification.
            </div>
            <div className="step-icon">▶</div>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <div className="step-title">Use the TSX tag anywhere</div>
            <div className="step-desc">
              Import and use like any React component. The <code>color</code>{" "}
              prop is the only concept — pass any hex value and the component
              derives its glow, hover state, focus ring, and border from it
              automatically.
            </div>
            <div className="step-icon">◉</div>
          </div>
        </div>

        <hr className="ht-divider" />

        <h2 className="ht-h2">The colour token system</h2>
        <p className="ht-p">
          Pass one hex value. The component handles everything else. Glow
          intensity, border opacity, hover shadow, focus ring — all derived from
          a single <code>--Forge-rgb</code> custom property calculated at
          install time.
        </p>

        <CodeBlock
          lang="tsx — one colour, every state covered"
          copyText={`<ForgeButton color="#7F77DD">Start a project</ForgeButton>\n<ForgeButton color="#e24b4a">Delete account</ForgeButton>\n<ForgeCard color="#1D9E75" title="Open source" />`}
          code={
            <>
              <span className="cmt">
                {"// Each component gets its own colour token"}
              </span>
              <br />
              <span className="cmt">
                {"// Glow, hover, focus — all derived automatically"}
              </span>
              <br />
              <br />
              <span className="tag">{"<ForgeButton"}</span>{" "}
              <span className="attr">color</span>=
              <span className="str">{'"#7F77DD"'}</span>
              <span className="tag">{">"}</span>Start a project
              <span className="tag">{"</ForgeButton>"}</span>
              <br />
              <span className="tag">{"<ForgeButton"}</span>{" "}
              <span className="attr">color</span>=
              <span className="str">{'"#e24b4a"'}</span>
              <span className="tag">{">"}</span>Delete account
              <span className="tag">{"</ForgeButton>"}</span>
              <br />
              <span className="tag">{"<ForgeCard"}</span>{" "}
              <span className="attr">color</span>=
              <span className="str">{'"#1D9E75"'}</span>{" "}
              <span className="attr">title</span>=
              <span className="str">{'"Open source"'}</span>{" "}
              <span className="tag">{"/>"}</span>
            </>
          }
        />

        <hr className="ht-divider" />

        <h2 className="ht-h2">You own the code</h2>
        <p className="ht-p">
          The files the CLI writes belong to your project. There&apos;s no
          runtime npm dependency to update, no API that breaks between versions.
          Open <code>ForgeButton.tsx</code> — it&apos;s just React. Open{" "}
          <code>ForgeButton.css</code> — it&apos;s just CSS. Change anything you
          want.
        </p>
        <p className="ht-p">
          When a new version of FORGE ships, run{" "}
          <code>npx FORGE-ui update button</code> and the CLI regenerates the
          file with the same flags you originally used, pulling in any
          improvements we&apos;ve made. Your customisations are preserved.
        </p>

        <div className="callout callout-tip">
          <div className="callout-icon">✦</div>
          <div>
            Because each component is its own file, tree shaking works
            naturally. Install 40 components, use 3, pay for 3. Only the files
            you actually import get bundled.
          </div>
        </div>

        <hr className="ht-divider" />

        <h2 className="ht-h2">Install everything at defaults</h2>
        <p className="ht-p">
          Don&apos;t want to configure each component individually? Install all
          40 with one command and customise via props in your JSX later.
        </p>

        <CodeBlock
          lang="bash"
          copyText={`npx FORGE-ui add ${ALL_COMPONENTS}`}
          code={
            <>
              <span className="cmt">{"# Install all 40 with defaults"}</span>
              <br />
              <span className="str">{`npx FORGE-ui add ${ALL_COMPONENTS}`}</span>
            </>
          }
        />

        <div className="callout callout-info">
          <div className="callout-icon">i</div>
          <div>
            Don&apos;t forget to run <code>npx FORGE-ui init</code> first to
            create the tokens file and config. Import{" "}
            <code>FORGE-tokens.css</code> once in your root layout and
            you&apos;re ready.
          </div>
        </div>
      </div>
    </div>
  );
}
