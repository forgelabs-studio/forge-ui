"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "GitHub", href: "https://github.com/forgelabs-studio" },
  { label: "Playground", href: "https://forgelabs.studio/playground" },
  { label: "npm", href: "https://www.npmjs.com/org/forgelabs-studio" },
  { label: "X", href: "https://x.com/taliawip" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--line)]"
      style={{ padding: "40px 0" }}
    >
      <div
        className="container flex items-center justify-between flex-wrap"
        style={{ gap: 20 }}
      >
        <Link
          href="/"
          className="flex items-center no-underline"
          style={{ gap: 9 }}
        >
          <div
            className="gem rounded-[5px]"
            style={{ width: 18, height: 18 }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            FORGE
            <span style={{ color: "var(--hint)", fontWeight: 300 }}>.labs</span>
          </span>
        </Link>

        <div className="flex items-center flex-wrap" style={{ gap: 20 }}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: "var(--hint)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--hint)")
              }
            >
              {label}
            </a>
          ))}
          <span
            style={{
              fontSize: 12,
              color: "rgba(240,237,232,0.1)",
              fontFamily: "var(--mono)",
            }}
          >
            © 2026 FORGE.labs
          </span>
        </div>
      </div>
    </footer>
  );
}
