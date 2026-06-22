"use client";
import { useId, useMemo } from "react";
import type { AsciiProps } from "@/lib/types";

const RAMPS: Record<string, string> = {
  standard: " .,:;+*?%S#@",
  block: " ░▒▓█",
  braille: " ⠂⠆⠖⠶⠷⠿⡿⣿",
  minimal: " .:|=",
};

const ANIMATION_KEYFRAMES: Record<string, string> = {
  fadein: "from { opacity: 0; } to { opacity: 1; }",
  scanline: "from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); }",
  flicker:
    "0%, 100% { opacity: 1; } 8% { opacity: 0.4; } 18% { opacity: 0.9; } 29% { opacity: 0.5; } 41% { opacity: 1; } 53% { opacity: 0.6; } 67% { opacity: 0.95; } 78% { opacity: 0.45; } 89% { opacity: 1; }",
  wave:
    "0%, 100% { transform: translateY(0); } 25% { transform: translateY(-4px); } 50% { transform: translateY(0); } 75% { transform: translateY(4px); }",
  glitch:
    "0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-1px, 1px); } 50% { transform: translate(1px, -1px); } 75% { transform: translate(-1px, 0); }",
};

const ANIMATION_TIMING: Record<string, string> = {
  fadein: "ease-out forwards",
  scanline: "steps(24, end) forwards",
  flicker: "linear infinite",
  wave: "ease-in-out infinite",
  glitch: "steps(6, end) infinite",
};

// Synthesizes a small radial-gradient sample so every character set and
// colour choice is visible without requiring an image upload in the gallery -
// the real upload flow lives at /playground/ascii.
function buildSample(ramp: string): string {
  const cols = 28;
  const rows = 14;
  const lines: string[] = [];
  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < cols; col++) {
      const dx = (col - cols / 2) / (cols / 2);
      const dy = (row - rows / 2) / (rows / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const brightness = Math.max(0, 1 - dist) * 255;
      const index = Math.min(ramp.length - 1, Math.floor((brightness / 255) * ramp.length));
      line += ramp[index];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

export default function AsciiRenderer({ props: p }: { props: AsciiProps }) {
  const uid = useId();
  const color = p.color ?? "#EF9F27";
  const animation = p.animation ?? "fadein";
  const duration = p.duration ?? 1200;
  const ramp = RAMPS[p.characterSet ?? "standard"] ?? RAMPS.standard;

  const sample = useMemo(() => buildSample(ramp), [ramp]);
  const keyframeName = `ascii-${uid.replace(/:/g, "")}`;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {animation !== "none" && (
        <style>{`
          @keyframes ${keyframeName} { ${ANIMATION_KEYFRAMES[animation] ?? ""} }
        `}</style>
      )}
      <pre
        style={{
          margin: 0,
          color,
          fontFamily: "'DM Mono', ui-monospace, monospace",
          fontSize: 7,
          lineHeight: 1.1,
          whiteSpace: "pre",
          animation:
            animation !== "none"
              ? `${keyframeName} ${duration}ms ${ANIMATION_TIMING[animation] ?? "ease-out forwards"}`
              : undefined,
        }}
      >
        {sample}
      </pre>
    </div>
  );
}
