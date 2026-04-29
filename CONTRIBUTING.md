# Contributing to FORGE.labs

Thanks for your interest in contributing to **FORGE.ui** and the broader FORGE.labs ecosystem.

We aim to keep the codebase clean, consistent, and easy to extend. Please follow the guidelines below to make sure your contribution can be reviewed and merged quickly.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/forgelabs-studio/forge-ui
cd forge-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run dev
```

Playground runs at `http://localhost:3000/playground`. Marketing site at `http://localhost:3000`.

## Branch Workflow

- **Never push directly to `main`**
- Always create a new branch:

```bash
git checkout -b feat/your-feature-name
```

- Open a Pull Request (PR) for all changes
- Keep PRs focused and small where possible

## Code Style Guidelines

- **TypeScript**
  - `strict` mode is required
  - Avoid `any` unless absolutely necessary
  - No `@ts-ignore` without a clear comment explaining why

- **Styling**
  - Use **Tailwind CSS** for playground and layout components
  - Marketing site components (`components/site/`) use inline styles — keep consistent with existing patterns there
  - No CSS Modules

- **General**
  - Keep components simple and composable
  - Prefer readability over cleverness

## Adding a New Component

When adding a new FORGE.ui component, update **all of the following**:

1. `lib/registry.ts` — register the component
2. `components/playground/renderers/` — add the playground renderer
3. `components/playground/props/` — define editable props
4. `cli/src/generators/` — add the CLI generator

Missing one of these will result in incomplete functionality.

## Monorepo structure

The repo uses npm workspaces:

- `cli/` — `@forgelabs-studio/ui` CLI, published to npm
- `packages/shared/` — shared registry and types consumed by CLI packages

When working in `packages/`, run `npm install` from the repo root to wire workspace symlinks.

## Running Checks

Before opening a PR:

```bash
npm run typecheck
npm test
npm run lint
```

Fix all errors and warnings before submitting.

## Final Notes

- Keep PR descriptions clear and concise
- If your change is non-trivial, explain **why**, not just what
- If you're unsure about something, open a discussion or draft PR

Thanks for contributing — this project gets better with every PR.
