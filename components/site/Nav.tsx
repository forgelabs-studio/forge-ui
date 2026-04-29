"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ForgeButton } from "@/components/forge/ForgeButton";

const NAV_LINKS = [
  { label: "Tools", href: "#tools" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "/playground" },
  { label: "GitHub", href: "https://github.com/forgelabs-studio" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      style={{ padding: "0 40px" }}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[60px] bg-[rgba(9,9,11,0.85)] backdrop-blur-[12px] transition-[border-color] duration-300 border-b ${
        scrolled
          ? "border-[rgba(255,255,255,0.08)]"
          : "border-[rgba(255,255,255,0.05)]"
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
        <div className="gem size-[22px] rounded-[6px]" />
        <span className="text-[14px] font-medium tracking-[-0.03em] text-[var(--text)]">
          FORGE
          <span className="text-[var(--hint)] font-light">.labs</span>
        </span>
      </Link>

      <ul className="hide-mobile flex gap-7 list-none">
        {NAV_LINKS.map(({ label, href }) => {
          const isExternal = href.startsWith("http");
          const isAnchor = href.startsWith("#");
          const linkClass = "text-[13px] text-[var(--muted)] tracking-[-0.01em] no-underline transition-colors duration-[150ms] hover:text-[var(--text)]";
          return (
            <li key={label}>
              {!isExternal && !isAnchor ? (
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  className={linkClass}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <ForgeButton
        variant="ghost"
        color="#7F77DD"
        onClick={() =>
          window.open(
            "https://github.com/forgelabs-studio/forge-ui",
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        View on GitHub ↗
      </ForgeButton>
    </nav>
  );
}
