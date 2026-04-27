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
  Pills,
} from "./controls";

export default function CountUpProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Values">
        <Row label="Target number">
          <input
            className="pi"
            type="number"
            title="Target number"
            value={Number(p.to ?? 48200)}
            onChange={(e) => sp("to", Number(e.target.value))}
          />
        </Row>
        <Row label="Prefix">
          <TextInput value={p.prefix ?? ""} onChange={(v) => sp("prefix", v)} />
        </Row>
        <Row label="Suffix">
          <TextInput value={p.suffix ?? ""} onChange={(v) => sp("suffix", v)} />
        </Row>
        <Row label="Show label">
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
        {p.showLabel && (
          <Row label="Label">
            <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
          </Row>
        )}
      </Grp>
      <Grp title="Animation">
        <Row label="Duration">
          <Range
            value={p.duration}
            min={500}
            max={4000}
            unit="ms"
            step={100}
            onChange={(v) => sp("duration", v)}
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
            opts={["sm", "md", "lg", "xl"]}
            onChange={(v) => sp("size", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
