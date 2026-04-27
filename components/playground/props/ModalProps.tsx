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
} from "./controls";

export default function ModalProps() {
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
        <Row label="Body text">
          <Textarea value={p.body ?? ""} onChange={(v) => sp("body", v)} />
        </Row>
        <Row label="Primary button">
          <TextInput
            value={p.primaryBtn ?? ""}
            onChange={(v) => sp("primaryBtn", v)}
          />
        </Row>
        <Row label="Secondary button">
          <TextInput
            value={p.secondaryBtn ?? ""}
            onChange={(v) => sp("secondaryBtn", v)}
          />
        </Row>
      </Grp>
      <Grp title="Colour">
        <Row label="">
          <Swatches value={p.color} onChange={(v) => sp("color", v)} />
        </Row>
      </Grp>
      <Grp title="Settings">
        <Row label="Radius">
          <Range
            value={p.radius}
            min={0}
            max={24}
            unit="px"
            onChange={(v) => sp("radius", v)}
          />
        </Row>
        <Row label="Show close button">
          <Toggle value={!!p.showClose} onChange={(v) => sp("showClose", v)} />
        </Row>
        <Row label="Show footer">
          <Toggle
            value={!!p.showFooter}
            onChange={(v) => sp("showFooter", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
