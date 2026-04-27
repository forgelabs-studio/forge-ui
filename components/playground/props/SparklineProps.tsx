"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  Toggle,
  Range,
  Pills,
  AddRemoveList,
  arr,
} from "./controls";

export default function SparklineProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Style">
        <Row label="Type">
          <Pills
            value={p.variant}
            opts={["line", "bar"]}
            onChange={(v) => sp("variant", v)}
          />
        </Row>
        <Row label="Fill">
          <Toggle value={!!p.fill} onChange={(v) => sp("fill", v)} />
        </Row>
        <Row label="Show end dot">
          <Toggle value={!!p.showDot} onChange={(v) => sp("showDot", v)} />
        </Row>
        <Row label="Height">
          <Range
            value={p.height}
            min={30}
            max={120}
            unit="px"
            onChange={(v) => sp("height", v)}
          />
        </Row>
        <Row label="Animated">
          <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
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
    </>
  );
}
