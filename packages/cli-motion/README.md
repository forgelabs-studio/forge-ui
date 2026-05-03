# @forgelabs-studio/motion

Scroll-triggered and viewport-aware animation preset generator for React. Configure visually in the playground, install with one command, and own the generated files.

**[→ Open the playground](https://forgelabs.studio/playground/motion)**

## Quick Start

Install `framer-motion` in the consuming project:

```bash
npm install framer-motion
```

Add a preset:

```bash
npx @forgelabs-studio/motion add fade-up
```

This writes a local file into your project:

```text
components/motion/ForgeFadeUp.tsx
```

You own this file. Edit it freely.

## CLI Reference

| Command | Description |
|---------|-------------|
| `npx @forgelabs-studio/motion add <preset>` | Add a motion preset |
| `npx @forgelabs-studio/motion list` | List available and installed presets |
| `npx @forgelabs-studio/motion update <preset>` | Regenerate with saved config |
| `npx @forgelabs-studio/motion remove <preset>` | Remove preset files |
| `npx @forgelabs-studio/motion check` | Compare installed preset versions with npm |

## Presets

**Viewport and scroll:** FadeUp, FadeDown, FadeIn, SlideInLeft, SlideInRight, ScaleIn, BounceIn, Stagger, Reveal, CountUp, Typewriter

**Scroll-linked:** Parallax

**Continuous:** Float, Pulse

## Config Files

FORGE.motion uses two small project files:

- `forge.config.json` stores preset props used by `update`.
- `.forge.json` stores installed preset versions used by `check`.

## Philosophy

FORGE.motion uses the same ownership-first model as FORGE.ui. The CLI generates local files that depend on `framer-motion`, but never on `@forgelabs-studio/motion` at runtime.

## Licence

MIT
