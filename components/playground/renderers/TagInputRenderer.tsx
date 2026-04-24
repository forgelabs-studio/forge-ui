"use client";
import { useId, useEffect, useRef, useState } from "react";
import { hexRgb, lighten } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import type { TagInputProps } from "@/lib/types";

export default function TagInputRenderer({
  props: p,
}: {
  props: TagInputProps;
}) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();
  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);

  const parseTags = () =>
    Array.isArray(p.tags)
      ? p.tags
      : (p.tags || "Next.js,TypeScript,Tailwind")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

  const [tags, setTags] = useState<string[]>(parseTags);
  const [inp, setInp] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastRemoveRef = useRef<HTMLButtonElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  // sync when p.tags changes from PropsPanel
  useEffect(() => {
    setTags(parseTags());
  }, [p.tags]); // eslint-disable-line react-hooks/exhaustive-deps

  const add = () => {
    const value = inp.trim();
    if (!value) return;
    setTags((t) => {
      const next = [...t, value];
      if (liveRef.current) liveRef.current.textContent = `${value} added`;
      return next;
    });
    setInp("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const remove = (i: number) => {
    setTags((t) => {
      const removed = t[i];
      const next = t.filter((_, j) => j !== i);
      if (liveRef.current) liveRef.current.textContent = `${removed} removed`;
      return next;
    });
    requestAnimationFrame(() => {
      if (i - 1 >= 0) {
        const prevBtn = document.getElementById(
          `${uid}-remove-${i - 1}`,
        ) as HTMLButtonElement | null;
        if (prevBtn) {
          prevBtn.focus();
          lastRemoveRef.current = prevBtn;
          return;
        }
      }
      inputRef.current?.focus();
    });
  };

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    } else if (e.key === "Backspace" && inp === "" && tags.length > 0) {
      e.preventDefault();
      remove(tags.length - 1);
    }
  }

  const br = p.variant === "pill" ? "100px" : "5px";
  const showLabel = (p as Partial<{ showLabel: boolean }>).showLabel ?? true;
  const containerLabel = p.label ?? "Tags";

  return (
    <div style={{ width: 280 }}>
      <fieldset
        aria-label={!showLabel ? containerLabel : undefined}
        style={{ border: "none", margin: 0, padding: 0 }}
      >
        {showLabel && (
          <legend
            style={{
              fontSize: 11,
              color: textColor,
              fontFamily,
              marginBottom: 6,
            }}
          >
            {containerLabel}
          </legend>
        )}

        {/* Use a semantic list (ul) with role="list" so listitems are valid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <ul
            id={`${uid}-list`}
            role="list"
            aria-label={containerLabel}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              padding: 10,
              background: "#111113",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 8,
              minHeight: 44,
              alignItems: "center",
              listStyle: "none",
              margin: 0,
            }}
          >
            {/* Tag tokens as list items */}
            {tags.map((t: string, i: number) => (
              <li
                key={i}
                role="listitem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 8px",
                  borderRadius: br,
                  background: `rgba(${rgb},.1)`,
                  border: `1px solid rgba(${rgb},.22)`,
                  fontSize: 11,
                  color: lighten(col),
                  fontFamily,
                }}
              >
                <span>{t}</span>
                {p.removable && (
                  <button
                    id={`${uid}-remove-${i}`}
                    type="button"
                    onClick={() => remove(i)}
                    aria-label={`Remove ${t}`}
                    ref={i === tags.length - 1 ? lastRemoveRef : undefined}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 4,
                      margin: 0,
                      cursor: "pointer",
                      color: "rgba(255,255,255,.7)",
                      fontSize: 10,
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}

            {/* Input as the last item in the list for consistent reading order */}
            <li
              style={{
                display: "inline-flex",
                alignItems: "center",
                minWidth: 80,
                flex: 1,
                listStyle: "none",
              }}
            >
              <input
                ref={inputRef}
                id={`${uid}-input`}
                placeholder={p.placeholder}
                value={inp}
                aria-label={!showLabel ? containerLabel : undefined}
                aria-describedby={p.hint ? `${uid}-hint` : undefined}
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: 12,
                  color: textColor,
                  fontFamily,
                  minWidth: 80,
                  flex: 1,
                  padding: 4,
                }}
                onChange={(e) => setInp(e.target.value)}
                onKeyDown={onInputKeyDown}
              />
            </li>
          </ul>
        </div>

        {/* Hint */}
        {p.hint && (
          <div
            id={`${uid}-hint`}
            style={{
              marginTop: 6,
              fontSize: 11,
              color: "rgba(240,237,232,.22)",
              fontFamily,
            }}
          >
            {p.hint}
          </div>
        )}

        {/* Polite live region for additions/removals */}
        <div
          ref={liveRef}
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
      </fieldset>
    </div>
  );
}
