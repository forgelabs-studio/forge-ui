"use client";

import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import { Grp, Row, TextInput, Toggle, Range, arr } from "./controls";

export default function DropdownProps() {
  const { props, activeComponent, setProp } = usePlaygroundStore();
  const p: ComponentProps = props[activeComponent] ?? {};
  const sp = (k: string, v: ComponentProps[string]) =>
    setProp(activeComponent, k, v);
  return (
    <>
      <Grp title="Content">
        <Row label="Trigger label">
          <TextInput value={p.label ?? ""} onChange={(v) => sp("label", v)} />
        </Row>
        <Row label="Show divider before last">
          <Toggle
            value={!!p.showDivider}
            onChange={(v) => sp("showDivider", v)}
          />
        </Row>
      </Grp>
      <Grp title="Items">
        <div className="arl">
          {arr(p, "items", ["Item"]).map((item, i) => {
            const danger = Array.isArray(p.dangerItems)
              ? !!p.dangerItems[i]
              : false;
            const items = arr(p, "items", ["Item"]);
            const dangerItems: boolean[] = Array.isArray(p.dangerItems)
              ? [...(p.dangerItems as boolean[])]
              : items.map(() => false);
            return (
              <div key={i} className="arl-row">
                <input
                  className="pi"
                  value={item}
                  placeholder="Item label…"
                  onChange={(e) => {
                    const n = [...items];
                    n[i] = e.target.value;
                    sp("items", n);
                  }}
                />
                <button
                  type="button"
                  className={`arl-danger${danger ? " active" : ""}`}
                  title="Mark as destructive"
                  onClick={() => {
                    const d = [...dangerItems];
                    while (d.length <= i) d.push(false);
                    d[i] = !d[i];
                    sp("dangerItems", d);
                  }}
                >
                  D
                </button>
                <button
                  type="button"
                  className="arl-rm"
                  onClick={() => {
                    sp(
                      "items",
                      items.filter((_, j) => j !== i),
                    );
                    sp(
                      "dangerItems",
                      dangerItems.filter((_, j) => j !== i),
                    );
                  }}
                >
                  −
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="arl-add"
            onClick={() => {
              sp("items", [...arr(p, "items", []), ""]);
              sp("dangerItems", [
                ...(Array.isArray(p.dangerItems)
                  ? (p.dangerItems as boolean[])
                  : []),
                false,
              ]);
            }}
          >
            ＋ Add
          </button>
        </div>
      </Grp>
      <Grp title="Shape">
        <Row label="Radius">
          <Range
            value={p.radius}
            min={4}
            max={16}
            unit="px"
            onChange={(v) => sp("radius", v)}
          />
        </Row>
      </Grp>
    </>
  );
}
