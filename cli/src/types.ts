import type { ComponentId } from "@forgelabs-studio/shared";

export interface ForgeConfig {
  version: string;
  output: string;
  components: Record<ComponentId, Record<string, unknown>>;
}

export interface CLIFlag {
  key: string;
  value: string | null;
  isColor: boolean;
}
