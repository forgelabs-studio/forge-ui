"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ForgeTable } from "@/components/forge/ForgeTable";
import { ForgePagination } from "@/components/forge/ForgePagination";
import { ForgeDonut } from "@/components/forge/ForgeDonut";
import { ForgeBreadcrumb } from "@/components/forge/ForgeBreadcrumb";
import { ForgeAccordion } from "@/components/forge/ForgeAccordion";
import { ForgeLineChart } from "@/components/forge/ForgeLineChart";
import { ForgeToggle } from "@/components/forge/ForgeToggle";
import { ForgeSkeleton } from "@/components/forge/ForgeSkeleton";
import { ForgeTooltip } from "@/components/forge/ForgeTooltip";
import { ForgeButton } from "@/components/forge/ForgeButton";

const TABLE_COLS = ["Name", "Role", "Status", "Joined"];

const ALL_ROWS: (string | number)[][] = [
  ["Alice Chen", "Engineer", "Active", "Jan 2024"],
  ["Ben Marlow", "Designer", "Active", "Mar 2024"],
  ["Clara Stone", "PM", "Pending", "Jun 2024"],
  ["Daniel Park", "Engineer", "Active", "Aug 2024"],
  ["Eva Mitchell", "Designer", "Inactive", "Sep 2024"],
  ["Felix Rao", "PM", "Active", "Oct 2024"],
  ["Grace Kim", "Engineer", "Pending", "Nov 2024"],
  ["Hugo Levin", "Designer", "Active", "Jan 2025"],
  ["Iris Nakamura", "PM", "Active", "Feb 2025"],
];

const DONUT_DATA = [
  { label: "Primitives", value: 14 },
  { label: "Motion", value: 5 },
  { label: "Charts", value: 5 },
  { label: "Navigation", value: 6 },
  { label: "Overlay", value: 5 },
  { label: "Feedback", value: 4 },
  { label: "Data", value: 1 },
];

const LINE_LABELS = [
  "Wk 1",
  "Wk 2",
  "Wk 3",
  "Wk 4",
  "Wk 5",
  "Wk 6",
  "Wk 7",
  "Wk 8",
];

const LINE_SERIES = [
  {
    label: "downloads",
    data: [12, 19, 15, 28, 34, 29, 41, 48],
    color: "#7F77DD",
  },
];

const CRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/playground" },
  { label: "ForgeTable" },
];

function Cell({
  label,
  span2 = false,
  noHover = false,
  children,
}: {
  label: string;
  id?: string;
  span2?: boolean;
  noHover?: boolean;
  children: React.ReactNode;
}) {
  const [on, setOn] = useState(false);

  return (
    <div
      style={{
        background: on && !noHover ? "var(--bg3)" : "var(--bg2)",
        padding: 24,
        minHeight: span2 ? 260 : 200,
        position: "relative",
        overflow: "hidden",
        cursor: noHover ? "default" : "pointer",
        gridColumn: span2 ? "span 2" : undefined,
        transition: "background 0.15s",
        boxShadow:
          on && !noHover
            ? "inset 0 0 0 1px rgba(255,255,255,0.09)"
            : "inset 0 0 0 1px transparent",
      }}
      onMouseEnter={() => !noHover && setOn(true)}
      onMouseLeave={() => !noHover && setOn(false)}
    >
      {children}

      {!noHover && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            fontFamily: "var(--mono)",
            fontSize: 11,
            background: "var(--bg4)",
            color: "var(--text)",
            padding: "4px 10px",
            borderRadius: 4,
            opacity: on ? 1 : 0,
            transition: "opacity 0.2s",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default function ComponentShowcase() {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.04, rootMargin: "0px 0px -40px 0px" },
    );

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    accordionRef.current
      ?.querySelector<HTMLButtonElement>(".forge-accordion__trigger")
      ?.click();
  }, []);

  const pageRows = ALL_ROWS.slice((page - 1) * 3, page * 3);

  return (
    <section
      ref={sectionRef}
      className="border-t border-[var(--line)]"
      style={{ padding: "120px 0" }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: 40 }}>
          <span className="section-tag">more components</span>

          <h2
            style={{
              fontSize: "clamp(28px,3vw,42px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            Everything you need to build polished interfaces.
          </h2>
        </div>

        <div
          className="reveal reveal-delay-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Cell label="ForgeTable" span2>
            <ForgeTable
              columns={TABLE_COLS}
              rows={pageRows}
              color="#7F77DD"
              showStripes
              showHover
              compact
            />
          </Cell>

          <Cell label="ForgeDonut">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ForgeDonut
                data={DONUT_DATA}
                color="#7F77DD"
                showLabels={false}
                showCenter
                centerText="40"
                size={140}
                thickness={22}
              />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--hint)",
                  letterSpacing: "0.06em",
                }}
              >
                components by group
              </span>
            </div>
          </Cell>

          <Cell label="ForgePagination">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 152,
              }}
            >
              <ForgePagination
                total={9}
                perPage={3}
                color="#7F77DD"
                showCount
                showArrows
                page={page}
                onPageChange={setPage}
              />
            </div>
          </Cell>

          <Cell label="ForgeBreadcrumb">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 152,
              }}
            >
              <ForgeBreadcrumb
                items={CRUMB_ITEMS}
                color="#7F77DD"
                separator="/"
              />
            </div>
          </Cell>

          <Cell label="ForgeAccordion">
            <div ref={accordionRef}>
              <ForgeAccordion
                items={["ForgeAccordion"]}
                bodies={[
                  "Expandable sections with smooth animation. Configure timing, colour, and border in the playground.",
                ]}
                color="#7F77DD"
                radius={8}
              />
            </div>
          </Cell>

          <Cell label="ForgeLineChart" span2>
            <ForgeLineChart
              title="npm downloads"
              labels={LINE_LABELS}
              series={LINE_SERIES}
              color="#7F77DD"
              fill
              showGrid
              showDots
              height={180}
            />
          </Cell>

          <Cell label="ForgeToggle">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--hint)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                preferences
              </span>

              <ForgeToggle
                label="Spectrum aware"
                color="#7F77DD"
                size="md"
                showLabel
              />
            </div>
          </Cell>

          <Cell label="ForgeSkeleton">
            <ForgeSkeleton variant="profile" animated />
          </Cell>

          <Cell label="ForgeTooltip">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 152,
              }}
            >
              <ForgeTooltip
                tip="Tooltip component. Configurable, copyable, yours."
                color="#7F77DD"
                position="bottom"
              >
                <ForgeButton variant="ghost" color="#7F77DD">
                  hover me
                </ForgeButton>
              </ForgeTooltip>
            </div>
          </Cell>

          <Cell label="" noHover>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 152,
              }}
            >
              <a
                href="/playground"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                browse all components →
              </a>
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}
