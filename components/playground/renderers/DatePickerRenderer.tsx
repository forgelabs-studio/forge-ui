"use client";
import { useId, useEffect, useRef, useState } from "react";
import { hexRgb, contrast } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { DatePickerProps } from "@/lib/types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DatePickerRenderer({
  props: p,
}: {
  props: DatePickerProps;
}) {
  const { fontFamily, textColor, resolveRadius } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  const initDate = (() => {
    try {
      return new Date(p.selectedDate || "2025-03-15");
    } catch {
      return new Date();
    }
  })();

  const [yr, setYr] = useState(initDate.getFullYear());
  const [mo, setMo] = useState(initDate.getMonth());
  const [sel, setSel] = useState<number | null>(initDate.getDate());

  // compute month grid
  const firstDay = new Date(yr, mo, 1).getDay();
  const daysInMonth = new Date(yr, mo + 1, 0).getDate();
  const cells: (number | "")[] = [
    ...Array(firstDay).fill(""),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // chunk cells into rows of 7 (weeks)
  const rows: (number | "")[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  // focus management: index of focused cell in the flattened cells array
  const initialFocusIndex = (() => {
    const selIndex = cells.findIndex((c) => c === sel);
    return selIndex >= 0 ? selIndex : cells.findIndex((c) => c !== "");
  })();
  const [focusIndex, setFocusIndex] = useState<number>(initialFocusIndex);
  const gridRef = useRef<HTMLDivElement | null>(null);

  function prevMonth() {
    if (mo === 0) {
      setMo(11);
      setYr((y) => y - 1);
    } else setMo((m) => m - 1);
    // reset focus after month change
    setTimeout(() => {
      const idx = cells.findIndex((c) => c !== "");
      if (idx >= 0) setFocusIndex(idx);
    }, 0);
  }
  function nextMonth() {
    if (mo === 11) {
      setMo(0);
      setYr((y) => y + 1);
    } else setMo((m) => m + 1);
    setTimeout(() => {
      const idx = cells.findIndex((c) => c !== "");
      if (idx >= 0) setFocusIndex(idx);
    }, 0);
  }

  // keyboard navigation inside grid (works with flattened index)
  function onGridKeyDown(e: React.KeyboardEvent) {
    const cols = 7;
    const max = cells.length - 1;

    const findNextNonEmpty = (start: number, step: number) => {
      let i = start;
      while (i >= 0 && i <= max) {
        if (cells[i] !== "") return i;
        i += step;
      }
      return -1;
    };

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const next = findNextNonEmpty(focusIndex + 1, 1);
        if (next >= 0) setFocusIndex(next);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prev = findNextNonEmpty(focusIndex - 1, -1);
        if (prev >= 0) setFocusIndex(prev);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const down = findNextNonEmpty(focusIndex + cols, 1);
        if (down >= 0) setFocusIndex(down);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const up = findNextNonEmpty(focusIndex - cols, -1);
        if (up >= 0) setFocusIndex(up);
        break;
      }
      case "Home": {
        e.preventDefault();
        const rowStart = focusIndex - (focusIndex % cols);
        const first = findNextNonEmpty(rowStart, 1);
        if (first >= 0) setFocusIndex(first);
        break;
      }
      case "End": {
        e.preventDefault();
        const rowEnd = Math.min(
          focusIndex - (focusIndex % cols) + (cols - 1),
          max,
        );
        const last = findNextNonEmpty(rowEnd, -1);
        if (last >= 0) setFocusIndex(last);
        break;
      }
      case "PageUp": {
        e.preventDefault();
        if (mo === 0) {
          setMo(11);
          setYr((y) => y - 1);
        } else setMo((m) => m - 1);
        break;
      }
      case "PageDown": {
        e.preventDefault();
        if (mo === 11) {
          setMo(0);
          setYr((y) => y + 1);
        } else setMo((m) => m + 1);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        const val = cells[focusIndex];
        if (typeof val === "number") setSel(val);
        break;
      }
      case "Escape": {
        e.preventDefault();
        (gridRef.current as HTMLElement | null)?.blur();
        break;
      }
    }
  }

  useEffect(() => {
    const idx = cells.findIndex((c) => c !== "");
    if (idx >= 0) setFocusIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mo, yr]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`${uid}-cell-${focusIndex}`);
      if (el) (el as HTMLElement).focus();
    });
  }, [focusIndex, uid]);

  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const labelText = p.label ?? "Select date";
  const dayAriaLabel = (d: number) => `${MONTHS[mo]} ${d}, ${yr}`;
  const footerText = `${MONTHS[mo].slice(0, 3)} ${sel ?? ""}, ${yr}`;

  return (
    <div style={{ width: 258 }}>
      {showLabel && (
        <label
          htmlFor={`${uid}-grid`}
          style={{
            fontSize: 11,
            color: "rgba(240,237,232,.45)",
            fontFamily,
            display: "block",
            marginBottom: 8,
          }}
        >
          {labelText}
        </label>
      )}

      <div
        role="group"
        aria-label={showLabel ? undefined : labelText}
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,.09)",
          borderRadius: resolveRadius(p.radius ?? 4),
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "11px 14px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(240,237,232,.4)",
              cursor: "pointer",
              fontSize: 18,
              padding: "2px 6px",
            }}
          >
            ‹
          </button>

          <span
            id={`${uid}-month`}
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: textColor,
              fontFamily,
            }}
            aria-live="polite"
          >
            {MONTHS[mo]} {yr}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(240,237,232,.4)",
              cursor: "pointer",
              fontSize: 18,
              padding: "2px 6px",
            }}
          >
            ›
          </button>
        </div>

        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 2,
              marginBottom: 4,
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  color: "rgba(240,237,232,.25)",
                  padding: 4,
                  fontFamily,
                }}
                aria-hidden="true"
              >
                {d}
              </div>
            ))}
          </div>

          {/* grid: rows must be direct children of the grid */}
          <div
            id={`${uid}-grid`}
            ref={gridRef}
            role="grid"
            aria-labelledby={showLabel ? `${uid}-month` : undefined}
            tabIndex={0}
            onKeyDown={onGridKeyDown}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
              outline: "none",
            }}
          >
            {rows.map((week, rowIndex) => {
              return (
                <div
                  key={rowIndex}
                  role="row"
                  style={{
                    display: "contents", // keep CSS grid layout while making row the semantic parent
                  }}
                >
                  {week.map((d, colIndex) => {
                    const cellIndex = rowIndex * 7 + colIndex;
                    if (d === "") {
                      // presentational placeholder cell
                      return (
                        <div
                          key={cellIndex}
                          role="presentation"
                          aria-hidden="true"
                          style={{ minHeight: 34 }}
                        />
                      );
                    }
                    const isFocused = cellIndex === focusIndex;
                    const isSelected = d === sel;
                    return (
                      <div
                        key={cellIndex}
                        id={`${uid}-cell-${cellIndex}`}
                        role="gridcell"
                        tabIndex={isFocused ? 0 : -1}
                        aria-selected={isSelected}
                        aria-current={
                          new Date().getFullYear() === yr &&
                          new Date().getMonth() === mo &&
                          new Date().getDate() === d
                            ? "date"
                            : undefined
                        }
                        onClick={() => {
                          setSel(d as number);
                          setFocusIndex(cellIndex);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSel(d as number);
                          }
                        }}
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          padding: "6px 2px",
                          borderRadius: 5,
                          cursor: "pointer",
                          fontFamily,
                          transition: "all .12s",
                          background: d === sel ? col : "transparent",
                          color:
                            d === sel ? contrast(col) : "rgba(240,237,232,.6)",
                          minHeight: 34,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseOver={(e) => {
                          if (d !== sel)
                            (e.currentTarget as HTMLElement).style.background =
                              `rgba(${rgb},.12)`;
                        }}
                        onMouseOut={(e) => {
                          if (d !== sel)
                            (e.currentTarget as HTMLElement).style.background =
                              "transparent";
                        }}
                        aria-label={dayAriaLabel(d as number)}
                      >
                        <span>{d}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: "9px 14px",
            borderTop: "1px solid rgba(255,255,255,.06)",
            fontSize: 11,
            color: "rgba(240,237,232,.4)",
            fontFamily,
          }}
        >
          {footerText}
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          border: 0,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {sel ? `${MONTHS[mo]} ${sel}, ${yr}` : `${MONTHS[mo]} ${yr}`}
      </div>
    </div>
  );
}
