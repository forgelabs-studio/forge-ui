import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import { readConfig, writeConfig } from "../config.js";
import { REGISTRY_BY_ID } from "@forgelabs-studio/shared";

export async function runRemove(componentId: string): Promise<void> {
  console.log(pc.bold(`\n  forge-ui remove ${componentId}\n`));

  try {
    const config = await readConfig();

    if (!config) {
      console.log(pc.red("  No forge.config.json found.\n"));
      process.exit(1);
    }

    const meta = REGISTRY_BY_ID[componentId];
    if (!meta) {
      console.log(pc.red(`  Unknown component: "${componentId}"\n`));
      process.exit(1);
    }

    const outputDir = path.join(process.cwd(), config.output);
    const tsxPath = path.join(outputDir, `${meta.displayName}.tsx`);
    const cssPath = path.join(outputDir, `${meta.displayName}.css`);

    if (await fs.pathExists(tsxPath)) {
      await fs.remove(tsxPath);
      console.log(pc.red("  ✕") + ` ${meta.displayName}.tsx`);
    }

    if (await fs.pathExists(cssPath)) {
      await fs.remove(cssPath);
      console.log(pc.red("  ✕") + ` ${meta.displayName}.css`);
    }

    delete config.components[componentId];
    await writeConfig(config);

    console.log(pc.dim("\n  Removed from forge.config.json.\n"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(
      pc.red(`\n  ✖ Failed to remove ${componentId}: ${message}\n`),
    );
    process.exit(1);
  }
}
