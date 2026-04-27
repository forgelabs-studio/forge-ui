# CLAUDE-FORGEMOTIONS.md — FORGE.motion Product Context

Read this file when working on FORGE.motion or the monorepo migration.
For ecosystem-level context and monorepo structure, see `CLAUDE.md`.

---

## What FORGE.motion is

A collection of scroll-triggered, on-load, and viewport-aware animation presets for React,
built on Framer Motion. Same ownership model as FORGE.ui: configure visually in the playground,
copy one CLI command, own the generated TSX files with zero runtime dependency.

**npm package:** `@forgelabs-studio/motion`
**Framer Motion:** peer dependency — users must have it installed
**v1 ships:** 15 presets

---

## Tech stack

- Next.js 15 App Router (shared playground — new tab, not new app)
- TypeScript strict mode
- Tailwind CSS
- Framer Motion (peer dep — `motion`, `useInView`, `useScroll`, `useTransform`, `useSpring`)
- tsup (CLI build — consistent with FORGE.ui)
- commander + @clack/prompts (CLI UX — consistent with FORGE.ui)
- semver (version comparison for `check` command)

---

## v1 preset list (15)

| ID | Name | Trigger | Notes |
|----|------|---------|-------|
| `fade-up` | FadeUp | on-load / scroll | Fade + translate Y |
| `fade-down` | FadeDown | on-load / scroll | Fade + translate -Y |
| `fade-in` | FadeIn | on-load / scroll | Pure opacity, no translate |
| `slide-in-left` | SlideInLeft | scroll / viewport | Translate from left |
| `slide-in-right` | SlideInRight | scroll / viewport | Translate from right |
| `scale-in` | ScaleIn | on-load / viewport | Scale up from slightly smaller |
| `bounce-in` | BounceIn | on-load / viewport | Scale in with spring overshoot |
| `stagger` | Stagger | on-load / scroll | Wraps children, staggers entrance |
| `parallax` | Parallax | scroll | Different scroll rate — uses `useScroll` + `useTransform` |
| `reveal` | Reveal | scroll / viewport | Masked clip-path wipe |
| `float` | Float | continuous | Idle loop — hero elements |
| `pulse` | Pulse | continuous | Subtle scale loop |
| `count-up` | CountUp | viewport | Animates number from 0 to target |
| `typewriter` | Typewriter | on-load / viewport | Character-by-character text |
| `magnetic` | Magnetic | hover | **CUT from v1** — hover-based, different model. v2 anchor. |

**Magnetic cut rationale:** hover-based interaction (`useMotionValue` + `useSpring` + mouse tracking)
is a different mental model and implementation path from scroll/viewport. v1 story is cleaner without it.

---

## Configurable parameters

Not every preset exposes all of these — each exposes only what's relevant.

| Param | Type | Notes |
|-------|------|-------|
| `duration` | number | seconds |
| `delay` | number | seconds |
| `ease` | string | linear / easeIn / easeOut / easeInOut / spring |
| `distance` | number | px — fade-up, slide variants |
| `stiffness` / `damping` | number | spring physics — bounce |
| `amount` | number | 0–1 — viewport threshold |
| `once` | boolean | whether animation replays on re-enter |
| `staggerDelay` | number | seconds between children — Stagger only |
| `scale` | number | start scale for scale-based presets |

---

## Architecture

```
forge-ui/  (monorepo root — see CLAUDE.md for structure)
├── packages/
│   ├── shared/                  # Shared registry + types (resolves FORGE.ui #5 + #8)
│   └── cli-motion/              # FORGE.motion CLI
│       ├── src/
│       │   ├── index.ts         # commander setup
│       │   ├── add.ts
│       │   ├── update.ts
│       │   ├── remove.ts
│       │   ├── check.ts         # version check against .forge.json manifest
│       │   └── generators/      # 15 preset generator files
│       └── package.json
├── app/playground/
│   └── motion/                  # New route — separate from /playground/ui
│       └── page.tsx
└── components/motion/
    ├── MotionCanvas.tsx
    ├── MotionPropsPanel.tsx
    └── presets/                 # 14 preset preview components
```

---

## Playground route structure — decided 2026-04-27

**Decision: separate routes, not a tab switcher.**

- `/playground/ui` — existing playground (rename from `/playground`)
- `/playground/motion` — new motion playground
- `/playground` — redirect or landing with links to both

Rationale: isolated state, natural code splitting, scales to `/playground/tokens` later.
A shared tab switcher would mix Zustand stores and load both sets of renderers.

---

## Version tracking — decided 2026-04-27

**Decision: manifest file (`.forge.json`) over comment headers.**

Comment headers break the moment a user reformats a file. A manifest at project root is reliable,
survives edits, and can be extended to track both UI and motion versions in one file.

**Format:**
```json
{
  "ui": { "button": "0.3.0", "modal": "0.3.0" },
  "motion": { "fade-up": "0.1.0", "parallax": "0.1.0" }
}
```

`motion check` reads `.forge.json`, compares each installed preset version against the latest
published npm version via semver, prints a summary. Update is always explicit (`add --force`).

---

## Architecture decisions — do not reverse without discussion

- **Ownership model** — generated files have zero runtime dependency on `@forgelabs-studio/motion`
- **Framer Motion peer dep** — not bundled. Users already have it for FORGE.ui.
- **TypeScript strict mode** — consistent with FORGE.ui
- **tsup + commander** — consistent with FORGE.ui CLI
- **MIT licence**
- **Stagger typing** — use `React.Children.toArray()` + `motion.div` wrapper per child. No `any`.
- **Parallax** — `useScroll` + `useTransform` with `useRef` on the element. More complex than others.
- **Reveal** — clip-path mask on wrapper. Wrapper must have `overflow: hidden`.

---

## Known complexity / watch points

- **Monorepo migration first** — do this before writing any motion code
- **Parallax** — `useScroll` + `useTransform` is meaningfully more complex than the other presets
- **Reveal** — clip-path wrapper overflow is easy to get wrong; likely needs iteration
- **Stagger children typing** — `React.Children.toArray()` + careful prop types, no `any`
- **Playground route rename** — existing `/playground` becomes `/playground/ui`, needs redirect

---

## Build order

1. Monorepo migration (Turborepo + `packages/shared`) — infrastructure first
2. `/playground/ui` route rename + redirect from `/playground`
3. `/playground/motion` route + `MotionCanvas` + `MotionPropsPanel` shell
4. 14 preset preview components (playground side)
5. `packages/cli-motion/` setup + 14 generator files
6. `check` command + `.forge.json` manifest
7. Publish `@forgelabs-studio/motion@0.1.0`

---

## Session notes

### Session — 2026-04-27 (planning)

- FORGE.motion plan drafted by user — 15 presets, ownership model, shared playground
- Magnetic cut from v1 — hover-based, different model, strong v2 anchor
- Separate routes decided over tab switcher
- Manifest (`.forge.json`) decided over comment headers
- Monorepo Option A decided — convert forge-ui, playground stays at root
- `packages/shared` export surface defined (registry, ComponentId, ComponentProps)
- `.forge.json` namespace decided — unified file covering both ui and motion
