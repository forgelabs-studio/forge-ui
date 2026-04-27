"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { AddRemoveList, arr, Grp, OptsGrid, Row, Swatches } from "./controls";

export default function TabsProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Tabs">
        <AddRemoveList
          items={arr(p, "tabs", ["Tab 1"])}
          placeholder="Tab label…"
          onChange={(v) => sp("tabs", v)}
        />
      </Grp>
      <Grp title="Variant">
        <Row label="">
          <OptsGrid
            value={p.variant}
            opts={["underline", "pill", "line"]}
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
    </>
  );
}
