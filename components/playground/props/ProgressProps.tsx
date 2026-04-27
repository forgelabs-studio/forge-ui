"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle, Range } from "./controls";

export default function ProgressProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
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
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
        <Row label="Show value">
          <Toggle value={!!p.showValue} onChange={(v) => sp("showValue", v)} />
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
  );
}
