"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  OptsGrid,
  Pills,
} from "./controls";

export default function AvatarProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Initials">
          <TextInput
            value={p.initials ?? ""}
            onChange={(v) => sp("initials", v)}
            maxLength={3}
          />
        </Row>
        <Row label="Show status dot">
          <Toggle
            value={!!p.showStatus}
            onChange={(v) => sp("showStatus", v)}
          />
        </Row>
        {p.showStatus && (
          <Row label="Status">
            <OptsGrid
              value={p.status}
              opts={["online", "away", "busy", "offline"]}
              onChange={(v) => sp("status", v)}
            />
          </Row>
        )}
        <Row label="Show ring">
          <Toggle value={!!p.showRing} onChange={(v) => sp("showRing", v)} />
        </Row>
      </Grp>
      <Grp title="Shape">
        <Row label="">
          <OptsGrid
            value={p.shape}
            opts={["circle", "squircle", "square"]}
            onChange={(v) => sp("shape", v)}
            cols={3}
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
            opts={["xs", "sm", "md", "lg", "xl"]}
            onChange={(v) => sp("size", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
