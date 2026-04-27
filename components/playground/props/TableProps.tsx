"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  AddRemoveList,
  arr,
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
} from "./controls";

export default function TableProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Caption">
          <TextInput
            value={p.caption ?? ""}
            onChange={(v) => sp("caption", v)}
          />
        </Row>
      </Grp>
      <Grp title="Columns">
        <AddRemoveList
          items={arr(p, "columns", ["Column"])}
          placeholder="Column name…"
          onChange={(v) => sp("columns", v)}
        />
      </Grp>
      <Grp title="Style">
        <Row label="Striped rows">
          <Toggle
            value={!!p.showStripes}
            onChange={(v) => sp("showStripes", v)}
          />
        </Row>
        <Row label="Hover highlight">
          <Toggle value={!!p.showHover} onChange={(v) => sp("showHover", v)} />
        </Row>
        <Row label="Compact mode">
          <Toggle value={!!p.compact} onChange={(v) => sp("compact", v)} />
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
