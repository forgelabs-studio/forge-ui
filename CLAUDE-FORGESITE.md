# CLAUDE-FORGESITE.md — FORGE.labs Marketing Site Context

Read this file when working on the marketing site at `app/(site)/`.
For ecosystem-level context, see `CLAUDE.md`.

---

## What this is

The public-facing marketing site for FORGE.labs at `forgelabs.studio`.
Introduces the FORGE ecosystem, showcases live components, and funnels visitors
to GitHub and the playground.

**URL:** `https://forgelabs.studio` (root `/`)
**Route:** `app/(site)/page.tsx`
**Status:** Built and live as of 2026-04-29. Rebuilt and polished 2026-04-30.

---

## Architecture

```
app/
├── layout.tsx             # Root layout — force-static, Chart.js CDN script, Analytics
├── (site)/
│   ├── layout.tsx         # Site layout — forge-tokens.css, full SEO + OG metadata
│   ├── page.tsx           # Site homepage — assembles all sections
│   └── opengraph-image.tsx
└── (playground)/
    ├── layout.tsx
    ├── playground/
    ├── docs/
    └── how-it-works/

components/
├── site/                  # Marketing site sections (all "use client")
│   ├── SiteNav.tsx        # Fixed nav — ForgeNavbar with playground + GitHub links
│   ├── SiteHero.tsx       # Full-screen hero — terminal card, two CTAs, reveal animations
│   ├── SiteTicker.tsx     # ForgeTicker strip of component names
│   ├── DemoSection.tsx    # 5-cell interactive component demo grid
│   ├── HowItWorks.tsx     # ForgeStepper + code preview panel (3 steps)
│   ├── ComponentShowcase.tsx  # 10-component grid — breadth showcase
│   └── SiteFooter.tsx     # Links: GitHub, Playground, npm, X
├── layout/
│   └── Topbar.tsx         # Playground topbar — logo links to "/"
└── forge/                 # ForgeUI components installed from CLI (self-owned)
    └── (23 components + forge-tokens.css)

lib/
├── siteData.ts            # Content: tickerItems, tools array, tenets array
└── useReveal.ts           # IntersectionObserver hook — accepts optional IntersectionObserverInit
```

---

## Layout structure

- **Root** (`app/layout.tsx`): `force-static`, Chart.js CDN script, Vercel Analytics, `globals.css`
- **Site** (`app/(site)/layout.tsx`): `<div class="forge-site-page">`, `forge-tokens.css`, full metadata + OG
- **Playground** (`app/(playground)/layout.tsx`): `<div class="app"><Topbar/>`, playground metadata

`force-static` on root layout means no per-request server rendering — this is why CSP uses
`unsafe-inline` rather than a nonce. Do not remove `force-static` without a plan for the nonce.

---

## Site sections

| Section | Component | Purpose |
|---------|-----------|---------|
| Nav | `SiteNav.tsx` | Fixed, uses ForgeNavbar — links to /playground and GitHub |
| Hero | `SiteHero.tsx` | Headline + terminal card + two CTAs. Custom reveal threshold (0.05) |
| Ticker | `SiteTicker.tsx` | ForgeTicker strip of component names |
| Demo | `DemoSection.tsx` | 5 interactive cells: Button/Toast easter egg, MorphBlob, Spinner, Slider, CountUp |
| How it works | `HowItWorks.tsx` | ForgeStepper (3 steps) + code preview that updates per active step |
| Showcase | `ComponentShowcase.tsx` | 10-component grid with pagination, auto-opens accordion on mount |
| Footer | `SiteFooter.tsx` | GitHub, Playground, npm, @taliawip |

---

## Scroll reveal system

`useReveal(options?: IntersectionObserverInit)` in `lib/useReveal.ts`.

Defaults: `{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }`.
Callers spread their overrides over the defaults.

Apply `ref={useReveal()}` to the section wrapper. Add `className="reveal"` (and optional
`reveal-delay-1/2/3`) to children. CSS for `.reveal` / `.reveal.visible` lives in `globals.css`.

**All section components use this hook. Do not inline IntersectionObserver logic.**

---

## Installed ForgeUI components (`components/forge/`)

23 components installed via CLI and self-owned:
ForgeAccordion, ForgeAlert, ForgeBadge, ForgeBreadcrumb, ForgeButton, ForgeCard,
ForgeCountUp, ForgeDonut, ForgeFadeUp, ForgeLineChart, ForgeMorphBlob, ForgeNavbar,
ForgePagination, ForgeSkeleton, ForgeSlider, ForgeSpinner, ForgeStatCard, ForgeStepper,
ForgeTable, ForgeTicker, ForgeToast, ForgeToggle, ForgeTooltip + `forge-tokens.css`

Tracked in `forge.config.json` at project root.

---

## CSP

Configured in `middleware.ts`. Current state:
- `unsafe-inline` in `script-src` and `style-src` — required due to `force-static` (no nonce possible)
- `unsafe-eval` removed — not needed in production
- `cdn.jsdelivr.net` in `script-src` + `connect-src` — required for Chart.js CDN in `app/layout.tsx`
- No nonce generation — the layout is static, nonces cannot be per-request

To restore nonce-based CSP: remove `force-static`, make layout async, generate nonce in
middleware and read via `headers()` in layout. This is a meaningful rework — don't do it casually.

---

## Content to keep current

Edit `lib/siteData.ts` for:
- `tickerItems` — ticker strip items
- `tools` — secondary tool cards (currently unused in new page structure)
- `tenets` — philosophy tenets (currently unused in new page structure)

Hardcoded in components (update in-place):
- FORGE.ui stats: 40 components — `DemoSection.tsx` (ForgeCountUp)
- Component name list — `SiteTicker.tsx`
- Table/chart demo data — `ComponentShowcase.tsx`

---

## Production readiness score

| Date | Score | Notes |
|------|-------|-------|
| 2026-04-29 | 8/10 | Site built and live. TypeScript clean. SEO + OG metadata. Analytics + CSP. |
| 2026-04-29+ | 8.5/10 | Nav + Hero CTAs wired. Footer bug fixed. Tools cards polished. |
| 2026-04-30 | 9/10 | Full rebuild — live component demos, HowItWorks, ComponentShowcase. useReveal deduplicated. unsafe-eval removed. Dead code deleted. |

---

## Session history

| Date | What happened |
|------|--------------|
| 2026-04-29 | Marketing site built — all 8 original sections, forge components, siteData, useReveal |
| 2026-04-29 | CSP fix, route group restructure, Topbar/Nav/Hero/Footer wiring polish |
| 2026-04-30 | Full rebuild — new sections: SiteHero, SiteTicker, DemoSection, HowItWorks, ComponentShowcase, SiteFooter. 23 ForgeUI components installed. forge.config.json added. |
| 2026-04-30 | Cleanup: dead components deleted, useReveal deduplicated across all sections, unsafe-eval removed from CSP, nonce dead code removed, Topbar version corrected to v0.3.0 |
