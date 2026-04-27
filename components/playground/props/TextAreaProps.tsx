"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle, Range } from "./controls";

export default function TextAreaProps() {
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
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
        <Row label="Show hint">
          <Toggle value={!!p.showHint} onChange={(v) => sp("showHint", v)} />
        </Row>
        <Row label="Show count">
          <Toggle value={!!p.showCount} onChange={(v) => sp("showCount", v)} />
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
  );
}
