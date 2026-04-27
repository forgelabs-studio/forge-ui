"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, AddRemoveList, Pills, arr } from "./controls";

export default function RadioProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Options">
        <AddRemoveList
          items={arr(p, "options", ["Option 1"])}
          placeholder="Option…"
          onChange={(v) => sp("options", v)}
        />
      </Grp>
      <Grp title="Layout">
        <Row label="">
          <Pills
            value={p.layout}
            opts={["vertical", "horizontal"]}
            onChange={(v) => sp("layout", v)}
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
