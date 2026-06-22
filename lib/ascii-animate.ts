import type { AnimationId } from "@/lib/ascii"

export interface AnimationCss {
  /** `@keyframes` identifier referenced by `shorthand`. */
  name: string
  /** Full `@keyframes` rule, ready to drop into a `<style>` block. */
  keyframes: string
  /** Value for the CSS `animation` shorthand (name, duration, timing, count). */
  shorthand: string
}

export function buildAnimationCss(
  id: AnimationId,
  durationMs: number,
  colour: string,
): AnimationCss | null {
  switch (id) {
    case "fadein":
      return {
        name: "ascii-fadein",
        keyframes:
          "@keyframes ascii-fadein {\n" +
          "  from { opacity: 0; }\n" +
          "  to { opacity: 1; }\n" +
          "}",
        shorthand: `ascii-fadein ${durationMs}ms ease-out forwards`,
      }

    case "scanline":
      return {
        name: "ascii-scanline",
        keyframes:
          "@keyframes ascii-scanline {\n" +
          "  from { clip-path: inset(0 0 100% 0); }\n" +
          "  to { clip-path: inset(0 0 0 0); }\n" +
          "}",
        shorthand: `ascii-scanline ${durationMs}ms steps(24, end) forwards`,
      }

    case "flicker":
      return {
        name: "ascii-flicker",
        keyframes:
          "@keyframes ascii-flicker {\n" +
          "  0%, 100% { opacity: 1; }\n" +
          "  8% { opacity: 0.4; }\n" +
          "  18% { opacity: 0.9; }\n" +
          "  29% { opacity: 0.5; }\n" +
          "  41% { opacity: 1; }\n" +
          "  53% { opacity: 0.6; }\n" +
          "  67% { opacity: 0.95; }\n" +
          "  78% { opacity: 0.45; }\n" +
          "  89% { opacity: 1; }\n" +
          "}",
        shorthand: `ascii-flicker ${durationMs}ms linear infinite`,
      }

    case "wave":
      return {
        name: "ascii-wave",
        keyframes:
          "@keyframes ascii-wave {\n" +
          "  0%, 100% { transform: translateY(0); }\n" +
          "  25% { transform: translateY(-6px); }\n" +
          "  50% { transform: translateY(0); }\n" +
          "  75% { transform: translateY(6px); }\n" +
          "}",
        shorthand: `ascii-wave ${durationMs}ms ease-in-out infinite`,
      }

    case "glitch":
      return {
        name: "ascii-glitch",
        keyframes:
          "@keyframes ascii-glitch {\n" +
          "  0%, 100% { transform: translate(0, 0); text-shadow: none; }\n" +
          `  20% { transform: translate(-2px, 1px); text-shadow: -2px 0 ${colour}, 2px 0 #e24b4a; }\n` +
          `  40% { transform: translate(2px, -1px); text-shadow: 2px 0 #378ADD, -2px 0 ${colour}; }\n` +
          `  60% { transform: translate(-1px, 0); text-shadow: -1px 0 ${colour}, 1px 0 #e24b4a; }\n` +
          "  80% { transform: translate(1px, 0); text-shadow: none; }\n" +
          "}",
        shorthand: `ascii-glitch ${durationMs}ms steps(6, end) infinite`,
      }

    default:
      return null
  }
}
