"use client";
import type React from "react";
import { usePlaygroundStore } from "@/store/playground";
import type { ComponentProps } from "@/lib/types";
import ButtonRenderer from "./renderers/ButtonRenderer";
import CardRenderer from "./renderers/CardRenderer";
import InputRenderer from "./renderers/InputRenderer";
import BadgeRenderer from "./renderers/BadgeRenderer";
import ToggleRenderer from "./renderers/ToggleRenderer";
import SelectRenderer from "./renderers/SelectRenderer";
import CheckboxRenderer from "./renderers/CheckboxRenderer";
import RadioRenderer from "./renderers/RadioRenderer";
import SliderRenderer from "./renderers/SliderRenderer";
import TextareaRenderer from "./renderers/TextareaRenderer";
import AvatarRenderer from "./renderers/AvatarRenderer";
import StatCardRenderer from "./renderers/StatCardRenderer";
import TagInputRenderer from "./renderers/TagInputRenderer";
import DatePickerRenderer from "./renderers/DatePickerRenderer";
import SpinnerRenderer from "./renderers/SpinnerRenderer";
import FadeUpRenderer from "./renderers/FadeUpRenderer";
import TickerRenderer from "./renderers/TickerRenderer";
import MorphBlobRenderer from "./renderers/MorphBlobRenderer";
import CountUpRenderer from "./renderers/CountUpRenderer";
import BarChartRenderer from "./renderers/BarChartRenderer";
import LineChartRenderer from "./renderers/LineChartRenderer";
import DonutRenderer from "./renderers/DonutRenderer";
import ProgressRenderer from "./renderers/ProgressRenderer";
import SparklineRenderer from "./renderers/SparklineRenderer";
import CmdPaletteRenderer from "./renderers/CmdPaletteRenderer";
import NavbarRenderer from "./renderers/NavbarRenderer";
import BreadcrumbRenderer from "./renderers/BreadcrumbRenderer";
import PaginationRenderer from "./renderers/PaginationRenderer";
import SideNavRenderer from "./renderers/SideNavRenderer";
import TabsRenderer from "./renderers/TabsRenderer";
import ModalRenderer from "./renderers/ModalRenderer";
import ToastRenderer from "./renderers/ToastRenderer";
import TooltipRenderer from "./renderers/TooltipRenderer";
import DropdownRenderer from "./renderers/DropdownRenderer";
import DrawerRenderer from "./renderers/DrawerRenderer";
import SkeletonRenderer from "./renderers/SkeletonRenderer";
import AlertRenderer from "./renderers/AlertRenderer";
import StepperRenderer from "./renderers/StepperRenderer";
import AccordionRenderer from "./renderers/AccordionRenderer";
import TableRenderer from "./renderers/TableRenderer";

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
  return <Renderer props={props[activeComponent] ?? {}} />;
}
