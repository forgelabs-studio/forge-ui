import { describe, it, expect } from "vitest";
import { buildCLIFlags, buildCLIString } from "../lib/cli-builder";

describe("buildCLIString", () => {
  it("omits flags that match defaults", () => {
    const result = buildCLIString("button", { color: "#7F77DD" });
    expect(result).toBe("npx @forgelabs-studio/ui add button");
  });
});

describe("buildCLIString", () => {
  it("produces correct flag in the output", () => {
    const result = buildCLIString("button", { color: "#378ADD" });
    expect(result).toBe(
      "npx @forgelabs-studio/ui add button --color='#378ADD'",
    );
  });
});

describe("buildCLIString", () => {
  it("escapes single quotes correctly", () => {
    const result = buildCLIString("button", { variant: "it's special" });
    expect(result).toBe(
      "npx @forgelabs-studio/ui add button --variant='it'\\''s special'",
    );
  });
});

describe("buildCLIFlags", () => {
  it("a true boolean prop produces a flag with null and iscolor true ", () => {
    const result = buildCLIFlags("button", { uppercase: true });
    // result is a CLIFlag[] — check what's in it
    expect(result[0]).toEqual({
      key: "--uppercase",
      value: null,
      isColor: false,
    });
  });
});

describe("buildCLIFlags", () => {
  it("omits a false boolean prop when the default is already false", () => {
    const result = buildCLIFlags("button", { uppercase: false });
    expect(result).toEqual([]); // no flags at all
  });
});

describe("buildCLIFlags", () => {
  it("marks isColor true when a non-default color is provided", () => {
    const result = buildCLIFlags("button", { color: "#123456" });

    expect(result[0]).toEqual({
      key: "--color",
      value: "#123456",
      isColor: true,
    });
  });
});
