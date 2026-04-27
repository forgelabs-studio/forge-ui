"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, TextInput, Toggle, Pills } from "./controls";

export default function ToggleProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Label">
          <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
        </Row>
        <Row label="Show label">
          <Toggle value={!!p.showLabel} onChange={(v) => sp("showLabel", v)} />
        </Row>
        {p.showLabel && (
          <Row label="Label position">
            <Pills
              value={p.labelPos}
              opts={["left", "right"]}
              onChange={(v) => sp("labelPos", v)}
            />
          </Row>
        )}
      </Grp>
      <Grp title="Default state">
        <Row label="Checked">
          <Toggle value={!!p.checked} onChange={(v) => sp("checked", v)} />
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
            opts={["sm", "md", "lg"]}
            onChange={(v) => sp("size", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
