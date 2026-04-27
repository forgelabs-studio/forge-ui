"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  AddRemoveList,
  OptsGrid,
  Pills,
  arr,
} from "./controls";

export default function CheckboxProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Items">
        <AddRemoveList
          items={arr(p, "items", ["I agree to the terms"])}
          placeholder="Checkbox label…"
          onChange={(v) => sp("items", v)}
        />
      </Grp>
      <Grp title="Shape">
        <Row label="">
          <OptsGrid
            value={p.variant}
            opts={["square", "round", "squircle"]}
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
