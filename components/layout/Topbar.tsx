'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { usePlaygroundStore } from '@/store/playground'
import { buildCLIString } from '@/lib/cli-builder'

export default function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { activeComponent, props } = usePlaygroundStore()
  const [initOk, setInitOk] = useState(false)
  const [cliOk, setCliOk] = useState(false)

  function copyInit() {
    navigator.clipboard.writeText('npx @forgelabs-studio/ui@latest init').then(() => {
      setInitOk(true)
      setTimeout(() => setInitOk(false), 2000)
    })
  }

  function copyCLI() {
    const cmd = buildCLIString(activeComponent, props[activeComponent] ?? {})
    navigator.clipboard.writeText(cmd).then(() => {
      setCliOk(true)
      setTimeout(() => setCliOk(false), 2000)
    })
  }

  const tabs = [
    { href: '/playground', label: 'Playground', icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg> },
    { href: '/how-it-works', label: 'How it works', icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="6"/><path d="M7 6.5v3M7 4.5v.5"/></svg> },
    { href: '/docs', label: 'Docs', icon: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z"/><path d="M5 5h4M5 7.5h4M5 10h2"/></svg> },
  ]

  return (
    <header className="topbar">
      <Link href="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="gem" />
        <span className="logo-name">FORGE</span><span className="logo-tag">.ui</span>
      </Link>

      <nav className="page-tabs">
        {tabs.map(tab => {
          const active = pathname?.startsWith(tab.href)
          return (
            <button
              key={tab.href}
              className={`ptab${active ? ' active' : ''}`}
              onClick={() => router.push(tab.href)}
            >
              {tab.icon}
              <span className="ptab-label">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="topbar-right">
        <span className="ver">v0.1.0 · 40 components</span>
        <button className={`tbtn${initOk ? ' ok' : ''}`} onClick={copyInit}>
          {initOk ? '✓ Copied!' : '⬡ npx init'}
        </button>
        <button className={`tbtn accent${cliOk ? ' ok' : ''}`} onClick={copyCLI}>
          {cliOk ? '✓ Copied!' : '⌘ Copy command'}
        </button>
      </div>
    </header>
  )
}
