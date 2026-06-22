"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, Swatches, Range, OptsGrid } from "./controls";

const CHARACTER_SETS = ["standard", "block", "braille", "minimal"];
const ANIMATIONS = ["none", "fadein", "scanline", "flicker", "wave", "glitch"];

export default function AsciiProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Colour">
        <Row label="Character colour">
          <Swatches value={p.color} onChange={(v) => sp("color", v)} />
        </Row>
      </Grp>
      <Grp title="Density">
        <Row label="Columns">
          <Range
            value={p.density}
            min={20}
            max={150}
            onChange={(v) => sp("density", v)}
          />
        </Row>
      </Grp>
      <Grp title="Character set">
        <Row label="">
          <OptsGrid
            value={p.characterSet}
            opts={CHARACTER_SETS}
            onChange={(v) => sp("characterSet", v)}
          />
        </Row>
      </Grp>
      <Grp title="Animation">
        <Row label="">
          <OptsGrid
            value={p.animation}
            opts={ANIMATIONS}
            onChange={(v) => sp("animation", v)}
          />
        </Row>
        {p.animation !== "none" && (
          <Row label="Duration">
            <Range
              value={p.duration}
              min={200}
              max={4000}
              step={100}
              unit="ms"
              onChange={(v) => sp("duration", v)}
            />
          </Row>
        )}
      </Grp>
    </>
  );
}
