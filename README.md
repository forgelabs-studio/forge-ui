# FORGE.labs

Design engineering tooling. Open source, MIT licensed, zero runtime dependency.

**[→ forgelabs.studio](https://forgelabs.studio)** · **[→ Playground](https://forgelabs.studio/playground)** · **[→ npm](https://www.npmjs.com/org/forgelabs-studio)**

---

## What this is

A monorepo for the FORGE.labs ecosystem. The defining idea: users configure visually, install with one CLI command, and own the generated files with no runtime dependency on any FORGE package.

| Package | npm | Status |
|---------|-----|--------|
| FORGE.ui | `@forgelabs-studio/ui` | v0.3.0 — shipped |
| FORGE.motion | `@forgelabs-studio/motion` | In development |
| FORGE.tokens | `@forgelabs-studio/tokens` | Planned |

---

## Repo structure

```
forge-ui/
├── app/
│   ├── layout.tsx              # Root layout — html/body only
│   ├── (site)/                 # Marketing site (forgelabs.studio)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── (playground)/           # Component playground
│       ├── layout.tsx
│       ├── playground/
│       ├── docs/
│       └── how-it-works/
├── components/
│   ├── site/                   # Marketing site sections
│   ├── forge/                  # ForgeUI components (CLI-generated, self-owned)
│   ├── playground/             # Playground UI (renderers, props panels)
│   └── layout/                 # Shared layout (Topbar)
├── packages/
│   └── shared/                 # Shared registry + types across CLI packages
├── cli/                        # @forgelabs-studio/ui CLI
│   └── src/
│       ├── index.ts            # CLI entrypoint
│       ├── commands/           # add, init, list, update, remove
│       ├── generators/         # 40 per-component file generators
│       ├── generate.ts         # Generator dispatcher
│       └── flags.ts            # Flag parser
├── lib/                        # Playground utilities
│   ├── registry.ts             # Component registry — source of truth
│   ├── types.ts                # Component prop interfaces
│   ├── cli-builder.ts          # Builds CLI command string from playground state
│   └── utils.ts                # Shared utils
└── store/                      # Zustand playground state
```

---

## FORGE.ui — 40 components

**Primitives:** Button, Card, Input, Badge, Toggle, Select, Checkbox, Radio, Slider, Textarea, Avatar, StatCard, TagInput, DatePicker

**Motion:** Spinner, FadeUp, Ticker, MorphBlob, CountUp

**Charts:** BarChart, LineChart, Donut, Progress, Sparkline
*Chart.js is required as a peer dependency:*
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

**Navigation:** Command, Navbar, Breadcrumb, Pagination, SideNav, Tabs

**Overlay:** Modal, Toast, Tooltip, Dropdown, Drawer

**Feedback:** Skeleton, Alert, Stepper, Accordion

**Data:** Table

---

## Running locally

```bash
npm install
npm run dev
```

Playground at `http://localhost:3000/playground`. Marketing site at `http://localhost:3000`.

## CLI development

```bash
cd cli
npm install
npm run build
npm link
```

Then `npx @forgelabs-studio/ui` resolves to your local build.

---

## Contributing

Open an issue before opening a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

## Licence

MIT · Built by [Talia](https://forgelabs.studio)
