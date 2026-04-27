"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Toggle, Range, OptsGrid } from "./controls";

export default function SkeletonProps() {
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
            opts={["card", "text", "profile", "table"]}
            onChange={(v) => sp("variant", v)}
          />
        </Row>
      </Grp>
      <Grp title="Settings">
        <Row label="Lines (text variant)">
          <Range
            value={p.lines}
            min={1}
            max={8}
            unit=""
            onChange={(v) => sp("lines", v)}
          />
        </Row>
        <Row label="Radius">
          <Range
            value={p.radius}
            min={0}
            max={12}
            unit="px"
            onChange={(v) => sp("radius", v)}
          />
        </Row>
        <Row label="Animated shimmer">
          <Toggle value={!!p.animated} onChange={(v) => sp("animated", v)} />
        </Row>
      </Grp>
    </>
  );
}
