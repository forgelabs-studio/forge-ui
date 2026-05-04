import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import { readConfig, writeConfig, createDefaultConfig } from "../config.js";
import { REGISTRY, REGISTRY_BY_ID } from "@forgelabs-studio/shared";
import { parseFlags } from "../flags.js";
import { generateComponent } from "../generate.js";
import type { ForgeConfig } from "../types.js";

type AddStatus = "added" | "skipped" | "failed";

interface AddResult {
  status: AddStatus;
  componentId: string;
}

function distanceBetween(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

export function suggestComponentId(input: string): string | null {
  const normalized = input.toLowerCase();
  const ranked = REGISTRY.map((component) => ({
    id: component.id,
    distance: distanceBetween(normalized, component.id),
  })).sort((a, b) => a.distance - b.distance);

  const best = ranked[0];
  if (!best) return null;

  const threshold = Math.max(2, Math.floor(normalized.length * 0.4));
  return best.distance <= threshold ? best.id : null;
}

export function splitAddArgs(rawArgs: string[]): {
  componentIds: string[];
  rawFlags: string[];
} {
  return {
    componentIds: rawArgs.filter((arg) => !arg.startsWith("--")),
    rawFlags: rawArgs.filter((arg) => arg.startsWith("--")),
  };
}

async function componentFilesExist(
  displayName: string,
  config: ForgeConfig,
): Promise<string[]> {
  const outputDir = path.join(process.cwd(), config.output);
  const candidates = [
    path.join(outputDir, `${displayName}.tsx`),
    path.join(outputDir, `${displayName}.css`),
  ];
  const existing: string[] = [];

  for (const filePath of candidates) {
    if (await fs.pathExists(filePath)) {
      existing.push(path.basename(filePath));
    }
  }

  return existing;
}

async function addOneComponent(
  componentId: string,
  rawFlags: string[],
  config: ForgeConfig,
  seen: Set<string>,
): Promise<AddResult> {
  if (seen.has(componentId)) {
    console.log(pc.yellow(`  Skipping duplicate request: "${componentId}"`));
    return { status: "skipped", componentId };
  }
  seen.add(componentId);

  const meta = REGISTRY_BY_ID[componentId];
  if (!meta) {
    console.log(pc.red(`  Unknown component: "${componentId}"`));
    const suggestion = suggestComponentId(componentId);
    if (suggestion) {
      console.log(pc.dim(`  Did you mean "${suggestion}"?`));
    }
    console.log(
      pc.dim("  Run npx @forgelabs-studio/ui list to see available components.\n"),
    );
    return { status: "failed", componentId };
  }

  if (config.components[componentId]) {
    console.log(pc.yellow(`  Skipping ${meta.displayName}: already in forge.config.json`));
    return { status: "skipped", componentId };
  }

  const existingFiles = await componentFilesExist(meta.displayName, config);
  if (existingFiles.length > 0) {
    console.log(
      pc.yellow(`  Skipping ${meta.displayName}: ${existingFiles.join(", ")} already exists`),
    );
    return { status: "skipped", componentId };
  }

  const flagProps = parseFlags(rawFlags);
  const props = { color: meta.defaultColor, ...flagProps };

  try {
    await generateComponent(componentId, meta.displayName, props, config);
    config.components[componentId] = props;

    if (meta.deps?.length) {
      console.log(pc.yellow(`\n  Peer deps required for ${meta.displayName}: ${meta.deps.join(", ")}`));
    }

    console.log(pc.dim(`\n  Import ${meta.displayName} with:`));
    console.log(
      pc.cyan(
        `  import { ${meta.displayName} } from '@/components/forge/${meta.displayName}'\n`,
      ),
    );

    return { status: "added", componentId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(pc.red(`\n  ✖ Failed to add ${componentId}: ${message}\n`));
    return { status: "failed", componentId };
  }
}

export async function runAdd(
  componentIds: string[],
  rawFlags: string[],
): Promise<void> {
  console.log(pc.bold(`\n  forge-ui add ${componentIds.join(" ")}\n`));

  if (componentIds.length === 0) {
    console.log(pc.red("  No components requested."));
    console.log(pc.dim("  Usage: npx @forgelabs-studio/ui add button morphblob\n"));
    process.exit(1);
  }

  try {
    let config = await readConfig();
    if (!config) {
      config = createDefaultConfig();
      console.log(pc.dim("  No forge.config.json found — creating one.\n"));
    }

    const seen = new Set<string>();
    const results: AddResult[] = [];
    for (const componentId of componentIds) {
      results.push(await addOneComponent(componentId, rawFlags, config, seen));
    }

    await writeConfig(config);

    const added = results.filter((result) => result.status === "added").length;
    const skipped = results.filter((result) => result.status === "skipped").length;
    const failed = results.filter((result) => result.status === "failed").length;

    console.log(pc.dim(`  Summary: ${added} added, ${skipped} skipped, ${failed} failed.\n`));

    if (failed > 0) process.exit(1);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(pc.red(`\n  ✖ Failed to add components: ${message}\n`));
    process.exit(1);
  }
}
