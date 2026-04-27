"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  OptsGrid,
  Pills,
} from "./controls";

export default function BadgeProps() {
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
        <Row label="Uppercase">
          <Toggle value={!!p.uppercase} onChange={(v) => sp("uppercase", v)} />
        </Row>
        <Row label="Show dot">
          <Toggle value={!!p.showDot} onChange={(v) => sp("showDot", v)} />
        </Row>
        {p.showDot && (
          <Row label="Pulse">
            <Toggle value={!!p.dotPulse} onChange={(v) => sp("dotPulse", v)} />
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
  );
}
