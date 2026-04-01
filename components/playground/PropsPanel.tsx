"use client";
import { usePlaygroundStore } from "@/store/playground";
import { PROP_DEFAULTS } from "@/lib/prop-defaults";
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

function Grp({
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

function Row({
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

function TextInput({
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

function Textarea({
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

function Toggle({
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

function Pills({
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

function OptsGrid({
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

function Swatches({
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

function Range({
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

function IconGrid({
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

function AddRemoveList({
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

// ─── PropsPanel ─────────────────────────────────────────────────────────────

export default function PropsPanel() {
  const {
    activeComponent,
    props,
    setProp,
    resetComponent,
    globalFont,
    globalTextColor,
    globalRadius,
    setGlobalFont,
    setGlobalTextColor,
    setGlobalRadius,
  } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);

  // Helper: get array prop (handles legacy comma-strings)
  const arr = (key: string, fallback: string[] = []): string[] =>
    Array.isArray(p[key])
      ? (p[key] as string[])
      : typeof p[key] === "string" && p[key]
        ? (p[key] as string)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : fallback;

  const builders: Record<string, () => React.ReactNode> = {
    button: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.text ?? ""} onChange={(v) => sp("text", v)} />
          </Row>
          <Row label="Icon">
            <IconGrid
              value={p.icon ?? "none"}
              onChange={(v) => sp("icon", v)}
            />
          </Row>
          {p.icon !== "none" && (
            <Row label="Icon side">
              <Pills
                value={p.iconPos}
                opts={["left", "right"]}
                onChange={(v) => sp("iconPos", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["glow", "solid", "ghost", "outline", "soft", "spectrum"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="Size preset">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg", "xl"]}
              onChange={(v) => {
                const presets: Record<
                  string,
                  { paddingY: number; paddingX: number; textSize: number }
                > = {
                  sm: { paddingY: 6, paddingX: 14, textSize: 11 },
                  md: { paddingY: 10, paddingX: 20, textSize: 13 },
                  lg: { paddingY: 14, paddingX: 28, textSize: 15 },
                  xl: { paddingY: 18, paddingX: 36, textSize: 17 },
                };
                const preset = presets[v];
                sp("size", v);
                sp("paddingY", preset.paddingY);
                sp("paddingX", preset.paddingX);
                sp("textSize", preset.textSize);
              }}
            />
          </Row>
          <Row label="Font size">
            <Range
              value={p.textSize}
              min={10}
              max={22}
              unit="px"
              onChange={(v) => sp("textSize", v)}
            />
          </Row>
          <Row label="Font weight">
            <Pills
              value={p.weight}
              opts={["300", "400", "500"]}
              onChange={(v) => sp("weight", v)}
            />
          </Row>
          <Row label="Border radius">
            <Range
              value={p.radius}
              min={0}
              max={50}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Padding X">
            <Range
              value={p.paddingX}
              min={8}
              max={60}
              unit="px"
              onChange={(v) => sp("paddingX", v)}
            />
          </Row>
          <Row label="Padding Y">
            <Range
              value={p.paddingY}
              min={4}
              max={32}
              unit="px"
              onChange={(v) => sp("paddingY", v)}
            />
          </Row>
        </Grp>
        <Grp title="Typography">
          <Row label="Letter spacing">
            <select
              className="pi"
              title="Letter spacing"
              value={p.letterSpacing as string | undefined}
              onChange={(e) => sp("letterSpacing", e.target.value)}
            >
              {[
                ["Tight", "-.03em"],
                ["Default", "-.01em"],
                ["Normal", "0em"],
                ["Wide", ".05em"],
                ["Wider", ".1em"],
              ].map(([l, v]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Uppercase">
            <Toggle
              value={!!p.uppercase}
              onChange={(v) => sp("uppercase", v)}
            />
          </Row>
        </Grp>
        <Grp title="Interaction">
          <Row label="Hover effect">
            <OptsGrid
              value={p.hoverEffect}
              opts={["lift", "scale", "glow", "none"]}
              onChange={(v) => sp("hoverEffect", v)}
            />
          </Row>
          <Row label="Click animation">
            <OptsGrid
              value={p.clickAnim}
              opts={["ripple", "scale", "bounce", "none"]}
              onChange={(v) => sp("clickAnim", v)}
            />
          </Row>
          <Row label="Shadow">
            <OptsGrid
              value={p.shadow}
              opts={["glow", "soft", "hard", "none"]}
              onChange={(v) => sp("shadow", v)}
            />
          </Row>
        </Grp>
        <Grp title="States">
          <Row label="Full width">
            <Toggle
              value={!!p.fullWidth}
              onChange={(v) => sp("fullWidth", v)}
            />
          </Row>
          <Row label="Disabled">
            <Toggle value={!!p.disabled} onChange={(v) => sp("disabled", v)} />
          </Row>
        </Grp>
      </>
    ),

    card: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Subtitle">
            <TextInput
              value={p.subtitle ?? ""}
              onChange={(v) => sp("subtitle", v)}
            />
          </Row>
          <Row label="Tag">
            <TextInput value={p.tag ?? ""} onChange={(v) => sp("tag", v)} />
          </Row>
          <Row label="Show tag">
            <Toggle value={!!p.showTag} onChange={(v) => sp("showTag", v)} />
          </Row>
          <Row label="Show badge">
            <Toggle
              value={!!p.showBadge}
              onChange={(v) => sp("showBadge", v)}
            />
          </Row>
          {p.showBadge && (
            <Row label="Badge text">
              <TextInput
                value={p.badge ?? ""}
                onChange={(v) => sp("badge", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Glow colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="Width">
            <Range
              value={p.width}
              min={180}
              max={480}
              unit="px"
              onChange={(v) => sp("width", v)}
            />
          </Row>
          <Row label="Border radius">
            <Range
              value={p.radius}
              min={0}
              max={32}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Padding">
            <Range
              value={p.padding}
              min={12}
              max={48}
              unit="px"
              onChange={(v) => sp("padding", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    input: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Placeholder">
            <TextInput
              value={p.placeholder ?? ""}
              onChange={(v) => sp("placeholder", v)}
            />
          </Row>
          <Row label="Hint text">
            <TextInput value={p.hint ?? ""} onChange={(v) => sp("hint", v)} />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          <Row label="Show hint">
            <Toggle value={!!p.showHint} onChange={(v) => sp("showHint", v)} />
          </Row>
        </Grp>
        <Grp title="State">
          <Row label="">
            <OptsGrid
              value={p.state}
              opts={["default", "error", "success", "disabled"]}
              onChange={(v) => sp("state", v)}
            />
          </Row>
        </Grp>
        <Grp title="Type">
          <Row label="">
            <OptsGrid
              value={p.type}
              opts={["text", "email", "password", "number", "search"]}
              onChange={(v) => sp("type", v)}
            />
          </Row>
        </Grp>
        <Grp title="Focus colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    badge: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.text ?? ""} onChange={(v) => sp("text", v)} />
          </Row>
          <Row label="Uppercase">
            <Toggle
              value={!!p.uppercase}
              onChange={(v) => sp("uppercase", v)}
            />
          </Row>
          <Row label="Show dot">
            <Toggle value={!!p.showDot} onChange={(v) => sp("showDot", v)} />
          </Row>
          {p.showDot && (
            <Row label="Pulse">
              <Toggle
                value={!!p.dotPulse}
                onChange={(v) => sp("dotPulse", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["pill", "tag", "square"]}
              onChange={(v) => sp("variant", v)}
              cols={3}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    toggle: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          {p.showLabel && (
            <Row label="Label position">
              <Pills
                value={p.labelPos}
                opts={["left", "right"]}
                onChange={(v) => sp("labelPos", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Default state">
          <Row label="Checked">
            <Toggle value={!!p.checked} onChange={(v) => sp("checked", v)} />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    select: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Placeholder">
            <TextInput
              value={p.placeholder ?? ""}
              onChange={(v) => sp("placeholder", v)}
            />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
        </Grp>
        <Grp title="Options">
          <AddRemoveList
            items={arr("options")}
            placeholder="Option…"
            onChange={(v) => sp("options", v)}
          />
        </Grp>
        <Grp title="Focus colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Hover colour">
          <Row label="">
            <Swatches
              value={p.hoverColor ?? p.color}
              onChange={(v) => sp("hoverColor", v)}
            />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    checkbox: () => (
      <>
        <Grp title="Items">
          <AddRemoveList
            items={arr("items", ["I agree to the terms"])}
            placeholder="Checkbox label…"
            onChange={(v) => sp("items", v)}
          />
        </Grp>
        <Grp title="Shape">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["square", "round", "squircle"]}
              onChange={(v) => sp("variant", v)}
              cols={3}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    radio: () => (
      <>
        <Grp title="Options">
          <AddRemoveList
            items={arr("options", ["Option 1"])}
            placeholder="Option…"
            onChange={(v) => sp("options", v)}
          />
        </Grp>
        <Grp title="Layout">
          <Row label="">
            <Pills
              value={p.layout}
              opts={["vertical", "horizontal"]}
              onChange={(v) => sp("layout", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    slider: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Unit prefix">
            <TextInput value={p.unit ?? ""} onChange={(v) => sp("unit", v)} />
          </Row>
          <Row label="Show value">
            <Toggle
              value={!!p.showValue}
              onChange={(v) => sp("showValue", v)}
            />
          </Row>
        </Grp>
        <Grp title="Range">
          <Row label="Min">
            <Range
              value={p.min}
              min={0}
              max={9000}
              unit=""
              step={500}
              onChange={(v) => sp("min", v)}
            />
          </Row>
          <Row label="Max">
            <Range
              value={p.max}
              min={1000}
              max={100000}
              unit=""
              step={500}
              onChange={(v) => sp("max", v)}
            />
          </Row>
          <Row label="Step">
            <Range
              value={p.step}
              min={1}
              max={1000}
              unit=""
              step={1}
              onChange={(v) => sp("step", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    textarea: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Placeholder">
            <TextInput
              value={p.placeholder ?? ""}
              onChange={(v) => sp("placeholder", v)}
            />
          </Row>
          <Row label="Hint">
            <TextInput value={p.hint ?? ""} onChange={(v) => sp("hint", v)} />
          </Row>
          <Row label="Rows">
            <Range
              value={p.rows}
              min={2}
              max={10}
              unit=""
              onChange={(v) => sp("rows", v)}
            />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          <Row label="Show hint">
            <Toggle value={!!p.showHint} onChange={(v) => sp("showHint", v)} />
          </Row>
          <Row label="Show count">
            <Toggle
              value={!!p.showCount}
              onChange={(v) => sp("showCount", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    avatar: () => (
      <>
        <Grp title="Content">
          <Row label="Initials">
            <TextInput
              value={p.initials ?? ""}
              onChange={(v) => sp("initials", v)}
              maxLength={3}
            />
          </Row>
          <Row label="Show status dot">
            <Toggle
              value={!!p.showStatus}
              onChange={(v) => sp("showStatus", v)}
            />
          </Row>
          {p.showStatus && (
            <Row label="Status">
              <OptsGrid
                value={p.status}
                opts={["online", "away", "busy", "offline"]}
                onChange={(v) => sp("status", v)}
              />
            </Row>
          )}
          <Row label="Show ring">
            <Toggle value={!!p.showRing} onChange={(v) => sp("showRing", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="">
            <OptsGrid
              value={p.shape}
              opts={["circle", "squircle", "square"]}
              onChange={(v) => sp("shape", v)}
              cols={3}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["xs", "sm", "md", "lg", "xl"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    statcard: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Value">
            <TextInput value={p.value ?? ""} onChange={(v) => sp("value", v)} />
          </Row>
          <Row label="Delta">
            <TextInput value={p.delta ?? ""} onChange={(v) => sp("delta", v)} />
          </Row>
          <Row label="Direction">
            <Pills
              value={p.deltaDir}
              opts={["up", "down"]}
              onChange={(v) => sp("deltaDir", v)}
            />
          </Row>
          <Row label="Icon">
            <TextInput value={p.icon ?? ""} onChange={(v) => sp("icon", v)} />
          </Row>
        </Grp>
        <Grp title="Display">
          <Row label="Show icon">
            <Toggle value={!!p.showIcon} onChange={(v) => sp("showIcon", v)} />
          </Row>
          <Row label="Show delta">
            <Toggle
              value={!!p.showDelta}
              onChange={(v) => sp("showDelta", v)}
            />
          </Row>
          <Row label="Show bar">
            <Toggle value={!!p.showBar} onChange={(v) => sp("showBar", v)} />
          </Row>
          {p.showBar && (
            <Row label="Bar value">
              <Range
                value={p.barValue}
                min={0}
                max={100}
                unit="%"
                onChange={(v) => sp("barValue", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    taginput: () => (
      <>
        <Grp title="Tags">
          <AddRemoveList
            items={arr("tags", [])}
            placeholder="Tag…"
            onChange={(v) => sp("tags", v)}
          />
        </Grp>
        <Grp title="Content">
          <Row label="Placeholder">
            <TextInput
              value={p.placeholder ?? ""}
              onChange={(v) => sp("placeholder", v)}
            />
          </Row>
          <Row label="Removable">
            <Toggle
              value={!!p.removable}
              onChange={(v) => sp("removable", v)}
            />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="">
            <Pills
              value={p.variant}
              opts={["soft", "pill", "outline"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    datepicker: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    spinner: () => (
      <>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["ring", "dots", "bars", "orbit", "pulse"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Size">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg", "xl"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
          <Row label="Speed">
            <Pills
              value={p.speed}
              opts={["slow", "normal", "fast"]}
              onChange={(v) => sp("speed", v)}
            />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          {p.showLabel && (
            <Row label="Label">
              <TextInput
                value={p.label ?? ""}
                onChange={(v) => sp("label", v)}
              />
            </Row>
          )}
        </Grp>
      </>
    ),

    fadeup: () => (
      <>
        <Grp title="Content">
          <Row label="Text (each line staggers)">
            <Textarea value={p.text ?? ""} onChange={(v) => sp("text", v)} />
          </Row>
        </Grp>
        <Grp title="Animation">
          <Row label="Duration">
            <Range
              value={p.duration}
              min={200}
              max={1500}
              unit="ms"
              step={50}
              onChange={(v) => sp("duration", v)}
            />
          </Row>
          <Row label="Stagger lines">
            <Toggle value={!!p.stagger} onChange={(v) => sp("stagger", v)} />
          </Row>
        </Grp>
        <Grp title="Accent colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    ticker: () => (
      <>
        <Grp title="Items">
          <AddRemoveList
            items={arr("items", [])}
            placeholder="Ticker item…"
            onChange={(v) => sp("items", v)}
          />
        </Grp>
        <Grp title="Content">
          <Row label="Separator">
            <TextInput
              value={p.separator ?? ""}
              onChange={(v) => sp("separator", v)}
            />
          </Row>
          <Row label="Gap">
            <Range
              value={p.gap}
              min={16}
              max={80}
              unit="px"
              onChange={(v) => sp("gap", v)}
            />
          </Row>
          <Row label="Pause on hover">
            <Toggle
              value={!!p.pauseOnHover}
              onChange={(v) => sp("pauseOnHover", v)}
            />
          </Row>
        </Grp>
        <Grp title="Speed">
          <Row label="">
            <Pills
              value={p.speed}
              opts={["slow", "normal", "fast"]}
              onChange={(v) => sp("speed", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    morphblob: () => (
      <>
        <Grp title="Colour">
          <Row label="Primary">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
          <Row label="Gradient">
            <Toggle value={!!p.gradient} onChange={(v) => sp("gradient", v)} />
          </Row>
          {p.gradient && (
            <Row label="Secondary">
              <Swatches value={p.color2} onChange={(v) => sp("color2", v)} />
            </Row>
          )}
        </Grp>
        <Grp title="Settings">
          <Row label="Size">
            <Range
              value={p.size}
              min={60}
              max={200}
              unit="px"
              onChange={(v) => sp("size", v)}
            />
          </Row>
          <Row label="Opacity">
            <Range
              value={p.opacity}
              min={0.1}
              max={1}
              unit=""
              step={0.05}
              onChange={(v) => sp("opacity", v)}
            />
          </Row>
          <Row label="Blur">
            <Range
              value={p.blur}
              min={0}
              max={30}
              unit="px"
              onChange={(v) => sp("blur", v)}
            />
          </Row>
          <Row label="Speed">
            <Pills
              value={p.speed}
              opts={["slow", "normal", "fast"]}
              onChange={(v) => sp("speed", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    countup: () => (
      <>
        <Grp title="Values">
          <Row label="Target number">
            <input
              className="pi"
              type="number"
              title="Target number"
              value={Number(p.to ?? 48200)}
              onChange={(e) => sp("to", Number(e.target.value))}
            />
          </Row>
          <Row label="Prefix">
            <TextInput
              value={p.prefix ?? ""}
              onChange={(v) => sp("prefix", v)}
            />
          </Row>
          <Row label="Suffix">
            <TextInput
              value={p.suffix ?? ""}
              onChange={(v) => sp("suffix", v)}
            />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          {p.showLabel && (
            <Row label="Label">
              <TextInput
                value={p.label ?? ""}
                onChange={(v) => sp("label", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Animation">
          <Row label="Duration">
            <Range
              value={p.duration}
              min={500}
              max={4000}
              unit="ms"
              step={100}
              onChange={(v) => sp("duration", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Size">
          <Row label="">
            <Pills
              value={p.size}
              opts={["sm", "md", "lg", "xl"]}
              onChange={(v) => sp("size", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    barchart: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
        </Grp>
        <Grp title="Data">
          <AddRemoveList
            items={arr("data", [])}
            placeholder="Label,2024val,2025val"
            onChange={(v) => sp("data", v)}
          />
        </Grp>
        <Grp title="Colours">
          <Row label="Series 1">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
          <Row label="Series 2">
            <Swatches value={p.color2} onChange={(v) => sp("color2", v)} />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Bar radius">
            <Range
              value={p.radius}
              min={0}
              max={12}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Show grid">
            <Toggle value={!!p.showGrid} onChange={(v) => sp("showGrid", v)} />
          </Row>
          <Row label="Show legend">
            <Toggle
              value={!!p.showLegend}
              onChange={(v) => sp("showLegend", v)}
            />
          </Row>
          <Row label="Animated">
            <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
          </Row>
        </Grp>
      </>
    ),

    linechart: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
        </Grp>
        <Grp title="Data">
          <AddRemoveList
            items={arr("data", [])}
            placeholder="Label,line1val,line2val"
            onChange={(v) => sp("data", v)}
          />
        </Grp>
        <Grp title="Colours">
          <Row label="Line 1">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
          <Row label="Line 2">
            <Swatches value={p.color2} onChange={(v) => sp("color2", v)} />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Tension">
            <Range
              value={p.tension}
              min={0}
              max={1}
              unit=""
              step={0.1}
              onChange={(v) => sp("tension", v)}
            />
          </Row>
          <Row label="Fill area">
            <Toggle value={!!p.fill} onChange={(v) => sp("fill", v)} />
          </Row>
          <Row label="Show dots">
            <Toggle value={!!p.showDots} onChange={(v) => sp("showDots", v)} />
          </Row>
          <Row label="Show grid">
            <Toggle value={!!p.showGrid} onChange={(v) => sp("showGrid", v)} />
          </Row>
          <Row label="Animated">
            <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
          </Row>
        </Grp>
      </>
    ),

    donut: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Centre text">
            <TextInput
              value={p.centerText ?? ""}
              onChange={(v) => sp("centerText", v)}
            />
          </Row>
          <Row label="Show centre">
            <Toggle
              value={!!p.showCenter}
              onChange={(v) => sp("showCenter", v)}
            />
          </Row>
          <Row label="Show labels">
            <Toggle
              value={!!p.showLabels}
              onChange={(v) => sp("showLabels", v)}
            />
          </Row>
        </Grp>
        <Grp title="Data">
          <AddRemoveList
            items={arr("data", [])}
            placeholder="Label,value"
            onChange={(v) => sp("data", v)}
          />
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Thickness">
            <Range
              value={p.thickness}
              min={10}
              max={60}
              unit="px"
              onChange={(v) => sp("thickness", v)}
            />
          </Row>
          <Row label="Animated">
            <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
          </Row>
        </Grp>
      </>
    ),

    progress: () => (
      <>
        <Grp title="Content">
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Value">
            <Range
              value={p.value}
              min={0}
              max={100}
              unit="%"
              onChange={(v) => sp("value", v)}
            />
          </Row>
          <Row label="Show label">
            <Toggle
              value={!!p.showLabel}
              onChange={(v) => sp("showLabel", v)}
            />
          </Row>
          <Row label="Show value">
            <Toggle
              value={!!p.showValue}
              onChange={(v) => sp("showValue", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="Height">
            <Range
              value={p.height}
              min={2}
              max={20}
              unit="px"
              onChange={(v) => sp("height", v)}
            />
          </Row>
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={10}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Striped">
            <Toggle value={!!p.striped} onChange={(v) => sp("striped", v)} />
          </Row>
        </Grp>
      </>
    ),

    sparkline: () => (
      <>
        <Grp title="Style">
          <Row label="Type">
            <Pills
              value={p.variant}
              opts={["line", "bar"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
          <Row label="Fill">
            <Toggle value={!!p.fill} onChange={(v) => sp("fill", v)} />
          </Row>
          <Row label="Show end dot">
            <Toggle value={!!p.showDot} onChange={(v) => sp("showDot", v)} />
          </Row>
          <Row label="Height">
            <Range
              value={p.height}
              min={30}
              max={120}
              unit="px"
              onChange={(v) => sp("height", v)}
            />
          </Row>
          <Row label="Animated">
            <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
          </Row>
        </Grp>
        <Grp title="Data">
          <AddRemoveList
            items={arr("data", [])}
            placeholder="Label,value"
            onChange={(v) => sp("data", v)}
          />
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    cmdpalette: () => (
      <>
        <Grp title="Content">
          <Row label="Placeholder">
            <TextInput
              value={p.placeholder ?? ""}
              onChange={(v) => sp("placeholder", v)}
            />
          </Row>
          <Row label="Show categories">
            <Toggle
              value={!!p.showCategories}
              onChange={(v) => sp("showCategories", v)}
            />
          </Row>
          <Row label="Show shortcuts">
            <Toggle
              value={!!p.showShortcuts}
              onChange={(v) => sp("showShortcuts", v)}
            />
          </Row>
        </Grp>
        <Grp title="Items">
          <AddRemoveList
            items={arr("items", [])}
            placeholder="Category:Label"
            onChange={(v) => sp("items", v)}
          />
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    navbar: () => (
      <>
        <Grp title="Content">
          <Row label="Brand name">
            <TextInput value={p.brand ?? ""} onChange={(v) => sp("brand", v)} />
          </Row>
          <Row label="Show logo">
            <Toggle value={!!p.showLogo} onChange={(v) => sp("showLogo", v)} />
          </Row>
          <Row label="Show CTA button">
            <Toggle value={!!p.showCta} onChange={(v) => sp("showCta", v)} />
          </Row>
          {p.showCta && (
            <Row label="CTA text">
              <TextInput
                value={p.ctaText ?? ""}
                onChange={(v) => sp("ctaText", v)}
              />
            </Row>
          )}
        </Grp>
        <Grp title="Links">
          <AddRemoveList
            items={arr("links", [])}
            placeholder="Link label…"
            onChange={(v) => sp("links", v)}
          />
        </Grp>
        <Grp title="Style">
          <Row label="Theme">
            <Pills
              value={p.variant}
              opts={["dark", "light"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    breadcrumb: () => (
      <>
        <Grp title="Content">
          <Row label="Items (comma separated)">
            <TextInput value={p.items ?? ""} onChange={(v) => sp("items", v)} />
          </Row>
          <Row label="Separator">
            <TextInput
              value={p.separator ?? ""}
              onChange={(v) => sp("separator", v)}
            />
          </Row>
          <Row label="Show home icon">
            <Toggle value={!!p.showHome} onChange={(v) => sp("showHome", v)} />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    pagination: () => (
      <>
        <Grp title="Settings">
          <Row label="Total items">
            <Range
              value={p.total}
              min={5}
              max={200}
              unit=""
              onChange={(v) => sp("total", v)}
            />
          </Row>
          <Row label="Per page">
            <Range
              value={p.perPage}
              min={5}
              max={50}
              unit=""
              onChange={(v) => sp("perPage", v)}
            />
          </Row>
          <Row label="Current page">
            <Range
              value={p.current}
              min={1}
              max={Math.ceil(
                ((p.total as number) || 48) / ((p.perPage as number) || 10),
              )}
              unit=""
              onChange={(v) => sp("current", v)}
            />
          </Row>
          <Row label="Show item count">
            <Toggle
              value={!!p.showCount}
              onChange={(v) => sp("showCount", v)}
            />
          </Row>
          <Row label="Show arrows">
            <Toggle
              value={!!p.showArrows}
              onChange={(v) => sp("showArrows", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    sidenav: () => (
      <>
        <Grp title="Content">
          <Row label="Brand name">
            <TextInput value={p.brand ?? ""} onChange={(v) => sp("brand", v)} />
          </Row>
          <Row label="Show icons">
            <Toggle
              value={!!p.showIcons}
              onChange={(v) => sp("showIcons", v)}
            />
          </Row>
        </Grp>
        <Grp title="Items">
          <AddRemoveList
            items={arr("items", [])}
            placeholder="icon,Label"
            onChange={(v) => sp("items", v)}
          />
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    tabs: () => (
      <>
        <Grp title="Tabs">
          <AddRemoveList
            items={arr("tabs", ["Tab 1"])}
            placeholder="Tab label…"
            onChange={(v) => sp("tabs", v)}
          />
        </Grp>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["underline", "pill", "line"]}
              onChange={(v) => sp("variant", v)}
              cols={3}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    modal: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Body text">
            <Textarea value={p.body ?? ""} onChange={(v) => sp("body", v)} />
          </Row>
          <Row label="Primary button">
            <TextInput
              value={p.primaryBtn ?? ""}
              onChange={(v) => sp("primaryBtn", v)}
            />
          </Row>
          <Row label="Secondary button">
            <TextInput
              value={p.secondaryBtn ?? ""}
              onChange={(v) => sp("secondaryBtn", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={24}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Show close button">
            <Toggle
              value={!!p.showClose}
              onChange={(v) => sp("showClose", v)}
            />
          </Row>
          <Row label="Show footer">
            <Toggle
              value={!!p.showFooter}
              onChange={(v) => sp("showFooter", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    toast: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Message">
            <TextInput
              value={p.message ?? ""}
              onChange={(v) => sp("message", v)}
            />
          </Row>
        </Grp>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["success", "error", "warning", "info"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Show icon">
            <Toggle value={!!p.showIcon} onChange={(v) => sp("showIcon", v)} />
          </Row>
          <Row label="Show close">
            <Toggle
              value={!!p.showClose}
              onChange={(v) => sp("showClose", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    tooltip: () => (
      <>
        <Grp title="Content">
          <Row label="Trigger text">
            <TextInput value={p.text ?? ""} onChange={(v) => sp("text", v)} />
          </Row>
          <Row label="Tooltip text">
            <TextInput value={p.tip ?? ""} onChange={(v) => sp("tip", v)} />
          </Row>
        </Grp>
        <Grp title="Style">
          <Row label="Theme">
            <Pills
              value={p.variant}
              opts={["dark", "light"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    dropdown: () => (
      <>
        <Grp title="Content">
          <Row label="Trigger label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
          <Row label="Show divider before last">
            <Toggle
              value={!!p.showDivider}
              onChange={(v) => sp("showDivider", v)}
            />
          </Row>
        </Grp>
        <Grp title="Items">
          <div className="arl">
            {arr("items", ["Item"]).map((item, i) => {
              const danger = Array.isArray(p.dangerItems)
                ? !!p.dangerItems[i]
                : false;
              const items = arr("items", ["Item"]);
              const dangerItems: boolean[] = Array.isArray(p.dangerItems)
                ? [...(p.dangerItems as boolean[])]
                : items.map(() => false);
              return (
                <div key={i} className="arl-row">
                  <input
                    className="pi"
                    value={item}
                    placeholder="Item label…"
                    onChange={(e) => {
                      const n = [...items];
                      n[i] = e.target.value;
                      sp("items", n);
                    }}
                  />
                  <button
                    type="button"
                    className={`arl-danger${danger ? " active" : ""}`}
                    title="Mark as destructive"
                    onClick={() => {
                      const d = [...dangerItems];
                      while (d.length <= i) d.push(false);
                      d[i] = !d[i];
                      sp("dangerItems", d);
                    }}
                  >
                    D
                  </button>
                  <button
                    type="button"
                    className="arl-rm"
                    onClick={() => {
                      sp(
                        "items",
                        items.filter((_, j) => j !== i),
                      );
                      sp(
                        "dangerItems",
                        dangerItems.filter((_, j) => j !== i),
                      );
                    }}
                  >
                    −
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="arl-add"
              onClick={() => {
                sp("items", [...arr("items", []), ""]);
                sp("dangerItems", [
                  ...(Array.isArray(p.dangerItems)
                    ? (p.dangerItems as boolean[])
                    : []),
                  false,
                ]);
              }}
            >
              ＋ Add
            </button>
          </div>
        </Grp>
        <Grp title="Shape">
          <Row label="Radius">
            <Range
              value={p.radius}
              min={4}
              max={16}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    drawer: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Body">
            <Textarea value={p.body ?? ""} onChange={(v) => sp("body", v)} />
          </Row>
          <Row label="Show overlay">
            <Toggle
              value={!!p.showOverlay}
              onChange={(v) => sp("showOverlay", v)}
            />
          </Row>
        </Grp>
        <Grp title="Style">
          <Row label="Side">
            <Pills
              value={p.side}
              opts={["right", "left"]}
              onChange={(v) => sp("side", v)}
            />
          </Row>
          <Row label="Width">
            <Range
              value={p.width}
              min={200}
              max={400}
              unit="px"
              onChange={(v) => sp("width", v)}
            />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    skeleton: () => (
      <>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["card", "text", "profile", "table"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Lines (text variant)">
            <Range
              value={p.lines}
              min={1}
              max={8}
              unit=""
              onChange={(v) => sp("lines", v)}
            />
          </Row>
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={12}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
          <Row label="Animated shimmer">
            <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
          </Row>
        </Grp>
      </>
    ),

    alert: () => (
      <>
        <Grp title="Content">
          <Row label="Title">
            <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
          </Row>
          <Row label="Message">
            <TextInput
              value={p.message ?? ""}
              onChange={(v) => sp("message", v)}
            />
          </Row>
          <Row label="Action text">
            <TextInput
              value={p.actionText ?? ""}
              onChange={(v) => sp("actionText", v)}
            />
          </Row>
        </Grp>
        <Grp title="Variant">
          <Row label="">
            <OptsGrid
              value={p.variant}
              opts={["success", "error", "warning", "info"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
        </Grp>
        <Grp title="Settings">
          <Row label="Show icon">
            <Toggle value={!!p.showIcon} onChange={(v) => sp("showIcon", v)} />
          </Row>
          <Row label="Show close">
            <Toggle
              value={!!p.showClose}
              onChange={(v) => sp("showClose", v)}
            />
          </Row>
          <Row label="Show action button">
            <Toggle
              value={!!p.showAction}
              onChange={(v) => sp("showAction", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    stepper: () => (
      <>
        <Grp title="Steps">
          <AddRemoveList
            items={arr("steps", ["Step 1"])}
            placeholder="Step label…"
            onChange={(v) => sp("steps", v)}
          />
        </Grp>
        <Grp title="Descriptions">
          <AddRemoveList
            items={arr("descs", [])}
            placeholder="Step description…"
            onChange={(v) => sp("descs", v)}
          />
        </Grp>
        <Grp title="Layout">
          <Row label="">
            <Pills
              value={p.variant}
              opts={["horizontal", "vertical"]}
              onChange={(v) => sp("variant", v)}
            />
          </Row>
          <Row label="Show description">
            <Toggle value={!!p.showDesc} onChange={(v) => sp("showDesc", v)} />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),

    accordion: () => (
      <>
        <Grp title="Items (titles)">
          <AddRemoveList
            items={arr("items", [])}
            placeholder="Item title…"
            onChange={(v) => sp("items", v)}
          />
        </Grp>
        <Grp title="Bodies">
          <AddRemoveList
            items={arr("bodies", [])}
            placeholder="Item body text…"
            onChange={(v) => sp("bodies", v)}
          />
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
        <Grp title="Shape">
          <Row label="Radius">
            <Range
              value={p.radius}
              min={0}
              max={16}
              unit="px"
              onChange={(v) => sp("radius", v)}
            />
          </Row>
        </Grp>
      </>
    ),

    table: () => (
      <>
        <Grp title="Content">
          <Row label="Caption">
            <TextInput
              value={p.caption ?? ""}
              onChange={(v) => sp("caption", v)}
            />
          </Row>
        </Grp>
        <Grp title="Columns">
          <AddRemoveList
            items={arr("columns", ["Column"])}
            placeholder="Column name…"
            onChange={(v) => sp("columns", v)}
          />
        </Grp>
        <Grp title="Style">
          <Row label="Striped rows">
            <Toggle
              value={!!p.showStripes}
              onChange={(v) => sp("showStripes", v)}
            />
          </Row>
          <Row label="Hover highlight">
            <Toggle
              value={!!p.showHover}
              onChange={(v) => sp("showHover", v)}
            />
          </Row>
          <Row label="Compact mode">
            <Toggle value={!!p.compact} onChange={(v) => sp("compact", v)} />
          </Row>
        </Grp>
        <Grp title="Colour">
          <Row label="">
            <Swatches value={p.color} onChange={(v) => sp("color", v)} />
          </Row>
        </Grp>
      </>
    ),
  };

  const builder = builders[activeComponent];
  const meta = PROP_DEFAULTS[activeComponent];
  const displayName =
    activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1);

  return (
    <div className="props-col">
      <div className="ph">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="ph-lbl">Properties</span>
          <span className="ph-name">{displayName}</span>
        </div>
        {meta && (
          <button
            type="button"
            className="ph-reset"
            onClick={() => resetComponent(activeComponent)}
          >
            ↺ Reset
          </button>
        )}
      </div>
      <div className="ps">
        <Grp title="Global tokens">
          <Row label="Font family">
            <select
              className="pi"
              title="Font family"
              value={globalFont}
              onChange={(e) => setGlobalFont(e.target.value)}
            >
              {[
                "Inter",
                "DM Sans",
                "Geist",
                "Manrope",
                "Plus Jakarta Sans",
                "Space Grotesk",
                "Sora",
                "system-ui",
              ].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Text colour">
            <Swatches value={globalTextColor} onChange={setGlobalTextColor} />
          </Row>
          <Row label="Radius scale">
            <Pills
              value={globalRadius}
              opts={["sharp", "default", "rounded"]}
              onChange={(v) =>
                setGlobalRadius(v as "sharp" | "default" | "rounded")
              }
            />
          </Row>
        </Grp>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            margin: "8px 0",
          }}
        />
        {builder ? (
          builder()
        ) : (
          <div style={{ padding: 16, fontSize: 12, color: "var(--muted)" }}>
            No properties.
          </div>
        )}
      </div>
    </div>
  );
}
