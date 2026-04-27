"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, Toggle, Range } from "./controls";

export default function PaginationProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Settings">
        <Row label="Total items">
          <Range
            value={p.total}
            min={5}
            max={200}
            unit=""
            onChange={(v) => sp("total", v)}
          />
        </Row>
        <Row label="Per page">
          <Range
            value={p.perPage}
            min={5}
            max={50}
            unit=""
            onChange={(v) => sp("perPage", v)}
          />
        </Row>
        <Row label="Current page">
          <Range
            value={p.current}
            min={1}
            max={Math.ceil(
              ((p.total as number) || 48) / ((p.perPage as number) || 10),
            )}
            unit=""
            onChange={(v) => sp("current", v)}
          />
        </Row>
        <Row label="Show item count">
          <Toggle value={!!p.showCount} onChange={(v) => sp("showCount", v)} />
        </Row>
        <Row label="Show arrows">
          <Toggle
            value={!!p.showArrows}
            onChange={(v) => sp("showArrows", v)}
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
