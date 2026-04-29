'use client'
import { useState } from 'react'

type DocId = 'overview'|'quickstart'|'tokens'|'theming'|'doc-button'|'doc-card'|'doc-input'|'doc-badge'|'doc-motion'|'doc-charts'|'doc-overlay'|'cli-commands'|'cli-flags'|'cli-config'

function CB({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <div className="code-block">
      <div className="cb-header"><span className="cb-lang">{lang}</span></div>
      <div className="cb-body">{children}</div>
    </div>
  )
}
function Swatch({ bg }: { bg: string }) {
  return <span style={{ display:'inline-flex',alignItems:'center',gap:5 }}><span style={{ width:9,height:9,borderRadius:2,background:bg,border:'1px solid rgba(255,255,255,.1)',flexShrink:0,display:'inline-block' }} /></span>
}

const DOCS: Record<DocId, React.ReactNode> = {
  overview: (<>
    <div className="d-eyebrow">Documentation</div>
    <h1 className="d-h1">Interfaces built to<br /><em>a standard you can feel.</em></h1>
    <p className="d-lead">FORGE.ui is a spectrum-aware, motion-first component library for React. Configure visually, install with one CLI command, own the generated files.</p>
    <div className="d-cards">
      <div className="d-card"><div className="d-card-num">Configure</div><div className="d-card-title">Visual playground</div><div className="d-card-desc">Pick any of 40 components. Adjust every property. The preview updates live.</div></div>
      <div className="d-card"><div className="d-card-num">Install</div><div className="d-card-title">One CLI command</div><div className="d-card-desc">Your exact configuration baked in as flags. Copy it, run it, done.</div></div>
      <div className="d-card"><div className="d-card-num">Own it</div><div className="d-card-title">Your files, your code</div><div className="d-card-desc">Two files land in your project. Readable React + CSS. Edit anything.</div></div>
      <div className="d-card"><div className="d-card-num">Update</div><div className="d-card-title">Preserved config</div><div className="d-card-desc"><code>npx forge-ui update</code> regenerates with your original flags intact.</div></div>
    </div>
    <hr className="d-divider" />
    <h2 className="d-h2">Why not an npm package?</h2>
    <p className="d-p">Most component libraries ship as a black box. You import, it works, but you can&apos;t touch internals. When the API changes you&apos;re forced to upgrade. FORGE.ui uses the shadcn model — the files live in your project and belong to you — but adds a CLI that pre-configures everything before copying, and a config file that tracks what&apos;s installed so updates work cleanly later.</p>
    <div className="callout callout-tip">
      <div className="callout-icon">✦</div>
      <div>The playground is the UI for the CLI. Every visual choice maps to a flag. What you see in the preview is what lands in your project.</div>
    </div>
  </>),

  quickstart: (<>
    <div className="d-eyebrow">Getting started</div>
    <h1 className="d-h1">Quick start</h1>
    <p className="d-lead">Up and running in four commands.</p>
    <h2 className="d-h2">1. Init</h2>
    <CB lang="bash"><span className="str">npx forge-ui@latest init</span></CB>
    <p className="d-p">Creates <code>forge.config.json</code> and <code>components/forge/forge-tokens.css</code>.</p>
    <h2 className="d-h2">2. Import the tokens</h2>
    <CB lang="tsx — app/layout.tsx"><span className="kw">import</span> <span className="str">&apos;@/components/forge/forge-tokens.css&apos;</span></CB>
    <h2 className="d-h2">3. Add a component</h2>
    <p className="d-p">Configure in the playground and copy the generated command, or add with defaults:</p>
    <CB lang="bash"><span className="str">npx forge-ui add button <span className="kw">--color</span>=#7F77DD <span className="kw">--variant</span>=glow</span></CB>
    <h2 className="d-h2">4. Use it</h2>
    <CB lang="tsx">
      <span className="kw">import</span> <span className="punc">{'{ '}</span><span className="fn">ForgeButton</span><span className="punc">{' }'}</span> <span className="kw">from</span> <span className="str">&apos;@/components/forge/ForgeButton&apos;</span><br /><br />
      <span className="kw">export default function</span> <span className="fn">Page</span>() {'{'}<br />
      {'  '}<span className="kw">return</span> (<br />
      {'    '}<span className="tag">{'<ForgeButton'}</span><br />
      {'      '}<span className="attr">color</span>=<span className="str">&quot;#7F77DD&quot;</span><br />
      {'      '}<span className="attr">variant</span>=<span className="str">&quot;glow&quot;</span><br />
      {'    '}<span className="tag">{'>'}</span><br />
      {'      '}Start a project<br />
      {'    '}<span className="tag">{'</ForgeButton>'}</span><br />
      {'  '})<br />
      {'}'}
    </CB>
  </>),

  tokens: (<>
    <div className="d-eyebrow">Design system</div>
    <h1 className="d-h1">Design tokens</h1>
    <p className="d-lead">All tokens live in <code>forge-tokens.css</code>. Override any of them to retheme your entire installation.</p>
    <h2 className="d-h2">Colour tokens</h2>
    <table className="d-table">
      <thead><tr><th>Token</th><th>Default</th><th>Use</th></tr></thead>
      <tbody>
        {[
          ['--forge-bg','#09090b','Page background'],
          ['--forge-bg2','#0f0f12','Panels, card surfaces'],
          ['--forge-bg3','#141418','Card hover, input backgrounds'],
          ['--forge-text','#f0ede8','Primary text'],
          ['--forge-purple','#7F77DD','Default accent colour'],
          ['--forge-red','#e24b4a','Danger, destructive actions'],
          ['--forge-blue','#378ADD','Info, links'],
          ['--forge-teal','#1D9E75','Success, positive states'],
          ['--forge-amber','#EF9F27','Warning states'],
          ['--forge-pink','#D4537E','Secondary accent'],
        ].map(([tok,def,use])=>(
          <tr key={tok}>
            <td><code>{tok}</code></td>
            <td><span style={{display:'inline-flex',alignItems:'center',gap:5}}>{def.startsWith('#')&&<Swatch bg={def} />}<code style={{color:'var(--muted)'}}>{def}</code></span></td>
            <td style={{fontSize:12,color:'var(--muted)'}}>{use}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h2 className="d-h2">Override example</h2>
    <CB lang="css — your globals.css">
      <span className="fn">:root</span> {'{'}<br />
      {'  '}<span className="attr">--forge-purple</span>: <span className="num">#5B5BF0</span>;{'   '}<span className="cmt">{'/* your brand colour */'}</span><br />
      {'  '}<span className="attr">--forge-bg</span>:{'     '}<span className="num">#06060a</span>;{'   '}<span className="cmt">{'/* slightly darker bg */'}</span><br />
      {'  '}<span className="attr">--forge-font</span>:{'   '}<span className="str">&apos;Geist&apos;, sans-serif</span>;<br />
      {'}'}
    </CB>
  </>),

  theming: (<>
    <div className="d-eyebrow">Design system</div>
    <h1 className="d-h1">The colour system</h1>
    <p className="d-lead">Every component accepts a <code>color</code> prop. One hex value — the component derives every interactive state from it.</p>
    <h2 className="d-h2">How it works</h2>
    <p className="d-p">When the CLI generates a component, it calculates the RGB values from your <code>--color</code> flag and bakes them in as the default prop. At runtime, the component sets two CSS custom properties on itself:</p>
    <CB lang="generated at runtime">
      <span className="attr">--forge-color</span>: <span className="num">#7F77DD</span>;<br />
      <span className="attr">--forge-rgb</span>:{'   '}<span className="num">127, 119, 221</span>;
    </CB>
    <p className="d-p">The CSS uses these to derive every state:</p>
    <CB lang="ForgeButton.css">
      <span className="fn">.forge-btn--glow</span> {'{'}<br />
      {'  '}background:{'   '}<span className="fn">rgba</span>(<span className="attr">var</span>(--forge-rgb), <span className="num">0.10</span>);<br />
      {'  '}border-color: <span className="fn">rgba</span>(<span className="attr">var</span>(--forge-rgb), <span className="num">0.28</span>);<br />
      {'  '}color:{'        '}<span className="fn">rgba</span>(<span className="attr">var</span>(--forge-rgb), <span className="num">0.90</span>);<br />
      {'}'}<br />
      <span className="fn">.forge-btn--glow:hover</span> {'{'}<br />
      {'  '}border-color: <span className="fn">rgba</span>(<span className="attr">var</span>(--forge-rgb), <span className="num">0.55</span>);<br />
      {'  '}box-shadow: <span className="num">0 0 22px</span> <span className="fn">rgba</span>(<span className="attr">var</span>(--forge-rgb), <span className="num">0.25</span>);<br />
      {'}'}
    </CB>
    <div className="callout callout-tip">
      <div className="callout-icon">✦</div>
      <div>Use different colours for different components across your site. The system handles each independently — red for CTAs, blue for navigation, purple for SaaS features.</div>
    </div>
  </>),

  'doc-button': (<>
    <div className="d-eyebrow">Component</div>
    <h1 className="d-h1">ForgeButton</h1>
    <p className="d-lead">Spectrum-aware button. 6 variants, ripple animation, lift/scale/glow hover, loading state, optional icon.</p>
    <h2 className="d-h2">Install</h2>
    <CB lang="bash"><span className="str">npx forge-ui add button <span className="kw">--color</span>=#7F77DD <span className="kw">--variant</span>=glow <span className="kw">--hover</span>=lift</span></CB>
    <h2 className="d-h2">Props</h2>
    <table className="d-table">
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['color','string','#7F77DD','Hex colour — derives all states'],
          ['variant','glow|solid|ghost|outline|soft|spectrum','glow','Visual style'],
          ['size','sm|md|lg|xl','md','Size preset'],
          ['hover','lift|scale|glow|none','lift','Hover transform'],
          ['clickAnim','ripple|scale|bounce|none','ripple','Click animation'],
          ['shadow','glow|soft|hard|none','glow','Shadow on hover'],
          ['icon','ReactNode','—','Icon element'],
          ['iconPos','left|right','left','Icon side'],
          ['uppercase','boolean','false','Uppercase label'],
          ['fullWidth','boolean','false','100% width'],
          ['disabled','boolean','false','Disabled state'],
          ['loading','boolean','false','Loading spinner'],
          ['onClick','()=>void','—','Click handler'],
        ].map(([prop,type,def,desc])=>(
          <tr key={prop}>
            <td><code>{prop}</code></td>
            <td><span className="dt">{type}</span></td>
            <td><span className="dd">{def}</span></td>
            <td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>),

  'doc-card': (<>
    <div className="d-eyebrow">Component</div>
    <h1 className="d-h1">ForgeCard</h1>
    <p className="d-lead">Card with a bottom-up colour glow on hover. Each card gets its own colour — assign different colours to distribute the spectrum across your UI.</p>
    <h2 className="d-h2">Install</h2>
    <CB lang="bash"><span className="str">npx forge-ui add card <span className="kw">--color</span>=#7F77DD</span></CB>
    <h2 className="d-h2">Props</h2>
    <table className="d-table">
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['title','string','required','Card headline'],
          ['subtitle','string','—','Body text'],
          ['tag','string','—','Label above title'],
          ['badge','string','—','Small badge below body'],
          ['color','string','#7F77DD','Glow colour on hover'],
          ['width','number|string','auto','Fixed width'],
          ['padding','number','24','Internal padding px'],
          ['radius','number','12','Border radius px'],
          ['showTag','boolean','true','Show/hide tag'],
          ['showBadge','boolean','false','Show/hide badge'],
        ].map(([p,t,d,desc])=>(
          <tr key={p}><td><code>{p}</code></td><td><span className="dt">{t}</span></td><td><span className="dd">{d}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
  </>),

  'doc-input': (<>
    <div className="d-eyebrow">Component</div>
    <h1 className="d-h1">ForgeInput</h1>
    <p className="d-lead">Input with focus glow derived from the colour token and four validation states with automatic hint colouring.</p>
    <h2 className="d-h2">Install</h2>
    <CB lang="bash"><span className="str">npx forge-ui add input <span className="kw">--color</span>=#7F77DD <span className="kw">--state</span>=default</span></CB>
    <h2 className="d-h2">Props</h2>
    <table className="d-table">
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['label','string','—','Label text'],
          ['placeholder','string','—','Placeholder text'],
          ['hint','string','—','Hint below input'],
          ['state','default|error|success|disabled','default','Validation state'],
          ['type','text|email|password|number|search','text','HTML input type'],
          ['color','string','#7F77DD','Focus ring colour'],
          ['size','sm|md|lg','md','Size preset'],
          ['radius','number','8','Border radius px'],
          ['showLabel','boolean','true','Show/hide label'],
          ['showHint','boolean','true','Show/hide hint'],
        ].map(([p,t,d,desc])=>(
          <tr key={p}><td><code>{p}</code></td><td><span className="dt">{t}</span></td><td><span className="dd">{d}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
  </>),

  'doc-badge': (<>
    <div className="d-eyebrow">Component</div>
    <h1 className="d-h1">ForgeBadge</h1>
    <p className="d-lead">Status badge with optional animated pulse dot. Three shape variants.</p>
    <h2 className="d-h2">Install</h2>
    <CB lang="bash"><span className="str">npx forge-ui add badge <span className="kw">--color</span>=#1D9E75 <span className="kw">--variant</span>=pill</span></CB>
    <h2 className="d-h2">Props</h2>
    <table className="d-table">
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['text','string','required','Badge label'],
          ['variant','pill|tag|square','pill','Shape variant'],
          ['color','string','#1D9E75','Badge colour'],
          ['size','sm|md|lg','md','Size preset'],
          ['showDot','boolean','true','Show status dot'],
          ['dotPulse','boolean','true','Animate dot'],
          ['uppercase','boolean','false','Uppercase text'],
        ].map(([p,t,d,desc])=>(
          <tr key={p}><td><code>{p}</code></td><td><span className="dt">{t}</span></td><td><span className="dd">{d}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
  </>),

  'doc-motion': (<>
    <div className="d-eyebrow">Component group</div>
    <h1 className="d-h1">Motion</h1>
    <p className="d-lead">5 animation components. CSS keyframe-driven, no JavaScript animation library required at runtime.</p>
    <h2 className="d-h2">Components</h2>
    <table className="d-table">
      <thead><tr><th>Component</th><th>Description</th><th>Install</th></tr></thead>
      <tbody>
        {[
          ['ForgeFadeUp','Text reveal with per-line stagger','npx forge-ui add fadeup'],
          ['ForgeTicker','Infinite horizontal scroll ticker','npx forge-ui add ticker'],
          ['ForgeMorphBlob','CSS border-radius morphing blob','npx forge-ui add morphblob'],
          ['ForgeCountUp','requestAnimationFrame counter','npx forge-ui add countup'],
          ['ForgeSpinner','5 loading spinner variants','npx forge-ui add spinner'],
        ].map(([comp,desc,cmd])=>(
          <tr key={comp}>
            <td><code>{comp}</code></td>
            <td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td>
            <td><code style={{color:'var(--hint)'}}>{cmd}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="callout callout-tip">
      <div className="callout-icon">✦</div>
      <div>All motion components respect <code>prefers-reduced-motion</code> — animations are automatically disabled for users who have opted out.</div>
    </div>
  </>),

  'doc-charts': (<>
    <div className="d-eyebrow">Component group</div>
    <h1 className="d-h1">Charts</h1>
    <p className="d-lead">5 chart components powered by Chart.js. Loaded from CDN to keep your bundle lean.</p>
    <h2 className="d-h2">Setup</h2>
    <p className="d-p">Add the Chart.js CDN script to your root layout:</p>
    <CB lang="tsx — app/layout.tsx">
      <span className="kw">import</span> Script <span className="kw">from</span> <span className="str">&apos;next/script&apos;</span><br /><br />
      <span className="cmt">{'// Inside <body>:'}</span><br />
      <span className="tag">{'<Script'}</span><br />
      {'  '}<span className="attr">src</span>=<span className="str">&quot;https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js&quot;</span><br />
      {'  '}<span className="attr">strategy</span>=<span className="str">&quot;beforeInteractive&quot;</span><br />
      <span className="tag">{'/>'}</span>
    </CB>
    <h2 className="d-h2">Components</h2>
    <table className="d-table">
      <thead><tr><th>Component</th><th>Description</th><th>Install</th></tr></thead>
      <tbody>
        {[
          ['ForgeBarChart','Grouped bar chart','npx forge-ui add barchart'],
          ['ForgeLineChart','Line chart with optional fill','npx forge-ui add linechart'],
          ['ForgeDonut','Donut/pie chart','npx forge-ui add donut'],
          ['ForgeProgress','Linear progress bar','npx forge-ui add progress'],
          ['ForgeSparkline','Inline sparkline','npx forge-ui add sparkline'],
        ].map(([comp,desc,cmd])=>(
          <tr key={comp}><td><code>{comp}</code></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td><td><code style={{color:'var(--hint)'}}>{cmd}</code></td></tr>
        ))}
      </tbody>
    </table>
  </>),

  'doc-overlay': (<>
    <div className="d-eyebrow">Component group</div>
    <h1 className="d-h1">Overlay</h1>
    <p className="d-lead">5 overlay components for modals, toasts, tooltips, dropdowns and drawers.</p>
    <h2 className="d-h2">Components</h2>
    <table className="d-table">
      <thead><tr><th>Component</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['ForgeModal','Dialog with optional footer and close button'],
          ['ForgeToast','4 semantic toast variants'],
          ['ForgeTooltip','Hover tooltip, dark/light theme'],
          ['ForgeDropdown','Toggleable dropdown menu'],
          ['ForgeDrawer','Slide-in side drawer with overlay'],
        ].map(([comp,desc])=>(
          <tr key={comp}><td><code>{comp}</code></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
    <div className="callout callout-info">
      <div className="callout-icon">i</div>
      <div>Overlay components in the playground are shown in a static preview mode. The full interactive component includes portal rendering and focus trap behaviour.</div>
    </div>
  </>),

  'cli-commands': (<>
    <div className="d-eyebrow">CLI reference</div>
    <h1 className="d-h1">Commands</h1>
    <p className="d-lead">The FORGE.ui CLI is a dev dependency — it writes files and exits. Nothing runs at runtime.</p>
    <table className="d-table">
      <thead><tr><th>Command</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['npx forge-ui init','Create forge.config.json and forge-tokens.css'],
          ['npx forge-ui add <component>','Add one or more components with optional flags'],
          ['npx forge-ui update <component>','Regenerate component with original flags'],
          ['npx forge-ui list','List all installed components'],
          ['npx forge-ui remove <component>','Remove a component and its CSS file'],
        ].map(([cmd,desc])=>(
          <tr key={cmd}><td><code>{cmd}</code></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
  </>),

  'cli-flags': (<>
    <div className="d-eyebrow">CLI reference</div>
    <h1 className="d-h1">Flags</h1>
    <p className="d-lead">Every flag maps to a component prop. Only flags that differ from defaults are needed — the rest are baked in.</p>
    <h2 className="d-h2">Universal flags</h2>
    <table className="d-table">
      <thead><tr><th>Flag</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        {[
          ['--color','hex string','Primary colour. Derives all states.'],
          ['--output','path','Output directory (default: components/forge)'],
          ['--overwrite','boolean','Overwrite existing files'],
        ].map(([flag,type,desc])=>(
          <tr key={flag}><td><code>{flag}</code></td><td><span className="dt">{type}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{desc}</td></tr>
        ))}
      </tbody>
    </table>
    <div className="callout callout-tip">
      <div className="callout-icon">✦</div>
      <div>The playground generates the exact flag set for the current component state. Use it as the canonical reference for available flags per component.</div>
    </div>
  </>),

  'cli-config': (<>
    <div className="d-eyebrow">CLI reference</div>
    <h1 className="d-h1">forge.config.json</h1>
    <p className="d-lead">Created by <code>npx forge-ui init</code>. Tracks installed components so <code>update</code> knows which flags to use.</p>
    <CB lang="json — forge.config.json">
      {'{'}<br />
      {'  '}<span className="attr">&quot;version&quot;</span>: <span className="str">&quot;0.1.0&quot;</span>,<br />
      {'  '}<span className="attr">&quot;output&quot;</span>: <span className="str">&quot;components/forge&quot;</span>,<br />
      {'  '}<span className="attr">&quot;components&quot;</span>: {'{'}<br />
      {'    '}<span className="attr">&quot;button&quot;</span>: {'{'} <span className="attr">&quot;color&quot;</span>: <span className="str">&quot;#7F77DD&quot;</span>, <span className="attr">&quot;variant&quot;</span>: <span className="str">&quot;glow&quot;</span> {'}'}<br />
      {'    '}<span className="attr">&quot;card&quot;</span>: {'{'} <span className="attr">&quot;color&quot;</span>: <span className="str">&quot;#1D9E75&quot;</span> {'}'}<br />
      {'  '}{'}'},<br />
      {'}'}
    </CB>
    <p className="d-p">When you run <code>npx forge-ui update button</code>, the CLI reads the stored flags and regenerates the component file exactly as it was configured — preserving your colour and variant choices across library updates.</p>
    <div className="callout callout-info">
      <div className="callout-icon">i</div>
      <div>Commit <code>forge.config.json</code> to version control. Other developers on your team can run <code>npx forge-ui update --all</code> to regenerate all components to the same specification.</div>
    </div>
  </>),
}

const NAV = [
  { section: 'Getting started', items: [
    { id: 'overview' as DocId, label: 'Overview' },
    { id: 'quickstart' as DocId, label: 'Quick start' },
    { id: 'tokens' as DocId, label: 'Design tokens' },
    { id: 'theming' as DocId, label: 'Colour system' },
  ]},
  { section: 'Components', items: [
    { id: 'doc-button' as DocId, label: 'Button' },
    { id: 'doc-card' as DocId, label: 'Card' },
    { id: 'doc-input' as DocId, label: 'Input' },
    { id: 'doc-badge' as DocId, label: 'Badge' },
    { id: 'doc-motion' as DocId, label: 'Motion' },
    { id: 'doc-charts' as DocId, label: 'Charts' },
    { id: 'doc-overlay' as DocId, label: 'Overlay' },
  ]},
  { section: 'CLI reference', items: [
    { id: 'cli-commands' as DocId, label: 'Commands' },
    { id: 'cli-flags' as DocId, label: 'Flags' },
    { id: 'cli-config' as DocId, label: 'forge.config.json' },
  ]},
]

export default function DocsPage() {
  const [active, setActive] = useState<DocId>('overview')
  return (
    <div className="docs-wrap">
      <nav className="docs-nav">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            <div className="dn-section">{section}</div>
            {items.map(({ id, label }) => (
              <div
                key={id}
                className={`dn-link${active === id ? ' active' : ''}`}
                onClick={() => setActive(id)}
              >
                {label}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="docs-body">
        <div style={{ maxWidth: 700 }}>
          {DOCS[active]}
        </div>
      </div>
    </div>
  )
}
