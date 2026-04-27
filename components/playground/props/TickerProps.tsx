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
  AddRemoveList,
  arr,
  Pills,
} from "./controls";

export default function TickerProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Items">
        <AddRemoveList
          items={arr(p, "items", [])}
          placeholder="Ticker item…"
          onChange={(v) => sp("items", v)}
        />
      </Grp>
      <Grp title="Content">
        <Row label="Separator">
          <TextInput
            value={p.separator ?? ""}
            onChange={(v) => sp("separator", v)}
          />
        </Row>
        <Row label="Gap">
          <Range
            value={p.gap}
            min={16}
            max={80}
            unit="px"
            onChange={(v) => sp("gap", v)}
          />
        </Row>
        <Row label="Pause on hover">
          <Toggle
            value={!!p.pauseOnHover}
            onChange={(v) => sp("pauseOnHover", v)}
          />
        </Row>
      </Grp>
      <Grp title="Speed">
        <Row label="">
          <Pills
            value={p.speed}
            opts={["slow", "normal", "fast"]}
            onChange={(v) => sp("speed", v)}
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
