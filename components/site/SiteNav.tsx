"use client";

import { ForgeNavbar } from "@/components/forge/ForgeNavbar";

const NAV_LINKS = [
  { label: "playground", href: "/playground" },
  { label: "github", href: "https://github.com/forgelabs-studio/forge-ui" },
];

export default function SiteNav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <ForgeNavbar
        brand="FORGE.labs"
        links={NAV_LINKS}
        color="#7F77DD"
        variant="dark"
        showLogo
        showCta={false}
      />
    </div>
  );
}
