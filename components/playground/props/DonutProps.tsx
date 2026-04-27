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

export default function DonutProps() {
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
          items={arr(p, "data", [])}
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
  );
}
