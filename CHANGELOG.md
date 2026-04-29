# Changelog

All notable changes to this project will be documented in this file.

The format is based on _Keep a Changelog_ and this project follows semantic versioning.

## [Unreleased]

### Added

- Marketing site at `app/(site)/` — 8 sections (Nav, Hero, Tools, Philosophy, OssCallout, BuiltBy, CTA, Footer)
- `components/site/` — all site section components
- `lib/siteData.ts` — ticker items, tools array, tenets
- `lib/useReveal.ts` — IntersectionObserver scroll-reveal hook
- `packages/shared/` — shared registry and types across CLI packages (monorepo migration)

### Changed

- Monorepo migration: playground routes moved to `app/(playground)/`, marketing site at `app/(site)/`. Root layout stripped to html/body only — fixes hydration mismatch between route groups.
- Nav: added Playground link; internal route links use `next/link` for soft navigation
- Hero: "Explore the toolkit" CTA navigates to `/playground` via `router.push`
- OssCallout: "Read the docs" routes to `/docs` internally
- Tools cards (FORGE.tokens, FORGE.blocks): npm scope and action button removed; blur increased to 3px
- Footer: corrected Playground link href

### Infrastructure

- CSP: added `va.vercel-scripts.com` to `script-src` and `connect-src` for Vercel Analytics
- Topbar logo links back to marketing site (`/`) via `next/link`

---

## [0.3.0] — 2026-04-27

### Changed

- Refactored `PropsPanel.tsx` (2,421 lines) into 40 per-component prop editor files for improved maintainability and scalability
- Refactored `cli/src/generate.ts` (6,400 lines) into 40 per-component generator files
- Set minimum Node.js version to `>=18.0.0`

## [0.2.0] — 2026-04-02

### Added

- Full set of 40 component generators
- Security hardening across CLI and playground
- Accessibility improvements across core components
- Test coverage for generators and UI system
- CI pipeline for linting, type checking, and tests

## [0.1.0] — 2026-04-01

### Added

- Initial release of Forge UI
- Core CLI scaffolding
- Playground foundation for component previewing
