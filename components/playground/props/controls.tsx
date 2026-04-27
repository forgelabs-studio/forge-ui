"use client";

import type { ComponentProps } from "@/lib/types";

const COLORS = [
  "#7F77DD",
  "#1D9E75",
  "#EF9F27",
  "#378ADD",
  "#D4537E",
  "#e24b4a",
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#f97316",
];
const ICONS = ["none", "→", "↗", "↑", "★", "⚡", "♥", "◆", "●", "✦"];

// ─── Atom controls ──────────────────────────────────────────────────────────

export function Grp({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pg">
      <div className="pgt">{title}</div>
      {children}
    </div>
  );
}

export function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pr">
      {label && <div className="pl">{label}</div>}
      {children}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: ComponentProps[string];
  onChange: (v: string) => void;
}) {
  return (
    <input
      className="pi"
      value={value as string | number | readonly string[] | undefined}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function Textarea({
  value,
  onChange,
}: {
  value: ComponentProps[string];
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      className="pi"
      title="Text content"
      value={value as string | number | readonly string[] | undefined}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="ppg">
      <button
        type="button"
        className={`pp${!value ? " active" : ""}`}
        onClick={() => onChange(false)}
      >
        Off
      </button>
      <button
        type="button"
        className={`pp${value ? " active" : ""}`}
        onClick={() => onChange(true)}
      >
        On
      </button>
    </div>
  );
}

export function Pills({
  value,
  opts,
  onChange,
}: {
  value: ComponentProps[string];
  opts: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="ppg">
      {opts.map((o) => (
        <button
          type="button"
          key={o}
          className={`pp${value === o ? " active" : ""}`}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function OptsGrid({
  value,
  opts,
  onChange,
  cols = 2,
}: {
  value: ComponentProps[string];
  opts: string[];
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className={cols === 3 ? "og3" : "og"}>
      {opts.map((o) => (
        <div
          key={o}
          className={`oo${value === o ? " active" : ""}`}
          onClick={() => onChange(o)}
        >
          {o}
        </div>
      ))}
    </div>
  );
}

export function Swatches({
  value,
  onChange,
}: {
  value: ComponentProps[string];
  onChange: (v: string) => void;
}) {
  const sv = (value as string) ?? "";
  return (
    <div>
      <div className="swatches">
        {COLORS.map((c) => (
          <div
            key={c}
            className={`sw${value === c ? " active" : ""}`}
            style={{ background: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
      <div className="hrow">
        <input
          className="hi"
          title="Hex colour"
          value={sv}
          onChange={(e) => onChange(e.target.value)}
          maxLength={7}
        />
        <input
          type="color"
          title="Colour picker"
          value={sv}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function Range({
  value,
  min,
  max,
  unit = "",
  step = 1,
  onChange,
}: {
  value: ComponentProps[string];
  min: number;
  max: number;
  unit?: string;
  step?: number;
  onChange: (v: number) => void;
}) {
  const nv = (value as number) ?? 0;
  return (
    <div className="rr">
      <input
        type="range"
        title="Value"
        className="ri"
        value={nv}
        min={min}
        max={max}
        step={step}
        onChange={(e) =>
          onChange(unit ? parseInt(e.target.value) : parseFloat(e.target.value))
        }
      />
      <span className="rn">
        {nv}
        {unit}
      </span>
    </div>
  );
}

export function IconGrid({
  value,
  onChange,
}: {
  value: ComponentProps[string];
  onChange: (v: string) => void;
}) {
  return (
    <div className="ig">
      {ICONS.map((ic) => (
        <div
          key={ic}
          className={`io${value === ic ? " active" : ""}`}
          onClick={() => onChange(ic)}
        >
          {ic === "none" ? "×" : ic}
        </div>
      ))}
    </div>
  );
}

export function AddRemoveList({
  items,
  placeholder,
  onChange,
}: {
  items: string[];
  placeholder: string;
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="arl">
      {items.map((item, i) => (
        <div key={i} className="arl-row">
          <input
            className="pi"
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const n = [...items];
              n[i] = e.target.value;
              onChange(n);
            }}
          />
          <button
            type="button"
            className="arl-rm"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            −
          </button>
        </div>
      ))}
      <button
        type="button"
        className="arl-add"
        onClick={() => onChange([...items, ""])}
      >
        ＋ Add
      </button>
    </div>
  );
}
export function arr(
  p: ComponentProps,
  key: string,
  fallback: string[] = [],
): string[] {
  return Array.isArray(p[key])
    ? (p[key] as string[])
    : typeof p[key] === "string" && p[key]
      ? (p[key] as string)
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : fallback;
}
