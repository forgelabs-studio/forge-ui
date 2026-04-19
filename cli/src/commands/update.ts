import pc from "picocolors";
import { readConfig, writeConfig } from "../config.js";
import { REGISTRY_BY_ID } from "../registry.js";
import { generateComponent } from "../generate.js";

export async function runUpdate(componentId: string): Promise<void> {
  console.log(pc.bold(`\n  forge-ui update ${componentId}\n`));

  try {
    const config = await readConfig();

    if (!config) {
      console.log(
        pc.red("  No forge.config.json found. Run npx forge-ui init first.\n"),
      );
      process.exit(1);
    }

    const savedProps = config.components[componentId];
    if (!savedProps) {
      console.log(pc.red(`  "${componentId}" is not in forge.config.json.`));
      console.log(
        pc.dim("  Run npx forge-ui add " + componentId + " first.\n"),
      );
      process.exit(1);
    }

    const meta = REGISTRY_BY_ID[componentId];
    if (!meta) {
      console.log(pc.red(`  Unknown component: "${componentId}"\n`));
      process.exit(1);
    }

    await generateComponent(componentId, meta.displayName, savedProps, config);
    await writeConfig(config);

    console.log(pc.dim("\n  Regenerated with original configuration.\n"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(
      pc.red(`\n  ✖ Failed to update ${componentId}: ${message}\n`),
    );
    process.exit(1);
  }
}
