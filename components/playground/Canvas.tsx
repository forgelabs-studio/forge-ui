"use client";
import { usePlaygroundStore, CanvasMode } from "@/store/playground";
import { REGISTRY_BY_ID } from "@/lib/registry";
import dynamic from "next/dynamic";
import CLIWindow from "./CLIWindow";
import SkeletonRenderer from "./renderers/SkeletonRenderer";

// ssr:false keeps chart/canvas libs out of the server render.
// loading prop eliminates the blank flash on mobile where Canvas mounts fresh on tab switch.
const RendererDispatch = dynamic(() => import("./RendererDispatch"), {
  ssr: false,
  loading: () => (
    <SkeletonRenderer props={{ animated: true, variant: "card", label: "" }} />
  ),
});

const MODES: { key: CanvasMode; label: string }[] = [
  { key: "c-grid", label: "Grid" },
  { key: "c-dots", label: "Dots" },
  { key: "c-dark", label: "Dark" },
];

export default function Canvas() {
  const { activeComponent, canvasMode, setCanvasMode } = usePlaygroundStore();
  const meta = REGISTRY_BY_ID[activeComponent];

  return (
    <div className="centre">
      {/* Preview bar */}
      <div className="prev-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 9,
              color: "var(--hint)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            Preview
          </span>
          <div className="pmodes">
            {MODES.map((m) => (
              <button
                key={m.key}
                className={`pm${canvasMode === m.key ? " active" : ""}`}
                onClick={() => setCanvasMode(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            {meta?.displayName.replace("FORGE", "") ?? activeComponent}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div className="ch-dot" />
            <span style={{ fontSize: 10, color: "var(--hint)" }}>Live</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className={`canvas ${canvasMode}`}>
        <div className="c-vig" />
        <div className="stage">
          <RendererDispatch />
        </div>
        <div className="c-hint">
          <div className="ch-dot" />
          Hover · click · interact
        </div>
      </div>

      {/* CLI Window pinned to bottom */}
      <CLIWindow />
    </div>
  );
}
