export const tickerItems = [
  { label: 'FORGE.ui — 40 components',           color: 'var(--purple)' },
  { label: 'FORGE.tokens — design system sync',  color: 'var(--amber)'  },
  { label: 'FORGE.motion — animation presets',   color: 'var(--teal)'   },
  { label: 'FORGE.blocks — page sections',       color: 'var(--blue)'   },
  { label: 'FORGE.grid — layout primitives',     color: 'var(--pink)'   },
  { label: 'FORGE.audit — design system linter', color: 'var(--red)'    },
]

export const tools = [
  {
    tag:        'FORGE.tokens',
    icon:       '◈',
    iconBg:     'rgba(239,159,39,0.1)',
    iconBorder: 'rgba(239,159,39,0.2)',
    sub:        '@forgelabs-studio/tokens',
    desc:       'Figma variables → CSS custom properties → TypeScript types. One source of truth. Change a colour in Figma, run one command, codebase updates.',
    tags:       ['Figma API', 'CSS vars', 'TypeScript'],
  },
  {
    tag:        'FORGE.motion',
    icon:       '◇',
    iconBg:     'rgba(127,119,221,0.1)',
    iconBorder: 'rgba(127,119,221,0.2)',
    sub:        '@forgelabs-studio/motion',
    desc:       'Opinionated scroll-triggered animation presets for React. Named, production-ready behaviours built on Framer Motion. FadeUp, Parallax, Magnetic, Stagger — all tuned.',
    tags:       ['Framer Motion', 'React', 'Scroll'],
  },
  {
    tag:        'FORGE.blocks',
    icon:       '⬡',
    iconBg:     'rgba(55,138,221,0.1)',
    iconBorder: 'rgba(55,138,221,0.2)',
    sub:        '@forgelabs-studio/blocks',
    desc:       'Full page sections built from FORGE.ui components. Hero, Pricing, Testimonials, Feature grids, CTAs — motion-first, spectrum-aware, actually beautiful.',
    tags:       ['Page sections', 'Copy-paste', 'CLI'],
  },
]

export const tenets = [
  {
    num:   '01',
    title: 'Owned code',
    desc:  'No runtime dependencies on our infrastructure. The CLI writes files into your project and walks away. You own them, edit them, version them.',
  },
  {
    num:   '02',
    title: 'Motion-first',
    desc:  "Animation isn't decoration. Every component is designed with its motion in mind from the start, not bolted on at the end.",
  },
  {
    num:   '03',
    title: 'Spectrum-aware',
    desc:  'One colour token drives every state. Hover, focus, glow, border — all derived. Consistent by system, not by copy-paste.',
  },
  {
    num:   '04',
    title: 'Opinionated without being rigid',
    desc:  'Strong defaults, everything overridable. Good taste baked in, not locked in. The tools have a point of view and get out of your way.',
  },
  {
    num:   '05',
    title: 'Built in public',
    desc:  "Everything is open source from day one. Watching something get built is part of the point. Star the repo, open an issue, contribute.",
  },
]
