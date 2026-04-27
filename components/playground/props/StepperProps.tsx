"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  Toggle,
  AddRemoveList,
  arr,
  Pills,
} from "./controls";

export default function StepperProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Steps">
        <AddRemoveList
          items={arr(p, "steps", ["Step 1"])}
          placeholder="Step label…"
          onChange={(v) => sp("steps", v)}
        />
      </Grp>
      <Grp title="Descriptions">
        <AddRemoveList
          items={arr(p, "descs", [])}
          placeholder="Step description…"
          onChange={(v) => sp("descs", v)}
        />
      </Grp>
      <Grp title="Layout">
        <Row label="">
          <Pills
            value={p.variant}
            opts={["horizontal", "vertical"]}
            onChange={(v) => sp("variant", v)}
          />
        </Row>
        <Row label="Show description">
          <Toggle value={!!p.showDesc} onChange={(v) => sp("showDesc", v)} />
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
