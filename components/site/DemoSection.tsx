"use client";

import { useState, useEffect } from "react";
import { useReveal } from "@/lib/useReveal";
import { ForgeButton } from "@/components/forge/ForgeButton";
import { ForgeToast } from "@/components/forge/ForgeToast";
import { ForgeAlert } from "@/components/forge/ForgeAlert";
import { ForgeMorphBlob } from "@/components/forge/ForgeMorphBlob";
import { ForgeSpinner } from "@/components/forge/ForgeSpinner";
import { ForgeSlider } from "@/components/forge/ForgeSlider";
import { ForgeCountUp } from "@/components/forge/ForgeCountUp";

/* ─── Cell 1: Button + Toast easter egg ─────────────────── */
function Cell1() {
  // 0 = idle, 1 = first toast shown, 2 = second toast shown, 3 = alert shown
  const [phase, setPhase] = useState(0);
  const [toastKey, setToastKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  function handleClick() {
    if (phase === 0) {
      setPhase(1);
      setToastKey((k) => k + 1);
    } else if (phase === 1) {
      setPhase(2);
      setToastKey((k) => k + 1);
    } else if (phase === 2) {
      setPhase(3);
      setToastKey((k) => k + 1);
      setShowAlert(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[160px] relative">
      <ForgeButton variant="glow" color="#7F77DD" onClick={handleClick}>
        {phase === 0
          ? "click me"
          : phase === 1
            ? "once more..."
            : "one last time"}
      </ForgeButton>

      {phase === 1 && (
        <ForgeToast
          key={toastKey}
          title="nice."
          message="click again for a surprise..."
          variant="success"
          onClose={() => {}}
        />
      )}
      {phase === 2 && (
        <ForgeToast
          key={toastKey}
          title="once more for a surprise..."
          variant="info"
          onClose={() => {}}
        />
      )}

      {showAlert && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: "rgba(9,9,11,0.8)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="flex flex-col gap-4 rounded-[14px] border border-[var(--line2)]"
            style={{
              background: "var(--bg2)",
              padding: "32px",
              maxWidth: 420,
              width: "90%",
            }}
          >
            <ForgeAlert
              title="You found it."
              message="Every component on this page is installable with a single npx command."
              variant="success"
              showClose={false}
              showAction={false}
            />
            <ForgeButton
              variant="ghost"
              color="#7F77DD"
              onClick={() => {
                setShowAlert(false);
                setPhase(0);
              }}
            >
              got it
            </ForgeButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Cell 2: ForgeMorphBlob ─────────────────────────────── */
function Cell2() {
  const [held, setHeld] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 min-h-[160px] select-none cursor-pointer"
      onMouseDown={() => setHeld(true)}
      onMouseUp={() => setHeld(false)}
      onMouseLeave={() => setHeld(false)}
      onTouchStart={() => setHeld(true)}
      onTouchEnd={() => setHeld(false)}
    >
      <div
        style={{
          transition: "filter 0.2s",
          filter: held ? "blur(6px)" : "none",
        }}
      >
        <ForgeMorphBlob
          color="#7F77DD"
          color2="#D4537E"
          size={100}
          speed={held ? "fast" : "normal"}
          opacity={held ? 1 : 0.8}
        />
      </div>
      <span
        className="text-center"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: "var(--hint)",
          letterSpacing: "0.08em",
        }}
      >
        hold to morph
      </span>
    </div>
  );
}

/* ─── Cell 3: ForgeSpinner ───────────────────────────────── */
function Cell3() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[160px]">
      <ForgeSpinner color="#7F77DD" variant="ring" size="lg" />
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: "var(--hint)",
          letterSpacing: "0.08em",
        }}
      >
        loading state
      </span>
    </div>
  );
}

/* ─── Cell 4: ForgeSlider ────────────────────────────────── */
function Cell4() {
  const [val, setVal] = useState(50);

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[160px] w-full px-4">
      <div
        className="rounded-[8px] border border-[var(--line)] transition-all"
        style={{
          width: 64,
          height: 64,
          background: "var(--bg3)",
          borderRadius: val,
          transition: "border-radius 0.1s",
        }}
      />
      <div className="w-full max-w-[200px]">
        <ForgeSlider
          label="border radius · px"
          min={0}
          max={50}
          value={val}
          color="#7F77DD"
          showValue
          unit=""
          onChange={setVal}
        />
      </div>
    </div>
  );
}

/* ─── Cell 5: ForgeCountUp ───────────────────────────────── */
function Cell5() {
  return (
    <div className="flex items-center justify-center gap-8 min-h-[160px] flex-wrap px-4">
      <ForgeCountUp
        to={40}
        label="components"
        size="lg"
        color="#7F77DD"
        showLabel
      />
      <ForgeCountUp
        to={1}
        label="MIT licence"
        size="lg"
        color="#1D9E75"
        showLabel
      />
      <ForgeCountUp
        to={0}
        label="zero runtime"
        size="lg"
        color="#D4537E"
        showLabel
      />
    </div>
  );
}

/* ─── Cell wrapper ───────────────────────────────────────── */
function DemoCell({
  label,
  children,
  span2 = false,
}: {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div
      className={`border border-[var(--line)] relative overflow-hidden${span2 ? " col-span-2" : ""}`}
      style={{ background: "var(--bg2)" }}
    >
      <div
        className="absolute top-0 left-0 px-3 py-2 z-10"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          color: "var(--hint)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
          background: "var(--bg2)",
        }}
      >
        {label}
      </div>
      <div className="pt-8">{children}</div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export default function DemoSection() {
  const ref = useReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px",
  });

  return (
    <section
      ref={ref}
      id="demo"
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <span className="section-tag">configure · preview · copy</span>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontSize: "clamp(28px,3vw,42px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 680,
              marginTop: 16,
            }}
          >
            Configure every component visually,
            <br />
            then install it with{" "}
            <span style={{ color: "#7F77DD" }}>one command</span>.
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(240,237,232,0.5)",
              marginTop: 10,
            }}
          >
            Interact with the components below.
          </p>
        </div>

        {/* Grid */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            gridTemplateRows: "auto auto",
          }}
        >
          {/* Row 1 */}
          <DemoCell label="ForgeButton · interactive">
            <Cell1 />
          </DemoCell>
          <DemoCell label="ForgeMorphBlob · HOLD">
            <Cell2 />
          </DemoCell>
          <DemoCell label="ForgeSpinner · LOADING">
            <Cell3 />
          </DemoCell>

          {/* Row 2 — 2+1 split */}
          <DemoCell label="ForgeSlider · BORDER RADIUS" span2>
            <Cell4 />
          </DemoCell>
          <DemoCell label="ForgeCountUp">
            <Cell5 />
          </DemoCell>
        </div>
      </div>
    </section>
  );
}
