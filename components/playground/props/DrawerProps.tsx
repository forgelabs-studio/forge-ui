"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  Range,
  Textarea,
  Pills,
} from "./controls";

export default function DrawerProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Title">
          <TextInput value={p.title ?? ""} onChange={(v) => sp("title", v)} />
        </Row>
        <Row label="Body">
          <Textarea value={p.body ?? ""} onChange={(v) => sp("body", v)} />
        </Row>
        <Row label="Show overlay">
          <Toggle
            value={!!p.showOverlay}
            onChange={(v) => sp("showOverlay", v)}
          />
        </Row>
      </Grp>
      <Grp title="Style">
        <Row label="Side">
          <Pills
            value={p.side}
            opts={["right", "left"]}
            onChange={(v) => sp("side", v)}
          />
        </Row>
        <Row label="Width">
          <Range
            value={p.width}
            min={200}
            max={400}
            unit="px"
            onChange={(v) => sp("width", v)}
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
