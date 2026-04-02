# FORGE.ui

Spectrum-aware, motion-first React component library.  
Configure visually — install with one CLI command — own the generated files.

**[→ Playground](https://forgelabs.studio)** · **[→ npm](https://www.npmjs.com/package/@forgelabs-studio/ui)**

## What this is

FORGE.ui is a component library with no runtime dependency. The CLI generates `.tsx` and `.css` files directly into your project. You own them. No black box, no forced upgrades.

## Repo structure
```
forge-ui/
├── app/              # Next.js playground (forgelabs.studio)
├── components/       # Playground UI components
├── store/            # Zustand state
├── lib/              # Registry, CLI builder, types
└── cli/              # @forgelabs-studio/ui npm package
    └── src/
        ├── index.ts          # CLI entrypoint
        ├── commands/         # init, add, list, update, remove
        ├── generate.ts       # Component file generators
        ├── registry.ts       # 40 component definitions
        └── flags.ts          # Flag parser
```

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

## Running locally
```bash
npm install
npm run dev
```

Playground runs at `http://localhost:3000`.

## CLI development
```bash
cd cli
npm install
npm run build
npm link
```

Then `npx @forgelabs-studio/ui` works globally from your local build.

## Contributing

Open an issue before opening a PR. This is an early-stage project — direction may change.

## Licence

MIT · Built by [Talia](https://forgelabs.studio)
