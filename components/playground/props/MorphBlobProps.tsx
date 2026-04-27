"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, Toggle, Range, Pills } from "./controls";

export default function MorphBlobProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
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
  );
}
