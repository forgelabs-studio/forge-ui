# CLAUDE-FORGEUI.md — FORGE.ui Product Context

Read this file when working on the FORGE.ui playground, component library, or CLI.
For ecosystem-level context, see `CLAUDE.md`.

---

## What FORGE.ui is

A spectrum-aware, motion-first React component library with a CLI generator.
40 components. Users configure visually in the playground, copy one CLI command,
own the generated TSX + CSS files with zero runtime dependency on `@forgelabs-studio/ui`.

**Published:** `@forgelabs-studio/ui` v0.3.0
**Playground:** Next.js 15 app at root of `forge-ui` repo
**CLI:** `cli/` directory, built with tsup, published separately

---

## Current state — complete

Audit finished 2026-04-27. Score: **9.5 / 10**. All items resolved except two minor pre-existing
type errors in chart renderers and the deferred monorepo migration (tracked in `CLAUDE.md`).

### What's built

- 40-component CLI generator set
- Playground — functional, lazy-loaded, accessible, persisted
- CLI — `add`, `update`, `remove` commands with error handling
- CI — lint → typecheck → test → build on every PR
- Sentry error tracking + CSP report-uri
- Vitest test suite (cli-builder + registry)

### Remaining minor issues

- **Type errors in `DonutRenderer` and `SparklineRenderer`** — `cutout` does not exist on
  `ChartDataset`, `string` not assignable to `keyof ChartTypeRegistry`. Pre-existing. Fix when
  TypeScript strict-checks these files properly.
- **Registry duplication** — resolved by monorepo migration (`packages/shared`). See `CLAUDE.md`.
- **Shared types drift** — `lib/types.ts` vs `cli/src/types.ts`. Same fix as above.

---

## Architecture decisions — do not reverse without discussion

- **Ownership model is non-negotiable** — generated files have zero runtime dependency
- **Next.js 15 App Router** — do not downgrade
- **TypeScript strict mode** — no `@ts-ignore` without an explanatory comment
- **Framer Motion** — animation library of choice, no alternatives
- **Tailwind CSS** — utility classes only, no CSS modules in new components
- **tsup** — CLI build tool, do not change
- **MIT licence** — all packages

---

## Key file locations

| File | Purpose |
|------|---------|
| `lib/registry.ts` | Component registry — source of truth for IDs, names, groups |
| `lib/types.ts` | All 36 component prop interfaces |
| `lib/prop-defaults.ts` | Default prop values per component |
| `lib/cli-builder.ts` | Builds CLI command string from playground state |
| `lib/utils.ts` | Shared utils — `hexRgb`, `isValidHex`, `COLORS` |
| `components/playground/RendererDispatch.tsx` | Lazy-loads the active renderer |
| `components/playground/PropsPanel.tsx` | Shell — lazy-loads per-component prop panel |
| `components/playground/props/controls.tsx` | Atom controls (Toggle, Swatches, Range, etc.) |
| `components/playground/props/` | 40 per-component prop panel files |
| `components/playground/renderers/` | 40 renderer components |
| `cli/src/generate.ts` | Dispatcher — routes to per-component generator |
| `cli/src/generators/` | 40 per-component generator files |
| `store/playground.ts` | Zustand store with persist middleware |
| `middleware.ts` | CSP nonce generation + security headers |

---

## Production readiness scores

| Date | Score | Notes |
|------|-------|-------|
| 2026-04-09 | 5/10 | All 4 criticals resolved. Zero tests, no CI, `any` everywhere. |
| 2026-04-11 | 5.5/10 | Criticals merged. tsconfig exclude + cli/node_modules fixed. |
| 2026-04-13 | 5.5/10 | CLI injection fixed. New blockers found (build broken, vulns). |
| 2026-04-23 | 7/10 | A11y audit 40/40. Most MEDIUMs resolved. Still no tests, monoliths. |
| 2026-04-23+ | 7.5/10 | Vitest added. CI runs full pipeline. |
| 2026-04-27 | 8/10 | PropsPanel split 2,421 → 144 lines + 40 files. |
| 2026-04-27+ | 8.5/10 | generate.ts split 6,400 → 141 lines + 40 files. 0.3.0 published. |
| 2026-04-27++ | 9/10 | Browserslist, Sentry, CSP report-uri. All LOW items done. |
| 2026-04-27+++ | 9.5/10 | Font fix, chartRef types, SENTRY_AUTH_TOKEN in CI. Audit complete. |

---

## Session history (summary)

| Date | What happened |
|------|--------------|
| 2026-04-08 | Branding: PRISM → FORGE. Code style pass. |
| 2026-04-09 | Chart.js null guards, error boundaries, CSP nonces. |
| 2026-04-11 | Merged criticals #1–#4. Fixed tsconfig + cli/node_modules tracking. |
| 2026-04-12 | Registry duplication interim fix. Typed all 39 renderers (36 interfaces). |
| 2026-04-13 | CLI injection fix. Audit found 3 new issues. |
| 2026-04-14 | Confirmed prior issues resolved. Audit pass only. |
| 2026-04-16 | CI pipeline, Chart.js CDN removal, CLI error handling. |
| 2026-04-21 | Color utils consolidation, prop-defaults type validation, Zustand persist. |
| 2026-04-22 | Code splitting (39 lazy renderers), a11y audit started (6 components). |
| 2026-04-23 | A11y audit complete 40/40. Vitest added (8 tests). CI updated. |
| 2026-04-24 | GitHub cleanup, committed backlog, fixed lazy loading actually committed. |
| 2026-04-27 | PropsPanel split, generate.ts split, 0.3.0 published, docs, browserslist, Sentry + CSP. |
| 2026-04-27+ | Font fix, chartRef types, SENTRY_AUTH_TOKEN CI. FORGE.ui complete. |
| 2026-04-29 | Marketing site built (see CLAUDE-FORGESITE.md). Monorepo migration complete. |
| 2026-04-29+ | Marketing site polish: Nav Playground link, Hero CTA → router.push, tools card muting tightened, footer bug fixed. |
