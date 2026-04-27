"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  IconGrid,
  OptsGrid,
  Pills,
  Row,
  Swatches,
  TextInput,
  Toggle,
  Range,
} from "./controls";

export default function ButtonProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Label">
          <TextInput value={p.text ?? ""} onChange={(v) => sp("text", v)} />
        </Row>
        <Row label="Icon">
          <IconGrid value={p.icon ?? "none"} onChange={(v) => sp("icon", v)} />
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
          <Toggle value={!!p.uppercase} onChange={(v) => sp("uppercase", v)} />
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
          <Toggle value={!!p.fullWidth} onChange={(v) => sp("fullWidth", v)} />
        </Row>
        <Row label="Disabled">
          <Toggle value={!!p.disabled} onChange={(v) => sp("disabled", v)} />
        </Row>
      </Grp>
    </>
  );
}
