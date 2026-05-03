import { describe, expect, it } from "vitest";
import {
  buildMotionCLIFlags,
  buildMotionCLIString,
} from "../lib/motion-cli-builder";
import { parseMotionFlags } from "../packages/cli-motion/src/flags";
import { generateStagger } from "../packages/cli-motion/src/generators/stagger";
import { generateTypewriter } from "../packages/cli-motion/src/generators/typewriter";
import { MOTION_PRESETS } from "../lib/motion";
import { REGISTRY as MOTION_CLI_REGISTRY } from "../packages/cli-motion/src/registry";

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

  it("preserves equals signs inside inline text values", () => {
    expect(parseMotionFlags(["--text=Progress = craft"])).toEqual({
      text: "Progress = craft",
    });
  });

  it("rejects invalid easing values", () => {
    expect(() => parseMotionFlags(["--ease=wiggly"])).toThrow(
      "Invalid easing value: wiggly",
    );
  });
});

describe("motion generators", () => {
  it("uses text flags as the generated Typewriter default", () => {
    const output = generateTypewriter({
      text: "Talia's Forge = craft",
      speed: 55,
      once: false,
    });

    expect(output).toContain(`text = "Talia's Forge = craft"`);
    expect(output).toContain("speed = 55");
    expect(output).toContain("once = false");
  });

  it("imports React when generated Stagger uses React.Children", () => {
    const output = generateStagger({});

    expect(output).toContain("import React, { useRef } from 'react'");
    expect(output).toContain("React.Children.toArray(children)");
  });
});

describe("motion registry consistency", () => {
  it("keeps playground and CLI preset ids/display names aligned", () => {
    const playground = MOTION_PRESETS.map(({ id, displayName }) => ({
      id,
      displayName,
    }));
    const cli = MOTION_CLI_REGISTRY.map(({ id, displayName }) => ({
      id,
      displayName,
    }));

    expect(cli).toEqual(playground);
  });
});
