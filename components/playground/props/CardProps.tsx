"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle, Range } from "./controls";

export default function CardProps() {
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
        <Row label="Subtitle">
          <TextInput
            value={p.subtitle ?? ""}
            onChange={(v) => sp("subtitle", v)}
          />
        </Row>
        <Row label="Tag">
          <TextInput value={p.tag ?? ""} onChange={(v) => sp("tag", v)} />
        </Row>
        <Row label="Show tag">
          <Toggle value={!!p.showTag} onChange={(v) => sp("showTag", v)} />
        </Row>
        <Row label="Show badge">
          <Toggle value={!!p.showBadge} onChange={(v) => sp("showBadge", v)} />
        </Row>
        {p.showBadge && (
          <Row label="Badge text">
            <TextInput value={p.badge ?? ""} onChange={(v) => sp("badge", v)} />
          </Row>
        )}
      </Grp>
      <Grp title="Glow colour">
        <Row label="">
          <Swatches value={p.color} onChange={(v) => sp("color", v)} />
        </Row>
      </Grp>
      <Grp title="Shape">
        <Row label="Width">
          <Range
            value={p.width}
            min={180}
            max={480}
            unit="px"
            onChange={(v) => sp("width", v)}
          />
        </Row>
        <Row label="Border radius">
          <Range
            value={p.radius}
            min={0}
            max={32}
            unit="px"
            onChange={(v) => sp("radius", v)}
          />
        </Row>
        <Row label="Padding">
          <Range
            value={p.padding}
            min={12}
            max={48}
            unit="px"
            onChange={(v) => sp("padding", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
