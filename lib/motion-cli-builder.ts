import {
  MOTION_PROP_DEFAULTS,
  type MotionPresetId,
  type MotionPresetProps,
} from "./motion";

export interface MotionCLIFlag {
  key: string;
  value: string | null;
}

const PROP_TO_FLAG: Record<string, string> = {
  duration: "--duration",
  delay: "--delay",
  distance: "--distance",
  ease: "--ease",
  once: "--once",
  scale: "--scale",
  stiffness: "--stiffness",
  damping: "--damping",
  staggerDelay: "--stagger-delay",
  speed: "--speed",
  from: "--from",
  to: "--to",
  text: "--text",
};

function quote(value: string): string {
  return `'${value.replace(/'/g, "'\\''")}'`;
}

export function buildMotionCLIFlags(
  presetId: MotionPresetId,
  props: MotionPresetProps,
): MotionCLIFlag[] {
  const defaults = MOTION_PROP_DEFAULTS[presetId];
  const flags: MotionCLIFlag[] = [];

  for (const [prop, flagKey] of Object.entries(PROP_TO_FLAG)) {
    const value = props[prop];
    const defaultValue = defaults[prop];
    if (value === undefined || value === defaultValue) continue;

    if (typeof value === "boolean") {
      if (value) flags.push({ key: flagKey, value: null });
      else flags.push({ key: flagKey, value: "false" });
      continue;
    }

    flags.push({ key: flagKey, value: String(value) });
  }

  return flags;
}

export function buildMotionCLIString(
  presetId: MotionPresetId,
  props: MotionPresetProps,
): string {
  const parts = [`npx @forgelabs-studio/motion add ${presetId}`];

  for (const { key, value } of buildMotionCLIFlags(presetId, props)) {
    if (value === null) parts.push(key);
    else parts.push(`${key}=${quote(value)}`);
  }

  return parts.join(" ");
}
