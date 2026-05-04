# @forgelabs-studio/ui

Spectrum-aware React component generator. Configure visually in the playground, install with one command, and own the generated files.

**[→ Open the playground](https://forgelabs.studio/playground/ui)**

## Quick Start

```bash
npx @forgelabs-studio/ui init
```

This creates `forge.config.json` and `components/forge/forge-tokens.css` in your project.

Import the tokens in your root layout or global CSS entry:

```tsx
import '@/components/forge/forge-tokens.css'
```

## Add a Component

Configure any component visually and copy the generated command, or add one with defaults:

```bash
npx @forgelabs-studio/ui add button --color='#7F77DD' --variant='glow'
npx @forgelabs-studio/ui add button morphblob badge
```

This writes local files into your project:

```text
components/forge/ForgeButton.tsx
components/forge/ForgeButton.css
```

You own these files. Edit them freely.
`add` accepts multiple component ids in one command. Existing files or components already saved
in `forge.config.json` are skipped with a warning while the rest of the queue continues.

## CLI Reference

| Command | Description |
|---------|-------------|
| `npx @forgelabs-studio/ui init` | Create config and tokens file |
| `npx @forgelabs-studio/ui add <component...>` | Add one or more components |
| `npx @forgelabs-studio/ui list` | List available and installed components |
| `npx @forgelabs-studio/ui update <component>` | Regenerate with saved config |
| `npx @forgelabs-studio/ui remove <component>` | Remove component files |

## Common Flags

| Flag | Description |
|------|-------------|
| `--color` | Primary hex colour |
| `--variant` | Component variant |
| `--size` | Size preset |
| `--radius` | Border radius in px |
| `--hover` | Hover effect |
| `--animation` | Interaction animation |
| `--shadow` | Shadow style |

The playground emits the exact flag set for the selected component.

## Components

**Primitives:** Button, Card, Input, Badge, Toggle, Select, Checkbox, Radio, Slider, Textarea, Avatar, StatCard, TagInput, DatePicker

**Motion:** Spinner, FadeUp, Ticker, MorphBlob, CountUp

**Charts:** BarChart, LineChart, Donut, Progress, Sparkline

Chart components expect Chart.js to be available in the consuming app:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

**Navigation:** Command, Navbar, Breadcrumb, Pagination, SideNav, Tabs

**Overlay:** Modal, Toast, Tooltip, Dropdown, Drawer

**Feedback:** Skeleton, Alert, Stepper, Accordion

**Data:** Table

## Design Tokens

Override tokens in your globals to retheme generated components:

```css
:root {
  --forge-purple: #5B5BF0;
  --forge-bg: #06060a;
  --forge-font: 'Inter', sans-serif;
}
```

## Philosophy

FORGE.ui follows an ownership-first model: the CLI writes editable component files into your app instead of adding a runtime component library dependency.

## Licence

MIT
