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

export default function CmdPaletteProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Placeholder">
          <TextInput
            value={p.placeholder ?? ""}
            onChange={(v) => sp("placeholder", v)}
          />
        </Row>
        <Row label="Show categories">
          <Toggle
            value={!!p.showCategories}
            onChange={(v) => sp("showCategories", v)}
          />
        </Row>
        <Row label="Show shortcuts">
          <Toggle
            value={!!p.showShortcuts}
            onChange={(v) => sp("showShortcuts", v)}
          />
        </Row>
      </Grp>
      <Grp title="Items">
        <AddRemoveList
          items={arr(p, "items", [])}
          placeholder="Category:Label"
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
