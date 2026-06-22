import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import type { ComponentId } from "@forgelabs-studio/shared";
import type { ForgeConfig } from "./types.js";
import { generateButton } from "./generators/button.js";
import { generateBadge } from "./generators/badge.js";
import { generateAccordion } from "./generators/accordion.js";
import { generateAlert } from "./generators/alert.js";
import { generateAscii } from "./generators/ascii.js";
import { generateAvatar } from "./generators/avatar.js";
import { generateBarChart } from "./generators/barchart.js";
import { generateBreadcrumb } from "./generators/breadcrumb.js";
import { generateCard } from "./generators/card.js";
import { generateCheckbox } from "./generators/checkbox.js";
import { generateCommandPalette } from "./generators/cmdpalette.js";
import { generateCountUp } from "./generators/countup.js";
import { generateDatePicker } from "./generators/datepicker.js";
import { generateDonut } from "./generators/donut.js";
import { generateDrawer } from "./generators/drawer.js";
import { generateDropdown } from "./generators/dropdown.js";
import { generateFadeUp } from "./generators/fadeup.js";
import { generateInput } from "./generators/input.js";
import { generateLineChart } from "./generators/linechart.js";
import { generateModal } from "./generators/modal.js";
import { generateNavbar } from "./generators/navbar.js";
import { generateMorphBlob } from "./generators/morphblob.js";
import { generatePagination } from "./generators/pagination.js";
import { generateProgress } from "./generators/progress.js";
import { generateRadio } from "./generators/radio.js";
import { generateSelect } from "./generators/select.js";
import { generateSideNav } from "./generators/sidenav.js";
import { generateSkeleton } from "./generators/skeleton.js";
import { generateSlider } from "./generators/slider.js";
import { generateSparkline } from "./generators/sparkline.js";
import { generateSpinner } from "./generators/spinner.js";
import { generateStatCard } from "./generators/statcard.js";
import { generateStepper } from "./generators/stepper.js";
import { generateTable } from "./generators/table.js";
import { generateTagInput } from "./generators/taginput.js";
import { generateTextarea } from "./generators/textarea.js";
import { generateTicker } from "./generators/ticker.js";
import { generateToast } from "./generators/toast.js";
import { generateToggle } from "./generators/toggle.js";
import { generateTooltip } from "./generators/tooltip.js";
import { generateTabs } from "./generators/tabs.js";

type ComponentGenerator = (
  props: Record<string, unknown>,
) => { tsx: string; css: string };

const GENERATORS: Record<ComponentId, ComponentGenerator> = {
  accordion: generateAccordion,
  alert: generateAlert,
  ascii: generateAscii,
  avatar: generateAvatar,
  badge: generateBadge,
  barchart: generateBarChart,
  breadcrumb: generateBreadcrumb,
  button: generateButton,
  card: generateCard,
  checkbox: generateCheckbox,
  cmdpalette: generateCommandPalette,
  countup: generateCountUp,
  datepicker: generateDatePicker,
  donut: generateDonut,
  drawer: generateDrawer,
  dropdown: generateDropdown,
  fadeup: generateFadeUp,
  input: generateInput,
  linechart: generateLineChart,
  modal: generateModal,
  morphblob: generateMorphBlob,
  navbar: generateNavbar,
  pagination: generatePagination,
  progress: generateProgress,
  radio: generateRadio,
  select: generateSelect,
  sidenav: generateSideNav,
  skeleton: generateSkeleton,
  slider: generateSlider,
  sparkline: generateSparkline,
  spinner: generateSpinner,
  statcard: generateStatCard,
  stepper: generateStepper,
  table: generateTable,
  tabs: generateTabs,
  taginput: generateTagInput,
  textarea: generateTextarea,
  ticker: generateTicker,
  toast: generateToast,
  toggle: generateToggle,
  tooltip: generateTooltip,
};

// Main generate function — called by the add and update commands.
export async function generateComponent(
  componentId: string,
  displayName: string,
  props: Record<string, unknown>,
  config: ForgeConfig,
): Promise<void> {
  const outputDir = path.join(process.cwd(), config.output);
  await fs.ensureDir(outputDir);

  let tsx: string;
  let css: string;

  const generator = GENERATORS[componentId.toLowerCase() as ComponentId];

  if (generator) {
    ({ tsx, css } = generator(props));
  } else {
    throw new Error(`No generator is registered for ${displayName}`);
  }

  const tsxPath = path.join(outputDir, `${displayName}.tsx`);
  const cssPath = path.join(outputDir, `${displayName}.css`);

  await fs.writeFile(tsxPath, tsx, "utf8");
  await fs.writeFile(cssPath, css, "utf8");

  console.log(pc.green("  ✓") + ` ${displayName}.tsx`);
  console.log(pc.green("  ✓") + ` ${displayName}.css`);
}
