"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  AddRemoveList,
  arr,
} from "./controls";

export default function SideNavProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Brand name">
          <TextInput value={p.brand ?? ""} onChange={(v) => sp("brand", v)} />
        </Row>
        <Row label="Show icons">
          <Toggle value={!!p.showIcons} onChange={(v) => sp("showIcons", v)} />
        </Row>
      </Grp>
      <Grp title="Items">
        <AddRemoveList
          items={arr(p, "items", [])}
          placeholder="icon,Label"
          onChange={(v) => sp("items", v)}
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
