"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, Range, AddRemoveList, arr } from "./controls";

export default function AccordionProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Items (titles)">
        <AddRemoveList
          items={arr(p, "items", [])}
          placeholder="Item title…"
          onChange={(v) => sp("items", v)}
        />
      </Grp>
      <Grp title="Bodies">
        <AddRemoveList
          items={arr(p, "bodies", [])}
          placeholder="Item body text…"
          onChange={(v) => sp("bodies", v)}
        />
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
            max={16}
            unit="px"
            onChange={(v) => sp("radius", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
