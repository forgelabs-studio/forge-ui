"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, Toggle, Range, Textarea } from "./controls";

export default function FadeUpProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Text (each line staggers)">
          <Textarea value={p.text ?? ""} onChange={(v) => sp("text", v)} />
        </Row>
      </Grp>
      <Grp title="Animation">
        <Row label="Duration">
          <Range
            value={p.duration}
            min={200}
            max={1500}
            unit="ms"
            step={50}
            onChange={(v) => sp("duration", v)}
          />
        </Row>
        <Row label="Stagger lines">
          <Toggle value={!!p.stagger} onChange={(v) => sp("stagger", v)} />
        </Row>
      </Grp>
      <Grp title="Accent colour">
        <Row label="">
          <Swatches value={p.color} onChange={(v) => sp("color", v)} />
        </Row>
      </Grp>
    </>
  );
}
