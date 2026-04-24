"use client";
import React, { Suspense } from "react";
import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import SkeletonRenderer from "./renderers/SkeletonRenderer";

const ButtonRenderer = React.lazy(() => import("./renderers/ButtonRenderer"));
const CardRenderer = React.lazy(() => import("./renderers/CardRenderer"));
const InputRenderer = React.lazy(() => import("./renderers/InputRenderer"));
const BadgeRenderer = React.lazy(() => import("./renderers/BadgeRenderer"));
const ToggleRenderer = React.lazy(() => import("./renderers/ToggleRenderer"));
const SelectRenderer = React.lazy(() => import("./renderers/SelectRenderer"));
const CheckboxRenderer = React.lazy(() => import("./renderers/CheckboxRenderer"));
const RadioRenderer = React.lazy(() => import("./renderers/RadioRenderer"));
const SliderRenderer = React.lazy(() => import("./renderers/SliderRenderer"));
const TextareaRenderer = React.lazy(() => import("./renderers/TextareaRenderer"));
const AvatarRenderer = React.lazy(() => import("./renderers/AvatarRenderer"));
const StatCardRenderer = React.lazy(() => import("./renderers/StatCardRenderer"));
const TagInputRenderer = React.lazy(() => import("./renderers/TagInputRenderer"));
const DatePickerRenderer = React.lazy(() => import("./renderers/DatePickerRenderer"));
const SpinnerRenderer = React.lazy(() => import("./renderers/SpinnerRenderer"));
const FadeUpRenderer = React.lazy(() => import("./renderers/FadeUpRenderer"));
const TickerRenderer = React.lazy(() => import("./renderers/TickerRenderer"));
const MorphBlobRenderer = React.lazy(() => import("./renderers/MorphBlobRenderer"));
const CountUpRenderer = React.lazy(() => import("./renderers/CountUpRenderer"));
const BarChartRenderer = React.lazy(() => import("./renderers/BarChartRenderer"));
const LineChartRenderer = React.lazy(() => import("./renderers/LineChartRenderer"));
const DonutRenderer = React.lazy(() => import("./renderers/DonutRenderer"));
const ProgressRenderer = React.lazy(() => import("./renderers/ProgressRenderer"));
const SparklineRenderer = React.lazy(() => import("./renderers/SparklineRenderer"));
const CmdPaletteRenderer = React.lazy(() => import("./renderers/CmdPaletteRenderer"));
const NavbarRenderer = React.lazy(() => import("./renderers/NavbarRenderer"));
const BreadcrumbRenderer = React.lazy(() => import("./renderers/BreadcrumbRenderer"));
const PaginationRenderer = React.lazy(() => import("./renderers/PaginationRenderer"));
const SideNavRenderer = React.lazy(() => import("./renderers/SideNavRenderer"));
const TabsRenderer = React.lazy(() => import("./renderers/TabsRenderer"));
const ModalRenderer = React.lazy(() => import("./renderers/ModalRenderer"));
const ToastRenderer = React.lazy(() => import("./renderers/ToastRenderer"));
const TooltipRenderer = React.lazy(() => import("./renderers/TooltipRenderer"));
const DropdownRenderer = React.lazy(() => import("./renderers/DropdownRenderer"));
const DrawerRenderer = React.lazy(() => import("./renderers/DrawerRenderer"));
const AlertRenderer = React.lazy(() => import("./renderers/AlertRenderer"));
const StepperRenderer = React.lazy(() => import("./renderers/StepperRenderer"));
const AccordionRenderer = React.lazy(() => import("./renderers/AccordionRenderer"));
const TableRenderer = React.lazy(() => import("./renderers/TableRenderer"));

// Each renderer is typed internally with its specific props interface.
// The dispatch map uses ComponentProps as the boundary type — a single cast here
// is intentional. Per-renderer generics would complicate dispatch without adding value.
const RENDERERS = {
  button: ButtonRenderer,
  card: CardRenderer,
  input: InputRenderer,
  badge: BadgeRenderer,
  toggle: ToggleRenderer,
  select: SelectRenderer,
  checkbox: CheckboxRenderer,
  radio: RadioRenderer,
  slider: SliderRenderer,
  textarea: TextareaRenderer,
  avatar: AvatarRenderer,
  statcard: StatCardRenderer,
  taginput: TagInputRenderer,
  datepicker: DatePickerRenderer,
  spinner: SpinnerRenderer,
  fadeup: FadeUpRenderer,
  ticker: TickerRenderer,
  morphblob: MorphBlobRenderer,
  countup: CountUpRenderer,
  barchart: BarChartRenderer,
  linechart: LineChartRenderer,
  donut: DonutRenderer,
  progress: ProgressRenderer,
  sparkline: SparklineRenderer,
  cmdpalette: CmdPaletteRenderer,
  navbar: NavbarRenderer,
  breadcrumb: BreadcrumbRenderer,
  pagination: PaginationRenderer,
  sidenav: SideNavRenderer,
  tabs: TabsRenderer,
  modal: ModalRenderer,
  toast: ToastRenderer,
  tooltip: TooltipRenderer,
  dropdown: DropdownRenderer,
  drawer: DrawerRenderer,
  skeleton: SkeletonRenderer,
  alert: AlertRenderer,
  stepper: StepperRenderer,
  accordion: AccordionRenderer,
  table: TableRenderer,
} as unknown as Record<string, React.ComponentType<{ props: ComponentProps }>>;

export default function RendererDispatch() {
  const { activeComponent, props } = usePlaygroundStore();
  const Renderer = RENDERERS[activeComponent];
  if (!Renderer)
    return (
      <div style={{ color: "var(--hint)", fontSize: 12 }}>
        No renderer for {activeComponent}
      </div>
    );
  return (
    <Suspense
      fallback={
        <SkeletonRenderer props={{ animated: true, variant: "card", label: "" }} />
      }
    >
      <Renderer props={props[activeComponent] ?? {}} />
    </Suspense>
  );
}
