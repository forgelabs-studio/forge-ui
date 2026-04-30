"use client";

const LINKS = [
  {
    label: "github",
    href: "https://github.com/forgelabs-studio/forge-ui",
    external: true,
  },
  { label: "playground", href: "/playground", external: false },
  {
    label: "npm",
    href: "https://www.npmjs.com/org/forgelabs-studio",
    external: true,
  },
  { label: "@taliawip", href: "https://x.com/taliawip", external: true },
];

export default function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--line)]"
      style={{ padding: "40px 0" }}
    >
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--hint)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            build faster · own your components
          </span>
        </div>

        <div
          className="flex items-center justify-between flex-wrap"
          style={{ gap: 16 }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            © {new Date().getFullYear()} FORGE.labs · open source UI for people
            who ship
          </span>

          <div className="flex items-center flex-wrap" style={{ gap: 20 }}>
            {LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--hint)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--hint)";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
