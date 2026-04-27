"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import {
  Grp,
  Row,
  Swatches,
  TextInput,
  Toggle,
  AddRemoveList,
  arr,
  Pills,
} from "./controls";

export default function NavbarProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Brand name">
          <TextInput value={p.brand ?? ""} onChange={(v) => sp("brand", v)} />
        </Row>
        <Row label="Show logo">
          <Toggle value={!!p.showLogo} onChange={(v) => sp("showLogo", v)} />
        </Row>
        <Row label="Show CTA button">
          <Toggle value={!!p.showCta} onChange={(v) => sp("showCta", v)} />
        </Row>
        {p.showCta && (
          <Row label="CTA text">
            <TextInput
              value={p.ctaText ?? ""}
              onChange={(v) => sp("ctaText", v)}
            />
          </Row>
        )}
      </Grp>
      <Grp title="Links">
        <AddRemoveList
          items={arr(p, "links", [])}
          placeholder="Link label…"
          onChange={(v) => sp("links", v)}
        />
      </Grp>
      <Grp title="Style">
        <Row label="Theme">
          <Pills
            value={p.variant}
            opts={["dark", "light"]}
            onChange={(v) => sp("variant", v)}
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
