# Contributing to FORGE.labs

Thanks for your interest in contributing to **FORGE.ui**, **FORGE.motion**, and the broader FORGE.labs ecosystem.

The project is built around one principle: generated files belong to the user. Keep changes aligned with that ownership model.

## Getting Started

```bash
git clone https://github.com/forgelabs-studio/forge-ui
cd forge-ui
npm install
npm run dev
```

Local routes:

- Marketing site: `http://localhost:3000`
- Playground chooser: `http://localhost:3000/playground`
- FORGE.ui playground: `http://localhost:3000/playground/ui`
- FORGE.motion playground: `http://localhost:3000/playground/motion`
- Docs: `http://localhost:3000/docs`

## Branch Workflow

- Never push directly to `main`.
- Create a branch for every change:

```bash
git checkout -b feat/your-feature-name
```

- Open a PR for review.
- Keep PRs focused and small where possible.

## Code Style

**TypeScript**

- `strict` mode is required.
- Avoid `any` unless the boundary genuinely needs it.
- Do not add `@ts-ignore` without a clear comment explaining why.

**Styling**

- Playground shell styles live in `app/globals.css`.
- Generated FORGE.ui components use colocated CSS files.
- Marketing site components under `components/site/` use the established site patterns.
- Do not introduce CSS Modules.

**General**

- Prefer the existing local patterns before adding abstractions.
- Keep generated output dependency-light and easy for users to edit.
- Do not add runtime dependencies to generated files unless the product model explicitly requires them, such as `framer-motion` for FORGE.motion presets.

## Monorepo Structure

The repo uses npm workspaces:

- `cli/` — `@forgelabs-studio/ui` CLI.
- `packages/cli-motion/` — `@forgelabs-studio/motion` CLI.
- `packages/shared/` — shared registry and type surfaces.

Run `npm install` from the repo root to wire workspace symlinks.

## Adding a FORGE.ui Component

Update all relevant surfaces:

- `lib/registry.ts`
- `lib/types.ts`
- `lib/prop-defaults.ts`
- `components/playground/renderers/`
- `components/playground/props/`
- `cli/src/generators/`
- `cli/src/generate.ts`
- docs or tests if the public surface changes

## Adding a FORGE.motion Preset

Update all relevant surfaces:

- `components/motion/MotionPlaygroundLayout.tsx`
- `components/motion/MotionCanvas.tsx`
- `components/motion/MotionCLIWindow.tsx`
- `components/motion/presets/`
- `packages/cli-motion/src/registry.ts`
- `packages/cli-motion/src/generate.ts`
- `packages/cli-motion/src/generators/`
- docs or tests if the public surface changes

## Running Checks

Before opening a PR:

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

Fix all errors and warnings before submitting.

## Final Notes

- Explain why a non-trivial change exists, not only what changed.
- Keep generated files readable; users will edit them.
- Open a discussion or draft PR if the architecture is uncertain.
