export interface CLIFlag {
  key: string;
  value: string | null;
  isColor: boolean;
}

// Default values — flags that match these are omitted from the command
const DEFAULTS: Record<string, Record<string, unknown>> = {
  button: {
    color: "#7F77DD",
    variant: "glow",
    size: "md",
    radius: 8,
    hoverEffect: "lift",
    shadow: "glow",
    clickAnim: "ripple",
    speed: "normal",
    uppercase: false,
    fullWidth: false,
  },
  card: { color: "#7F77DD", radius: 12, padding: 24 },
  input: { color: "#7F77DD", size: "md", radius: 8 },
  badge: { color: "#1D9E75", variant: "pill", size: "md" },
  toggle: { color: "#7F77DD", size: "md" },
  select: { color: "#7F77DD", size: "md", radius: 8 },
  checkbox: { color: "#7F77DD", variant: "square", size: "md" },
  radio: { color: "#7F77DD", size: "md" },
  slider: { color: "#7F77DD", size: "md" },
  textarea: { color: "#7F77DD", radius: 8 },
  avatar: { color: "#7F77DD", shape: "circle", size: "md" },
  statcard: { color: "#7F77DD" },
  taginput: { color: "#7F77DD", variant: "soft" },
  datepicker: { color: "#7F77DD", radius: 8 },
  spinner: { color: "#7F77DD", variant: "ring", size: "md", speed: "normal" },
  fadeup: { color: "#7F77DD", duration: 600 },
  ticker: { color: "#7F77DD", speed: "normal" },
  morphblob: { color: "#7F77DD", speed: "normal" },
  countup: { color: "#7F77DD", duration: 2000, size: "xl" },
  barchart: { color: "#7F77DD" },
  linechart: { color: "#1D9E75" },
  donut: { color: "#7F77DD" },
  progress: { color: "#7F77DD", height: 6, radius: 4 },
  sparkline: { color: "#7F77DD" },
  cmdpalette: { color: "#7F77DD" },
  navbar: { color: "#7F77DD", variant: "dark" },
  breadcrumb: { color: "#7F77DD" },
  pagination: { color: "#7F77DD" },
  sidenav: { color: "#7F77DD" },
  tabs: { color: "#7F77DD", variant: "underline" },
  modal: { color: "#7F77DD", radius: 12 },
  toast: { variant: "success" },
  tooltip: { color: "#7F77DD", variant: "dark" },
  dropdown: { color: "#7F77DD", radius: 8 },
  drawer: { color: "#7F77DD", side: "right" },
  skeleton: { variant: "card", radius: 8 },
  alert: { variant: "success" },
  stepper: { color: "#7F77DD", variant: "horizontal" },
  accordion: { color: "#7F77DD", radius: 8 },
  table: { color: "#7F77DD" },
};

// Which prop key maps to which CLI flag
const PROP_TO_FLAG: Record<string, string> = {
  color: "--color",
  variant: "--variant",
  size: "--size",
  radius: "--radius",
  hoverEffect: "--hover",
  shadow: "--shadow",
  clickAnim: "--animation",
  speed: "--speed",
  uppercase: "--uppercase",
  fullWidth: "--full-width",
  duration: "--duration",
  height: "--height",
  shape: "--shape",
  side: "--side",
  padding: "--padding",
};

export function buildCLIFlags(
  componentId: string,
  props: Record<string, unknown>,
): CLIFlag[] {
  const defaults = DEFAULTS[componentId] ?? {};
  const flags: CLIFlag[] = [];

  for (const [prop, flagKey] of Object.entries(PROP_TO_FLAG)) {
    const val = props[prop];
    const def = defaults[prop];
    if (val === undefined || val === def) continue;

    if (typeof val === "boolean") {
      if (val) flags.push({ key: flagKey, value: null, isColor: false });
      continue;
    }

    flags.push({
      key: flagKey,
      value: String(val),
      isColor: prop === "color",
    });
  }

  return flags;
}

export function buildCLIString(
  componentId: string,
  props: Record<string, unknown>,
): string {
  const flags = buildCLIFlags(componentId, props);
  const parts = [`npx @forgelabs-studio/ui add ${componentId}`];
  for (const { key, value } of flags) {
    if (value === null) parts.push(key);
    else {
      const safe = value.toString().replace(/'/g, "'\\''");
      parts.push(`${key}='${safe}'`);
    }
  }
  return parts.join(" ");
}
