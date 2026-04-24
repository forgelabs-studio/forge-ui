// Shared prop types used across the playground
import type { ComponentId } from "./registry";

import { ChartType } from "chart.js";
export type ButtonVariant =
  | "glow"
  | "solid"
  | "ghost"
  | "outline"
  | "soft"
  | "spectrum";
export type SizePreset = "sm" | "md" | "lg" | "xl";
export type HoverEffect = "lift" | "scale" | "glow" | "none";
export type ClickAnim = "ripple" | "scale" | "bounce" | "none";
export type Shadow = "glow" | "soft" | "hard" | "none";
export type IconPos = "left" | "right";
export type Speed = "slow" | "normal" | "fast";
export type DeltaDir = "up" | "down";
export type Status = "online" | "away" | "busy" | "offline";
export type Shape = "circle" | "squircle" | "square";
export type RadiusScale = "sharp" | "default" | "rounded";

export interface ButtonProps {
  text: string;
  variant: ButtonVariant;
  size: SizePreset;
  color: string;
  textSize: number;
  weight: "300" | "400" | "500";
  radius: number;
  paddingX: number;
  paddingY: number;
  icon: string;
  iconPos: IconPos;
  hoverEffect: HoverEffect;
  clickAnim: ClickAnim;
  shadow: Shadow;
  letterSpacing: string;
  uppercase: boolean;
  fullWidth: boolean;
  disabled: boolean;
}

export interface CardProps {
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  color: string;
  radius: number;
  padding: number;
  showTag: boolean;
  showBadge: boolean;
  width: number;
}

export interface BadgeProps {
  text: string;
  color: string;
  variant: "pill" | "tag" | "square";
  size: SizePreset;
  showDot: boolean;
  dotPulse: boolean;
  uppercase: boolean;
}

export interface AccordionProps {
  color: string;
  radius?: number;
  items?: string[];
  bodies?: string[];
  item1?: string;
  item2?: string;
  item3?: string;
  body1?: string;
  body2?: string;
  body3?: string;
}

export interface AlertProps {
  color: string;
  variant: "success" | "error" | "warning" | "info";
  showIcon: boolean;
  title: string;
  message: string;
  showAction: boolean;
  actionText: string;
  showClose: boolean;
}

export interface AvatarProps {
  name: string;
  color: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  shape: "circle" | "squircle" | "square";
  showRing: boolean;
  initials: string;
  showStatus: boolean;
  status: Status;
}

export interface BarChartProps {
  color: string;
  color2?: string;
  radius?: number;
  animated: boolean;
  showLegend: boolean;
  showGrid: boolean;
  data?: string[];
  title: string;
}

export interface BreadcrumbProps {
  label: string;
  color: string;
  items: string;
  showHome: boolean;
  separator: string;
}

export interface CheckboxProps {
  color: string;
  size: SizePreset;
  variant: "round" | "square" | "default";
  items?: string[] | string;
  checked: boolean;
  label?: string;
}

export interface CmdPaletteProps {
  color: string;
  items?: string[];
  placeholder: string;
  showCategories: boolean;
  showShortcuts: boolean;
}

export interface CountUpProps {
  color: string;
  from?: number;
  to?: number;
  duration?: number;
  size: SizePreset;
  prefix?: string;
  suffix?: string;
  showLabel: boolean;
  label?: string;
}

export interface DatePickerProps {
  color: string;
  selectedDate?: string;
  showLabel: boolean;
  label?: string;
  radius?: number;
}

export interface DonutProps {
  color: string;
  data?: string[];
  thickness: number;
  animated: boolean;
  showCenter: boolean;
  centerText?: string;
  showLabels: boolean;
  title?: string;
}

export interface DrawerProps {
  color: string;
  width?: number;
  showOverlay: boolean;
  side: "left" | "right";
  title: string;
  body?: string;
}

export interface DropdownProps {
  items?: string[] | string;
  dangerItems?: boolean[];
  label: string;
  showDivider: boolean;
}

export interface FadeUpProps {
  ariaLabel: string;
  color: string;
  text?: string;
  duration?: number;
  stagger: boolean;
}

export interface InputProps {
  color: string;
  size: SizePreset;
  state: "default" | "error" | "success" | "disabled";
  radius?: number;
  showLabel: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  showHint: boolean;
}

export interface LineChartProps {
  color: string;
  color2?: string;
  data?: string[];
  tension: number;
  fill: boolean;
  animated: boolean;
  showGrid: boolean;
  showDots: boolean;
  title?: string;
}

export interface ModalProps {
  color: string;
  radius?: number;
  title: string;
  showClose: boolean;
  body?: string;
  showFooter: boolean;
  secondaryBtn?: string;
  primaryBtn?: string;
}

export interface MorphBlobProps {
  ariaDescription: string;
  ariaLabel: string;
  color: string;
  speed: Speed;
  gradient: boolean;
  color2?: string;
  size?: number;
  opacity?: number;
  blur?: number;
}

export interface NavbarProps {
  label: string;
  color: string;
  variant: "dark" | "light";
  links?: string[] | string;
  showLogo: boolean;
  brand?: string;
  showCta: boolean;
  ctaText?: string;
}

export interface PaginationProps {
  label: string;
  color: string;
  total?: number;
  perPage?: number;
  current?: number;
  showArrows: boolean;
  showCount: boolean;
}

export interface ProgressProps {
  color: string;
  showLabel: boolean;
  label?: string;
  showValue: boolean;
  value: number;
  height: number;
  radius: number;
  striped: boolean;
}

export interface RadioProps {
  label: undefined;
  color: string;
  size: SizePreset;
  selected?: number;
  options?: string[] | string;
  layout: "vertical" | "horizontal";
}

export interface SelectProps {
  color: string;
  size: SizePreset;
  options?: string[] | string;
  radius?: number;
  showLabel: boolean;
  label?: string;
  placeholder?: string;
  hoverColor?: string;
}

export interface SideNavProps {
  color: string;
  collapsed?: boolean;
  active?: number;
  items?: string[] | string;
  brand?: string;
  showIcons: boolean;
}

export interface SkeletonProps {
  label: string;
  radius?: number;
  animated: boolean;
  variant: "card" | "text" | "profile" | "table";
  lines?: number;
}

export interface SliderProps {
  color: string;
  value?: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue: boolean;
  label?: string;
}

export interface SparklineProps {
  color: string;
  data?: string[];
  height?: number;
  variant?: ChartType;
  fill: boolean;
  showDot: boolean;
  animated: boolean;
}

export interface SpinnerProps {
  color: string;
  size: SizePreset;
  speed: Speed;
  variant: "ring" | "dots" | "bars" | "orbit" | "pulse";
  showLabel: boolean;
  label?: string;
}

export interface StatCardProps {
  color: string;
  showIcon: boolean;
  icon?: string;
  title: string;
  value: string;
  showDelta: boolean;
  delta?: string;
  deltaDir: DeltaDir;
  showBar: boolean;
  barValue?: number;
}

export interface StepperProps {
  label: string;
  color: string;
  steps?: string[];
  step1?: string;
  step2?: string;
  step3?: string;
  step4?: string;
  descs?: string[];
  current?: number;
  variant: "vertical" | "horizontal";
  showDesc: boolean;
}

export interface TableProps {
  color: string;
  columns?: string[];
  caption?: string;
  showHover: boolean;
  showStripes: boolean;
  compact: boolean;
}

export interface TabsProps {
  color: string;
  tabs?: string[];
  tab1?: string;
  tab2?: string;
  tab3?: string;
  tab4?: string;
  active?: number;
  variant: "underline" | "pill" | "line";
}

export interface TagInputProps {
  hint: import("react").JSX.Element;
  label: string;
  color: string;
  tags?: string[] | string;
  placeholder?: string;
  removable: boolean;
  variant: "pill" | "square";
}

export interface TextareaProps {
  state: string;
  color: string;
  showLabel: boolean;
  showCount: boolean;
  label?: string;
  placeholder?: string;
  maxLength: number;
  rows: number;
  radius?: number;
  showHint: boolean;
  hint?: string;
}

export interface TickerProps {
  ariaLabel: string;
  label: string;
  color: string;
  speed: Speed;
  items?: string[] | string;
  pauseOnHover: boolean;
  gap: number;
  separator?: string;
}

export interface ToastProps {
  variant: "success" | "error" | "warning" | "info";
  showIcon: boolean;
  title: string;
  message: string;
  showClose: boolean;
}

export interface ToggleProps {
  color: string;
  size: SizePreset;
  checked: boolean;
  showLabel: boolean;
  label?: string;
  labelPos: "left" | "right";
}

export interface TooltipProps {
  color: string;
  variant: "dark" | "light";
  text?: string;
  tip?: string;
}

// Loose union type used at the RendererDispatch boundary.
// Individual renderers use their specific interfaces above.
export type ComponentProps = Record<
  string,
  string | number | boolean | string[] | boolean[] | undefined
>;

export type PropDefaultsMap = Record<ComponentId, ComponentProps>;
