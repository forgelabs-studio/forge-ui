"use client";
import { useId, useState, useRef, useEffect } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { SelectProps } from "@/lib/types";

export default function SelectRenderer({ props: p }: { props: SelectProps }) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();
  const triggerId = `${uid}-trigger`;
  const listboxId = `${uid}-listbox`;
  const liveId = `${uid}-live`;

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const sz = (
    { sm: [7, 11], md: [9, 13], lg: [12, 15] } as Record<string, number[]>
  )[p.size] ?? [9, 13];

  const opts: string[] = Array.isArray(p.options)
    ? p.options
    : (p.options || "")
        .split(",")
        .map((o: string) => o.trim())
        .filter(Boolean);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);

  // Typeahead buffer
  const typeaheadRef = useRef({ buffer: "", timeout: 0 as number | undefined });

  // Close on outside pointerdown (covers mouse/touch/pen)
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // When opening, set activeIndex to selected index or 0 and move focus to listbox
  useEffect(() => {
    if (open) {
      const selIndex = opts.findIndex((o) => o === selected);
      const idx = selIndex >= 0 ? selIndex : 0;
      setActiveIndex(idx);
      // move focus to listbox so arrow keys work
      requestAnimationFrame(() => listboxRef.current?.focus());
    } else {
      // when closing, return focus to trigger
      const trigger = document.getElementById(triggerId) as HTMLElement | null;
      trigger?.focus();
    }
  }, [open, selected, opts, triggerId]);

  // Helper: select option
  function selectOption(o: string) {
    setSelected(o);
    setOpen(false);
    setActiveIndex(-1);
    // update polite live region by setting text content (rendered below)
    const live = document.getElementById(liveId);
    if (live) live.textContent = `${o} selected`;
  }

  // Keyboard handling on trigger button
  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }

  // Keyboard handling inside listbox
  function onListboxKeyDown(e: React.KeyboardEvent) {
    const max = opts.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < max ? i + 1 : 0));
      scrollActiveIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : max));
      scrollActiveIntoView();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      scrollActiveIntoView();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(max);
      scrollActiveIntoView();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) selectOption(opts[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // typeahead
      const ch = e.key.toLowerCase();
      const ta = typeaheadRef.current;
      ta.buffer += ch;
      window.clearTimeout(ta.timeout);
      ta.timeout = window.setTimeout(() => {
        ta.buffer = "";
      }, 700);
      const matchIndex = opts.findIndex((o) =>
        o.toLowerCase().startsWith(ta.buffer),
      );
      if (matchIndex >= 0) {
        setActiveIndex(matchIndex);
        scrollActiveIntoView();
      }
    }
  }

  function scrollActiveIntoView() {
    requestAnimationFrame(() => {
      if (!listboxRef.current) return;
      const activeId = `${listboxId}-option-${activeIndex}`;
      const el = document.getElementById(activeId);
      if (el && el.scrollIntoView()) {
        (el as HTMLElement).scrollIntoView({ block: "nearest" });
      }
    });
  }

  const triggerText = selected || p.placeholder || "Choose…";
  const radius = typeof p.radius === "number" ? p.radius : (p.radius ?? 6);
  const hoverCol = p.hoverColor || col;

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 260 }}
    >
      {p.showLabel && (
        <label
          htmlFor={triggerId}
          style={{ fontSize: 11, color: textColor, fontFamily }}
        >
          {p.label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {/* Trigger button */}
        <button
          id={triggerId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={!p.showLabel ? p.label : undefined}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onTriggerKeyDown}
          style={{
            width: "100%",
            background: "#111113",
            border: `1px solid ${open ? `rgba(${rgb},.45)` : "rgba(255,255,255,.09)"}`,
            boxShadow: open ? `0 0 0 3px rgba(${rgb},.08)` : "none",
            borderRadius: radius,
            padding: `${sz[0]}px 32px ${sz[0]}px 12px`,
            fontSize: sz[1],
            color: selected ? textColor : "rgba(240,237,232,.3)",
            fontFamily,
            cursor: "pointer",
            transition: "all .2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{triggerText}</span>
          <span
            aria-hidden="true"
            style={{
              color: "rgba(240,237,232,.3)",
              fontSize: 10,
              pointerEvents: "none",
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "none",
            }}
          >
            ▾
          </span>
        </button>

        {/* Listbox */}
        {open && (
          <div
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={p.showLabel ? undefined : triggerId}
            aria-activedescendant={
              activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            onKeyDown={onListboxKeyDown}
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 100,
              background: "#18181b",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: radius,
              overflow: "auto",
              maxHeight: 240,
              boxShadow: "0 8px 32px rgba(0,0,0,.5)",
              outline: "none",
            }}
          >
            {opts.map((o: string, i: number) => {
              const isActive = i === activeIndex;
              const isSelected = selected === o;
              return (
                <div
                  key={o}
                  id={`${listboxId}-option-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(o)}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    padding: `${sz[0] + 2}px 12px`,
                    fontSize: sz[1],
                    fontFamily,
                    color: isSelected
                      ? lighten(hoverCol)
                      : "rgba(240,237,232,.7)",
                    background: isActive
                      ? `rgba(${hexRgb(hoverCol)},.12)`
                      : isSelected
                        ? `rgba(${hexRgb(hoverCol)},.1)`
                        : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "background .15s",
                  }}
                >
                  <span>{o}</span>
                  {isSelected && (
                    <span style={{ fontSize: 10, color: lighten(hoverCol) }}>
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Polite live region for selection announcements */}
      <div
        id={liveId}
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
      />
    </div>
  );
}
