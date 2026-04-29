# CLAUDE-FORGESITE.md — FORGE.labs Marketing Site Context

Read this file when working on the marketing site at `app/(site)/`.
For ecosystem-level context, see `CLAUDE.md`.

---

## What this is

The public-facing marketing site for FORGE.labs at `forgelabs.studio`.
It is NOT the component playground — that lives at `/playground`, `/docs`, `/how-it-works`.
The site introduces the full FORGE ecosystem, explains the ownership model, and funnels
visitors to GitHub and the playground.

**URL:** `https://forgelabs.studio` (root `/`)
**Route:** `app/(site)/page.tsx`
**Status:** Built and live as of 2026-04-29

---

## Architecture

```
app/
├── layout.tsx             # Root layout — <html><body><Analytics> only, no shell
├── (site)/
│   ├── layout.tsx         # Site layout — <div class="forge-site-page"> wrapper + metadata
│   └── page.tsx           # Site homepage — assembles all sections
└── (playground)/
    ├── layout.tsx         # Playground layout — <div class="app"><Topbar> shell + metadata
    ├── playground/
    │   ├── page.tsx
    │   └── error.tsx
    ├── docs/
    │   └── page.tsx
    └── how-it-works/
        └── page.tsx

components/
├── site/                  # Marketing site sections (all "use client")
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Tools.tsx
│   ├── Philosophy.tsx
│   ├── OssCallout.tsx
│   ├── BuiltBy.tsx
│   ├── Cta.tsx
│   └── Footer.tsx
├── layout/
│   └── Topbar.tsx         # Playground topbar — logo links to "/" (marketing site)
└── forge/                 # ForgeUI components installed from CLI (self-owned)
    ├── ForgeButton.tsx/.css
    ├── ForgeBadge.tsx/.css
    ├── ForgeCard.tsx/.css
    ├── ForgeFadeUp.tsx/.css
    ├── ForgeStatCard.tsx/.css
    ├── ForgeTicker.tsx/.css
    └── forge-tokens.css

lib/
├── siteData.ts            # Content data — tickerItems, tools array, tenets array
└── useReveal.ts           # IntersectionObserver scroll-reveal hook
```

---

## Layout structure

Each route group has its own layout. Only `app/layout.tsx` renders `<html>` and `<body>` — no nested html/body anywhere.

- **Root** (`app/layout.tsx`): thin shell — `<html lang="en"><body><Analytics/>{children}</body></html>` + `globals.css`
- **Site** (`app/(site)/layout.tsx`): `<div class="forge-site-page">` — no html/body, no Topbar. Imports `forge-tokens.css`. Contains all site metadata.
- **Playground** (`app/(playground)/layout.tsx`): `<div class="app"><Topbar/>{children}</div>` — no html/body. Contains all playground metadata.

`overflow: hidden` lives on `.app` (not html/body), so the playground clips cleanly and site pages scroll freely. `.forge-site-page` sets `font-size: 15px; line-height: 1.6` to override the playground's 13px/1.5 globals.

---

## Site sections

| Section | Component | Purpose |
|---------|-----------|---------|
| Nav | `Nav.tsx` | Fixed, scroll-aware border, FORGE.labs wordmark, GitHub CTA |
| Hero | `Hero.tsx` | Full-screen, tagline, two CTAs, ForgeTicker, scroll cue |
| Spectrum bar | inline in page | 1px rainbow gradient divider between hero and tools |
| Tools | `Tools.tsx` | Featured FORGE.ui card + 3 coming-soon secondary cards |
| Philosophy | `Philosophy.tsx` | 2-col manifesto + 5 tenets list |
| OssCallout | `OssCallout.tsx` | 3-step "how it works" + ForgeButton.tsx code preview |
| BuiltBy | `BuiltBy.tsx` | Solo studio card — Talia / Sheffield |
| CTA | `Cta.tsx` | Closing CTA with spectrum-border animation |
| Footer | `Footer.tsx` | Links: GitHub, Playground, npm, X |

---

## Tools card states

Secondary tools grid (`tools` array in `siteData.ts`, order: tokens, motion, blocks):

| Index | Tool | State | Treatment |
|-------|------|-------|-----------|
| 0 | FORGE.tokens | Muted | No npm scope, no action button. Blurred body (opacity 0.35, blur 3px, pointer-events none), "Coming later" badge + label |
| 1 | FORGE.motion | Normal | Fully visible — npm scope shown, "Follow progress ↗" button — **next to ship** |
| 2 | FORGE.blocks | Muted | Same as FORGE.tokens |

To change states: edit `i !== 1` condition in `Tools.tsx`.

---

## Scroll reveal system

`useReveal.ts` — IntersectionObserver hook. Apply `ref={useReveal()}` to a section
wrapper, then add `className="reveal"` (and optional `reveal-delay-1/2/3`) to children.
CSS for `.reveal` and `.reveal.visible` lives in `globals.css` (site section).

---

## Design token usage

Fonts loaded via Next.js in `app/(site)/layout.tsx`:
- `--font-serif` → DM Serif Display 400 (normal + italic)
- `--font-mono` → DM Mono 400/500

Site components use `var(--serif)` and `var(--mono)` from globals.css (Google Fonts fallback).
The Next.js-optimised `--font-serif`/`--font-mono` variables are set but not yet wired into the
site CSS. Low priority — both load the same font.

`components/forge/forge-tokens.css` is imported in the site layout and provides all
`--forge-*` tokens used by the ForgeUI components.

---

## Content to keep current

When copy or counts change, edit `lib/siteData.ts`:
- `tickerItems` — ticker strip items in Hero
- `tools` — secondary tool cards (tokens, motion, blocks)
- `tenets` — Philosophy section numbered list

Hardcoded in components (update in-place if needed):
- FORGE.ui stats: 40 components, 7 groups — `Tools.tsx:64-71`
- "Built by Talia" copy — `BuiltBy.tsx`

---

## Production readiness score

| Date | Score | Notes |
|------|-------|-------|
| 2026-04-29 | 8/10 | Site built and live. TypeScript clean. SEO + OG metadata complete. Analytics + CSP configured. No tests (marketing site — acceptable). Minor hardcoded content counts in Topbar/Tools. |
| 2026-04-29+ | 8.5/10 | Nav Playground link + Hero CTA wired. Footer bug fixed (wrong playground href). Tools cards fully polished (blur 3px, no stale UI on muted cards). |

---

## Session history

| Date | What happened |
|------|--------------|
| 2026-04-29 | Marketing site built — all 8 sections, forge components, siteData, useReveal |
| 2026-04-29 | CSP fix: added va.vercel-scripts.com to script-src and connect-src in middleware.ts |
| 2026-04-29 | Tools cards: FORGE.tokens (i=0) and FORGE.blocks (i=2) muted; FORGE.motion (i=1) normal |
| 2026-04-29 | Route group restructure: playground → app/(playground)/, site → app/(site)/. Root layout now thin html/body only. Fixes hydration mismatch. |
| 2026-04-29 | Topbar logo (gem + FORGE.ui text) now links to "/" via next/link |
| 2026-04-29 | Nav: added Playground link between About and GitHub |
| 2026-04-29 | Hero: "Explore the toolkit" button now router.push('/playground') instead of scrollIntoView |
| 2026-04-29 | Tools muted cards (i=0,2): removed npm scope subtitle, removed "Follow progress ↗" button, blur 1.5px → 3px |
| 2026-04-29 | Footer bug fixed: "Playground" link was pointing to / instead of /playground |
| 2026-04-29 | Nav: /playground link changed from <a> (full reload) to <Link> (soft nav); hash + external links stay as <a> |
| 2026-04-29 | OssCallout: "Read the docs" changed from window.open(GitHub) to router.push('/docs'); ↗ glyph removed |
