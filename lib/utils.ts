const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export function isValidHex(h: string): boolean {
  return HEX_REGEX.test(h);
}

export function hexRgb(h: string): string {
  if (!isValidHex(h)) {
    throw new Error(`hexRgb: invalid hex color "${h}"`);
  }

  const hex =
    h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r},${g},${b}`;
}

export function lighten(h: string, a = 60): string {
  if (!isValidHex(h)) {
    throw new Error(`lighten: invalid hex color "${h}"`);
  }

  const [r, g, b] = hexRgb(h).split(",").map(Number);

  return `rgba(${Math.min(255, r + a)},${Math.min(255, g + a)},${Math.min(255, b + a)},.9)`;
}

export function contrast(h: string): string {
  if (!isValidHex(h)) {
    throw new Error(`contrast: invalid hex color "${h}"`);
  }

  const [r, g, b] = hexRgb(h).split(",").map(Number);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#0a0a0b" : "#f0ede8";
}

export const COLORS = [
  { hex: "#7F77DD", name: "Purple" },
  { hex: "#378ADD", name: "Blue" },
  { hex: "#e24b4a", name: "Red" },
  { hex: "#EF9F27", name: "Amber" },
  { hex: "#1D9E75", name: "Teal" },
  { hex: "#D4537E", name: "Pink" },
  { hex: "#f5e642", name: "Yellow" },
  { hex: "#f0ede8", name: "White" },
  { hex: "#888780", name: "Gray" },
  { hex: "#4CAF50", name: "Green" },
];
