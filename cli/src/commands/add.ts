import pc from "picocolors";
import { readConfig, writeConfig, createDefaultConfig } from "../config.js";
import { REGISTRY_BY_ID } from "../registry.js";
import { parseFlags } from "../flags.js";
import { generateComponent } from "../generate.js";

export async function runAdd(
  componentId: string,
  rawFlags: string[],
): Promise<void> {
  console.log(pc.bold(`\n  forge-ui add ${componentId}\n`));

  // This cannot throw — keep it outside the try
  const meta = REGISTRY_BY_ID[componentId];
  if (!meta) {
    console.log(pc.red(`  Unknown component: "${componentId}"`));
    console.log(
      pc.dim("  Run npx forge-ui list to see available components.\n"),
    );
    process.exit(1);
  }

  try {
    // Load or create config
    let config = await readConfig();
    if (!config) {
      config = createDefaultConfig();
      console.log(pc.dim("  No forge.config.json found — creating one.\n"));
    }

    // Parse flags into props, merging with defaults
    const flagProps = parseFlags(rawFlags);
    const props = { color: meta.defaultColor, ...flagProps };

    // Generate the component files
    await generateComponent(componentId, meta.displayName, props, config);

    // Save props to config so `update` can regenerate later
    config.components[componentId] = props;
    await writeConfig(config);

    // Warn about peer dependencies if any
    if (meta.deps?.length) {
      console.log(pc.yellow(`\n  Peer deps required: ${meta.deps.join(", ")}`));
    }

    console.log(pc.dim(`\n  Import with:`));
    console.log(
      pc.cyan(
        `  import { ${meta.displayName} } from '@/components/forge/${meta.displayName}'\n`,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error(pc.red(`\n  ✖ Failed to add ${componentId}: ${message}\n`));
    process.exit(1);
  }
}
