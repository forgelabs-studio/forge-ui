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
  Pills,
} from "./controls";

export default function TaginputProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Tags">
        <AddRemoveList
          items={arr(p, "tags", [])}
          placeholder="Tag…"
          onChange={(v) => sp("tags", v)}
        />
      </Grp>
      <Grp title="Content">
        <Row label="Placeholder">
          <TextInput
            value={p.placeholder ?? ""}
            onChange={(v) => sp("placeholder", v)}
          />
        </Row>
        <Row label="Removable">
          <Toggle value={!!p.removable} onChange={(v) => sp("removable", v)} />
        </Row>
      </Grp>
      <Grp title="Shape">
        <Row label="">
          <Pills
            value={p.variant}
            opts={["soft", "pill", "outline"]}
            onChange={(v) => sp("variant", v)}
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
