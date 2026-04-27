"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  Range,
  AddRemoveList,
  arr,
} from "./controls";

export default function BarChartProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Title">
          <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
        </Row>
      </Grp>
      <Grp title="Data">
        <AddRemoveList
          items={arr(p, "data", [])}
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
  );
}
