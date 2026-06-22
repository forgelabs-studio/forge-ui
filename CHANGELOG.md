# Changelog

All notable changes to this project will be documented in this file.

The format is based on _Keep a Changelog_ and this project follows semantic versioning.

## [Unreleased]

## [0.4.2] — 2026-05-04

### Changed

- Removed the private `@forgelabs-studio/shared` workspace package from the published `@forgelabs-studio/ui` package dependencies while keeping shared registry code bundled into the CLI output.
- Tightened shared registry typing so UI component ids are enforced as a literal union across the playground and CLI.
- UI CLI generator coverage is now compile-time complete; missing generator registrations fail typecheck instead of producing placeholder files.
- No-DSN Sentry builds now alias the SDK to a local no-op module, removing Sentry build warnings and keeping local/public builds lean.

## [0.1.1] — 2026-05-04

### Changed

- Hardened the `@forgelabs-studio/motion` release workflow with public publish metadata and automatic prepack builds.
- Centralized the motion CLI package version used by `forge-motion --version` and installed preset manifests.
- Corrected `forge-motion check` update guidance to use `update <preset>`.

## [0.4.1] — 2026-05-04

### Added

- `@forgelabs-studio/ui add` now accepts multiple component ids in one command, for example `npx @forgelabs-studio/ui add button morphblob badge`.
- UI CLI add now skips duplicate requests, existing config entries, and existing output files while continuing with the rest of the queue.
- UI CLI add now suggests the nearest component id for likely spelling errors.

### Changed

- Built UI CLI bundles the private shared registry into `dist/index.js` so published/local CLI runs do not import TypeScript workspace sources at runtime.
- Docs and How It Works now distinguish FORGE.ui motion helpers from `@forgelabs-studio/motion` Framer Motion presets.
- Sentry release/source-map upload is gated by `SENTRY_AUTH_TOKEN`; no-token builds stay quiet and runtime reporting still uses the public DSN.

## [0.4.0] — 2026-05-04

### Changed

- Motion playground install command now matches the FORGE.ui command panel pattern, including copy feedback and generated-file output.
- Documentation refreshed for the current FORGE.ui + FORGE.motion monorepo structure.

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
