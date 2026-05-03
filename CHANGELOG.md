# Changelog

All notable changes to this project will be documented in this file.

The format is based on _Keep a Changelog_ and this project follows semantic versioning.

## [Unreleased]

### Changed

- Motion playground install command now matches the FORGE.ui command panel pattern, including copy feedback and generated-file output.
- Documentation refreshed for the current FORGE.ui + FORGE.motion monorepo structure.

## [0.4.0] — 2026-05-04

### Added

- FORGE.motion playground at `/playground/motion`.
- `@forgelabs-studio/motion` CLI package with `add`, `list`, `update`, `remove`, and `check` commands.
- 14 FORGE.motion presets: FadeUp, FadeDown, FadeIn, SlideInLeft, SlideInRight, ScaleIn, BounceIn, Stagger, Parallax, Reveal, Float, Pulse, CountUp, and Typewriter.
- `.forge.json` manifest support for motion preset version tracking.
- Playground chooser at `/playground` linking to the UI and motion playgrounds.
- Marketing site at `app/(site)/` with live FORGE component demos.
- `components/site/`, `lib/siteData.ts`, and `lib/useReveal.ts` for the public site.
- `packages/shared/` for shared registry and type surfaces across packages.

### Changed

- FORGE.ui playground moved to `/playground/ui`.
- Monorepo route groups split marketing and playground shells cleanly under `app/(site)/` and `app/(playground)/`.
- `PropsPanel.tsx` split into per-component prop editor files.
- `cli/src/generate.ts` split into per-component generator files.
- Topbar and public docs updated for FORGE.ui v0.4.0 and FORGE.motion v0.1.0.
- Root workspace and `@forgelabs-studio/ui` package version bumped to `0.4.0`.

### Infrastructure

- CI covers lint, typecheck, test, and build.
- CSP, security headers, Sentry config, and Vercel Analytics support are in place.

## [0.3.0] — 2026-04-27

### Changed

- Refactored `PropsPanel.tsx` from a large monolith into focused prop editor files.
- Refactored `cli/src/generate.ts` into per-component generator files.
- Set minimum Node.js version to `>=18.0.0`.

## [0.2.0] — 2026-04-02

### Added

- Full set of 40 component generators.
- Security hardening across CLI and playground.
- Accessibility improvements across core components.
- Test coverage for generators and UI system.
- CI pipeline for linting, type checking, and tests.

## [0.1.0] — 2026-04-01

### Added

- Initial release of FORGE.ui.
- Core CLI scaffolding.
- Playground foundation for component previewing.
