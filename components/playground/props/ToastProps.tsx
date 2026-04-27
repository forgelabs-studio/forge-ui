"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, TextInput, Toggle, OptsGrid } from "./controls";

export default function ToastProps() {
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
        <Row label="Message">
          <TextInput
            value={p.message ?? ""}
            onChange={(v) => sp("message", v)}
          />
        </Row>
      </Grp>
      <Grp title="Variant">
        <Row label="">
          <OptsGrid
            value={p.variant}
            opts={["success", "error", "warning", "info"]}
            onChange={(v) => sp("variant", v)}
          />
        </Row>
      </Grp>
      <Grp title="Settings">
        <Row label="Show icon">
          <Toggle value={!!p.showIcon} onChange={(v) => sp("showIcon", v)} />
        </Row>
        <Row label="Show close">
          <Toggle value={!!p.showClose} onChange={(v) => sp("showClose", v)} />
        </Row>
      </Grp>
    </>
  );
}
