# @forgelabs-studio/ascii

Image-to-ASCII-art component generator for React. Configure visually in the playground, install with one command, and own the generated files.

**[→ Open the playground](https://forgelabs.studio/playground/ascii)**

## Quick Start

```bash
npx @forgelabs-studio/ascii add ascii
```

This writes two local files into your project:

```text
components/forge/ForgeAscii.tsx
components/forge/ForgeAscii.css
```

You own these files. Edit them freely. Zero runtime dependency on `@forgelabs-studio/ascii` or any other FORGE package - the generated component only imports `react`.

## CLI Reference

| Command | Description |
|---------|-------------|
| `npx @forgelabs-studio/ascii add ascii` | Add the ascii component |
| `npx @forgelabs-studio/ascii list` | List available and installed components |
| `npx @forgelabs-studio/ascii update ascii` | Regenerate with saved config |
| `npx @forgelabs-studio/ascii remove ascii` | Remove component files |
| `npx @forgelabs-studio/ascii check` | Compare installed component version with npm |

## Flags

| Flag | Description |
|------|-------------|
| `--color` | Character colour (hex) |
| `--density` | Output columns, 1-200 |
| `--charset` | `standard` \| `block` \| `braille` \| `minimal` |
| `--animation` | `none` \| `fadein` \| `scanline` \| `flicker` \| `wave` \| `glitch` |
| `--duration` | Animation duration in ms |

## How it works

`ForgeAscii` converts an uploaded PNG/JPG to ASCII art entirely client-side, synchronously on the main thread - no Web Worker, no canvas. That's intentional: the generated output is a single self-contained file pair, and the conversion is fast enough for the image sizes a person uploads by hand. If you need this on a hot path with very large images, resize them client-side before converting.

## Config Files

FORGE.ascii uses two small project files, namespaced so they coexist safely with FORGE.motion's config in the same project:

- `forge.config.json` stores component props used by `update`.
- `.forge.json` stores installed component versions used by `check`.

## Philosophy

FORGE.ascii uses the same ownership-first model as FORGE.ui and FORGE.motion. The CLI generates local files with zero runtime dependency on any FORGE package.

## Licence

MIT
