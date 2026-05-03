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

## GSAP — v2 consideration

GSAP was discussed and deferred from v1. Reasons:
- ScrollTrigger and advanced plugins require a paid commercial license — conflicts with the ownership model (users generating files for commercial projects need their own license)
- Two peer deps (Framer Motion + GSAP) adds install friction for no v1 benefit
- v1 preset list is well within Framer Motion's capabilities
- Mixed library DX is fragmented — some presets Framer Motion, some GSAP

**v2 trigger:** timeline-based or complex SVG presets that genuinely need GSAP's strengths, or a separate `@forgelabs-studio/motion-gsap` variant for users who already have GSAP licensed.

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

1. ~~Monorepo migration (Turborepo + `packages/shared`) — infrastructure first~~ ✓ 2026-04-27
2. ~~`/playground/ui` route rename + redirect from `/playground`~~ ✓ 2026-05-02
3. ~~`/playground/motion` route + `MotionCanvas` + `MotionPropsPanel` shell~~ ✓ 2026-05-03
4. ~~14 preset preview components (playground side)~~ ✓ 2026-05-03
5. ~~`packages/cli-motion/` setup + 14 generator files~~ ✓ 2026-05-03
6. ~~`check` command + `.forge.json` manifest~~ ✓ 2026-05-03
7. ~~Publish `@forgelabs-studio/motion@0.1.0`~~ ✓ 2026-05-03

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

### Session — 2026-05-02 / 2026-05-03

**Full build order completed — FORGE.motion v0.1.0 shipped.**

**Step 2 — Playground routing:**
- `app/(playground)/layout.tsx` — stripped FORGE.ui-specific metadata, layout is now generic
- `app/(playground)/playground/page.tsx` — replaced with landing linking to `/playground/ui` and `/playground/motion`
- `app/(playground)/playground/ui/page.tsx` — existing UI playground moved here with FORGE.ui metadata
- `app/(playground)/playground/motion/page.tsx` — new route with FORGE.motion metadata

**Step 3 — Motion playground shell:**
- `components/motion/MotionPlaygroundLayout.tsx` — `'use client'`, preset list nav, passes `activePreset` to canvas and props panel
- `components/motion/MotionCanvas.tsx` — lazy-loads active preset via static map, wrapped in Suspense
- `components/motion/MotionPropsPanel.tsx` — shell, shows active preset name (controls wired in future)

**Step 4 — 14 preset preview components (`components/motion/presets/`):**
- All use Framer Motion (`motion.div`, `useInView`, `useScroll`, `useTransform`)
- All have `prefersReduced` check and replay button (except Float/Pulse continuous loops)
- `Easing` type imported from `framer-motion` — not `string`
- Parallax uses `useScroll` + `useTransform`, no `useInView`

**Step 5 — `packages/cli-motion/`:**
- Binary: `forge-motion` — commands: `add`, `list`, `update`, `remove`, `check`
- `src/registry.ts` — 14 preset definitions with `displayName` (e.g. `ForgeFadeUp`)
- `src/config.ts` — reads/writes `motion` section of `forge.config.json` (props for `update`)
- `src/generate.ts` — dispatcher to 14 generator functions
- `src/generators/` — 14 generators, each producing a standalone TSX file wrapping Framer Motion

**Step 6 — `check` command + `.forge.json` manifest:**
- `src/manifest.ts` — reads/writes `.forge.json` under `motion` key (version tracking only)
- `check` — fetches latest `@forgelabs-studio/motion` from npm registry, compares via semver, reports outdated presets
- `add` writes `"0.1.0"` to `.forge.json` after generating; `remove` cleans it up
- Two files, two jobs: `forge.config.json` = props, `.forge.json` = versions

**Step 7 — Published:**
- `@forgelabs-studio/motion@0.1.0` live on npm
- Build: 26.1 KB ESM bundle

**GSAP decision:** deferred to v2. Licensing conflicts with ownership model, two peer deps unnecessary for v1 preset list. Noted in CLAUDE-FORGEMOTIONS.md.

**Next session should:**
- Wire `MotionPropsPanel` with real controls (Zustand store for motion state)
- Connect playground props to preset preview components (pass props down through `MotionCanvas`)
- Add CLI string builder for motion (equivalent of `lib/cli-builder.ts` for FORGE.ui)
- Consider adding `MotionSidebar` as its own component (currently inlined in layout)
