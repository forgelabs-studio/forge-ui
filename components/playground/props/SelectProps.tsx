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
  Pills,
  arr,
} from "./controls";

export default function SelectProps() {
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
        <Row label="Show label">
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
      </Grp>
      <Grp title="Options">
        <AddRemoveList
          items={arr(p, "options")}
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
  );
}
