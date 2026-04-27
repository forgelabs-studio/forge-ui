"use client";
import { usePlaygroundStore } from "@/store/playground";
import { PROP_DEFAULTS } from "@/lib/prop-defaults";
import { Grp, Pills, Row, Swatches } from "./props/controls";
import { lazy, Suspense } from "react";

const PROP_PANELS = {
  accordion: lazy(() => import("./props/AccordionProps")),
  alert: lazy(() => import("./props/AlertProps")),
  avatar: lazy(() => import("./props/AvatarProps")),
  badge: lazy(() => import("./props/BadgeProps")),
  barchart: lazy(() => import("./props/BarChartProps")),
  breadcrumb: lazy(() => import("./props/BreadcrumbProps")),
  button: lazy(() => import("./props/ButtonProps")),
  card: lazy(() => import("./props/CardProps")),
  checkbox: lazy(() => import("./props/CheckboxProps")),
  cmdpalete: lazy(() => import("./props/CmdPaletteProps")),
  countup: lazy(() => import("./props/CountUpProps")),
  datepicker: lazy(() => import("./props/DatePickerProps")),
  donut: lazy(() => import("./props/DonutProps")),
  drawer: lazy(() => import("./props/DrawerProps")),
  dropdown: lazy(() => import("./props/DropdownProps")),
  fadeup: lazy(() => import("./props/FadeupProps")),
  input: lazy(() => import("./props/InputProps")),
  linechart: lazy(() => import("./props/LineChartProps")),
  modal: lazy(() => import("./props/ModalProps")),
  morphblob: lazy(() => import("./props/MorphBlobProps")),
  navbar: lazy(() => import("./props/NavbarProps")),
  pagination: lazy(() => import("./props/PaginationProps")),
  progress: lazy(() => import("./props/ProgressProps")),
  radio: lazy(() => import("./props/RadioProps")),
  select: lazy(() => import("./props/SelectProps")),
  sidenav: lazy(() => import("./props/SidenavProps")),
  skeleton: lazy(() => import("./props/SkeletonProps")),
  slider: lazy(() => import("./props/SliderProps")),
  sparkline: lazy(() => import("./props/SparklineProps")),
  spinner: lazy(() => import("./props/SpinnerProps")),
  statcard: lazy(() => import("./props/StatcardProps")),
  stepper: lazy(() => import("./props/StepperProps")),
  table: lazy(() => import("./props/TableProps")),
  tabs: lazy(() => import("./props/TabsProps")),
  taginput: lazy(() => import("./props/TaginputProps")),
  textarea: lazy(() => import("./props/TextAreaProps")),
  ticker: lazy(() => import("./props/TickerProps")),
  toast: lazy(() => import("./props/ToastProps")),
  toggle: lazy(() => import("./props/ToggleProps")),
  tooltip: lazy(() => import("./props/TooltipProps")),
};

export default function PropsPanel() {
  const {
    resetComponent,
    activeComponent,
    globalFont,
    globalTextColor,
    globalRadius,
    setGlobalFont,
    setGlobalTextColor,
    setGlobalRadius,
  } = usePlaygroundStore();

  const meta = PROP_DEFAULTS[activeComponent];
  const displayName =
    activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1);

  const Panel = PROP_PANELS[activeComponent as keyof typeof PROP_PANELS];
  return (
    <div className="props-col">
      <div className="ph">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="ph-lbl">Properties</span>
          <span className="ph-name">{displayName}</span>
        </div>
        {meta && (
          <button
            type="button"
            className="ph-reset"
            onClick={() => resetComponent(activeComponent)}
          >
            ↺ Reset
          </button>
        )}
      </div>
      <div className="ps">
        <Grp title="Global tokens">
          <Row label="Font family">
            <select
              className="pi"
              title="Font family"
              value={globalFont}
              onChange={(e) => setGlobalFont(e.target.value)}
            >
              {[
                "Inter",
                "DM Sans",
                "Geist",
                "Manrope",
                "Plus Jakarta Sans",
                "Space Grotesk",
                "Sora",
                "system-ui",
              ].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Text colour">
            <Swatches value={globalTextColor} onChange={setGlobalTextColor} />
          </Row>
          <Row label="Radius scale">
            <Pills
              value={globalRadius}
              opts={["sharp", "default", "rounded"]}
              onChange={(v) =>
                setGlobalRadius(v as "sharp" | "default" | "rounded")
              }
            />
          </Row>
        </Grp>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            margin: "8px 0",
          }}
        />
        {Panel ? (
          <Suspense fallback={null}>
            <Panel />
          </Suspense>
        ) : (
          <div style={{ padding: 16, fontSize: 12, color: "var(--muted)" }}>
            No properties.
          </div>
        )}
      </div>
    </div>
  );
}
