import { describe, expect, it } from "vitest";
import {
  buildMotionCLIFlags,
  buildMotionCLIString,
} from "../lib/motion-cli-builder";
import { parseMotionFlags } from "../packages/cli-motion/src/flags";

describe("motion CLI builder", () => {
  it("omits default values", () => {
    expect(
      buildMotionCLIString("fade-up", {
        duration: 0.6,
        delay: 0,
        distance: 32,
        ease: "easeOut",
        once: true,
      }),
    ).toBe("npx @forgelabs-studio/motion add fade-up");
  });

  it("includes changed values as shell-quoted flags", () => {
    expect(
      buildMotionCLIString("typewriter", {
        text: "Talia's Forge",
        speed: 55,
        once: true,
      }),
    ).toBe(
      "npx @forgelabs-studio/motion add typewriter --speed='55' --text='Talia'\\''s Forge'",
    );
  });

  it("emits false boolean flags explicitly", () => {
    expect(
      buildMotionCLIFlags("fade-in", {
        duration: 0.6,
        delay: 0,
        ease: "easeOut",
        once: false,
      }),
    ).toEqual([{ key: "--once", value: "false" }]);
  });
});

describe("motion CLI flag parser", () => {
  it("parses inline, spaced, numeric, and boolean flags", () => {
    expect(
      parseMotionFlags([
        "--duration=0.8",
        "--distance",
        "64",
        "--ease",
        "easeInOut",
        "--once=false",
      ]),
    ).toEqual({
      duration: 0.8,
      distance: 64,
      ease: "easeInOut",
      once: false,
    });
  });
});
