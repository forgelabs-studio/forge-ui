// All shared types for the CLI package
// shared until monorepo is in place

export type ComponentId = string;

export interface ForgeConfig {
  version: string;
  output: string;
  components: Record<ComponentId, Record<string, unknown>>;
}

export interface ComponentMeta {
  id: string;
  displayName: string;
  group: string;
  description: string;
  defaultColor: string;
  deps?: string[];
}

export interface CLIFlag {
  key: string;
  value: string | null;
  isColor: boolean;
}
