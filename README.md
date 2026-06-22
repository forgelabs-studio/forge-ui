# FORGE.labs

Design engineering tooling. Open source, MIT licensed, ownership-first.

**[→ forgelabs.studio](https://forgelabs.studio)** · **[→ Playground](https://forgelabs.studio/playground)** · **[→ npm](https://www.npmjs.com/org/forgelabs-studio)**

---

## What This Is

FORGE.labs is a monorepo for visual playgrounds and CLIs that generate code you own. Configure components or motion presets visually, copy one command, and commit the generated files into your own app with no runtime dependency on FORGE packages.

| Package | npm | Status |
|---------|-----|--------|
| FORGE.ui | `@forgelabs-studio/ui` | v0.4.2 - shipped |
| FORGE.motion | `@forgelabs-studio/motion` | v0.1.1 — shipped |
| FORGE.ascii | `@forgelabs-studio/ascii` | v0.1.0 - shipped |
| FORGE.tokens | `@forgelabs-studio/tokens` | Planned |

---

## Repo Structure

```text
forge-ui/
├── app/
│   ├── (site)/                 # Marketing site at forgelabs.studio
│   └── (playground)/           # Docs, how-it-works, UI and motion playgrounds
├── components/
│   ├── site/                   # Marketing site sections
│   ├── forge/                  # Generated/self-owned Forge UI components used by the site
│   ├── playground/             # FORGE.ui playground
│   ├── motion/                 # FORGE.motion playground
│   └── layout/                 # Shared shell UI
├── cli/                        # @forgelabs-studio/ui CLI
├── packages/
│   ├── shared/                 # Shared registry and types
│   └── cli-motion/             # @forgelabs-studio/motion CLI
├── lib/                        # Registries, defaults, command builders, utilities
└── store/                      # Zustand playground state
```

---

## FORGE.ui

`@forgelabs-studio/ui` generates 40 React components as local TSX/CSS files.

```bash
npx @forgelabs-studio/ui init
npx @forgelabs-studio/ui add button --color='#7F77DD' --variant='glow'
npx @forgelabs-studio/ui add button morphblob badge
```

**Primitives:** Button, Card, Input, Badge, Toggle, Select, Checkbox, Radio, Slider, Textarea, Avatar, StatCard, TagInput, DatePicker

**Motion:** Spinner, FadeUp, Ticker, MorphBlob, CountUp

**Charts:** BarChart, LineChart, Donut, Progress, Sparkline

**Navigation:** Command, Navbar, Breadcrumb, Pagination, SideNav, Tabs

**Overlay:** Modal, Toast, Tooltip, Dropdown, Drawer

**Feedback:** Skeleton, Alert, Stepper, Accordion

**Data:** Table

Chart components expect Chart.js to be available in the consuming app.

---

## FORGE.motion

`@forgelabs-studio/motion` generates Framer Motion presets as local TSX files.

```bash
npm install framer-motion
npx @forgelabs-studio/motion add fade-up
npx @forgelabs-studio/motion check
```

**Presets:** FadeUp, FadeDown, FadeIn, SlideInLeft, SlideInRight, ScaleIn, BounceIn, Stagger, Parallax, Reveal, Float, Pulse, CountUp, Typewriter

Generated motion presets import from `framer-motion`. Install it in the consuming app before using a generated preset, or your app will fail to resolve that import.

---

## Running Locally

```bash
npm install
npm run dev
```

Routes:

- Marketing site: `http://localhost:3000`
- Playground chooser: `http://localhost:3000/playground`
- FORGE.ui playground: `http://localhost:3000/playground/ui`
- FORGE.motion playground: `http://localhost:3000/playground/motion`
- Docs: `http://localhost:3000/docs`

Useful checks:

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

---

## CLI Development

```bash
cd cli
npm run build
npm link
```

Then `npx @forgelabs-studio/ui` resolves to your local build.

For motion:

```bash
cd packages/cli-motion
npm run build
npm link
```

Then `npx @forgelabs-studio/motion` resolves to your local build.

---

## Contributing

Open an issue before opening a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and extension points.

## Licence

MIT · Built by [Talia](https://forgelabs.studio)
