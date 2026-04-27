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

export default function StatcardProps() {
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
        <Row label="Value">
          <TextInput value={p.value ?? ""} onChange={(v) => sp("value", v)} />
        </Row>
        <Row label="Delta">
          <TextInput value={p.delta ?? ""} onChange={(v) => sp("delta", v)} />
        </Row>
        <Row label="Direction">
          <Pills
            value={p.deltaDir}
            opts={["up", "down"]}
            onChange={(v) => sp("deltaDir", v)}
          />
        </Row>
        <Row label="Icon">
          <TextInput value={p.icon ?? ""} onChange={(v) => sp("icon", v)} />
        </Row>
      </Grp>
      <Grp title="Display">
        <Row label="Show icon">
          <Toggle value={!!p.showIcon} onChange={(v) => sp("showIcon", v)} />
        </Row>
        <Row label="Show delta">
          <Toggle value={!!p.showDelta} onChange={(v) => sp("showDelta", v)} />
        </Row>
        <Row label="Show bar">
          <Toggle value={!!p.showBar} onChange={(v) => sp("showBar", v)} />
        </Row>
        {p.showBar && (
          <Row label="Bar value">
            <Range
              value={p.barValue}
              min={0}
              max={100}
              unit="%"
              onChange={(v) => sp("barValue", v)}
            />
          </Row>
        )}
      </Grp>
      <Grp title="Colour">
        <Row label="">
          <Swatches value={p.color} onChange={(v) => sp("color", v)} />
        </Row>
      </Grp>
    </>
  );
}
