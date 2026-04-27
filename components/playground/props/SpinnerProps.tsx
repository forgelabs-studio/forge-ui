"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  Pills,
  OptsGrid,
} from "./controls";

export default function SpinnerProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
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
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
        {p.showLabel && (
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
        )}
      </Grp>
    </>
  );
}
