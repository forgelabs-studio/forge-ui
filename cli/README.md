# @forgelabs-studio/ui

Spectrum-aware, motion-first React component library.  
Configure visually in the playground — install with one command — own the generated files.

**[→ Open the playground](https://forgelabs.studio)**

## Quick start
```bash
npx @forgelabs-studio/ui init
```

This creates `forge.config.json` and `components/forge/forge-tokens.css` in your project.

Import the tokens in your root layout:
```tsx
import '@/components/forge/forge-tokens.css'
```

## Add a component

Configure any component visually at [forgelabs.studio](https://forgelabs.studio) and copy the generated command, or add with defaults:
```bash
npx @forgelabs-studio/ui add button --color=#7F77DD --variant=glow
```

This writes two files into your project:
```
components/forge/ForgeButton.tsx
components/forge/ForgeButton.css
```

You own these files. Edit them freely.

## CLI reference

| Command | Description |
|---------|-------------|
| `npx @forgelabs-studio/ui init` | Create config and tokens file |
| `npx @forgelabs-studio/ui add <component>` | Add a component |
| `npx @forgelabs-studio/ui list` | List all available and installed components |
| `npx @forgelabs-studio/ui update <component>` | Regenerate with original config |
| `npx @forgelabs-studio/ui remove <component>` | Remove component files |

## Flags

| Flag | Description |
|------|-------------|
| `--color` | Primary hex colour — derives all states |
| `--variant` | Component variant |
| `--size` | Size preset (sm, md, lg, xl) |
| `--radius` | Border radius in px |
| `--hover` | Hover effect (lift, scale, glow, none) |
| `--animation` | Click animation (ripple, scale, bounce, none) |
| `--shadow` | Shadow style (glow, soft, hard, none) |

## Components

**Primitives:** Button, Card, Input, Badge, Toggle, Select, Checkbox, Radio, Slider, Textarea, Avatar, StatCard, TagInput, DatePicker

**Motion:** Spinner, FadeUp, Ticker, MorphBlob, CountUp

**Charts:** BarChart, LineChart, Donut, Progress, Sparkline  
*Note: Chart.js is required as a peer dependency. Add it to your layout via CDN:*
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

**Navigation:** Command, Navbar, Breadcrumb, Pagination, SideNav, Tabs

**Overlay:** Modal, Toast, Tooltip, Dropdown, Drawer

**Feedback:** Skeleton, Alert, Stepper, Accordion

**Data:** Table

## Design tokens

Override any token in your globals to retheme everything:
```css
:root {
  --forge-purple: #5B5BF0;
  --forge-bg:     #06060a;
  --forge-font:   'Geist', sans-serif;
}
```

## Philosophy

Most component libraries ship as a black box. FORGE.ui uses the shadcn model — the files live in your project and belong to you — but adds a visual playground that pre-configures everything before copying, and a config file that tracks what's installed so updates work cleanly later.

## Licence

MIT
