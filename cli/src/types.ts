import type { ComponentId } from "@forgelabs-studio/shared";

export interface ForgeConfig {
  version: string;
  output: string;
  components: Partial<Record<ComponentId, Record<string, unknown>>>;
}

export interface CLIFlag {
  key: string;
  value: string | null;
  isColor: boolean;
}
