import { describe, it, expect } from "vitest";
import { REGISTRY } from "../lib/registry";

describe("REGISTRY", () => {
  it("has no duplicate component IDs", () => {
    const ids = REGISTRY.map((c) => c.id);
    const unique = new Set(ids);

    expect(unique.size).toBe(ids.length);
  });

  it("all entries have a valid hex defaultColor", () => {
    for (const entry of REGISTRY) {
      const color = entry.defaultColor;

      const isValid =
        typeof color === "string" &&
        color.startsWith("#") &&
        (color.length === 4 || color.length === 7);

      expect(isValid, `${entry.id} has invalid defaultColor: ${color}`).toBe(
        true,
      );
    }
  });
});
