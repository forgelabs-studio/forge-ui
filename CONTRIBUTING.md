# Contributing to Forge UI

Thanks for your interest in contributing to **Forge UI**

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

## Branch Workflow

- **Never push directly to `main`**
- Always create a new branch:

```bash
  git checkout -b feat/your-feature-name
```

- Open a Pull Request (PR) for all changes
- Keep PRs focused and small where possible

## Code Style Guidelines

To maintain consistency across the project:

- **TypeScript**
  - `strict` mode is required
  - Avoid `any` unless absolutely necessary
  - No `@ts-ignore` without a clear comment explaining why

- **Styling**
  - Use **Tailwind CSS only**
  - No CSS Modules
  - No inline styles unless unavoidable

- **General**
  - Keep components simple and composable
  - Prefer readability over cleverness

## Adding a New Component

When adding a new component, you must update **all of the following locations**:

1. `lib/registry.ts`
   → Register the component

2. `components/playground/renderers/`
   → Add the renderer for the playground

3. `components/playground/props/`
   → Define editable props

4. `cli/src/generators/`
   → Add the CLI generator

Missing one of these will result in incomplete functionality.

## Running Checks

Before opening a PR, make sure everything passes:

```bash
npm run typecheck
npm test
npm run lint
```

- Fix all errors and warnings
- Ensure your code builds and runs correctly

## Final Notes

- Keep PR descriptions clear and concise
- If your change is non-trivial, explain **why**, not just what
- If you're unsure about something, open a discussion or draft PR

Thanks for contributing — this project gets better with every PR
