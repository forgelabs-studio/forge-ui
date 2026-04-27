"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle, Range } from "./controls";

export default function SliderProps() {
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
        <Row label="Unit prefix">
          <TextInput value={p.unit ?? ""} onChange={(v) => sp("unit", v)} />
        </Row>
        <Row label="Show value">
          <Toggle value={!!p.showValue} onChange={(v) => sp("showValue", v)} />
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
  );
}
