"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Pills } from "./controls";

export default function TooltipProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Trigger text">
          <TextInput value={p.text ?? ""} onChange={(v) => sp("text", v)} />
        </Row>
        <Row label="Tooltip text">
          <TextInput value={p.tip ?? ""} onChange={(v) => sp("tip", v)} />
        </Row>
      </Grp>
      <Grp title="Style">
        <Row label="Theme">
          <Pills
            value={p.variant}
            opts={["dark", "light"]}
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
