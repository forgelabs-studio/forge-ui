"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle } from "./controls";

export default function BreadcrumbProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Items (comma separated)">
          <TextInput value={p.items ?? ""} onChange={(v) => sp("items", v)} />
        </Row>
        <Row label="Separator">
          <TextInput
            value={p.separator ?? ""}
            onChange={(v) => sp("separator", v)}
          />
        </Row>
        <Row label="Show home icon">
          <Toggle value={!!p.showHome} onChange={(v) => sp("showHome", v)} />
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
