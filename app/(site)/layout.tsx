import type { Metadata } from "next";
import "@/components/forge/forge-tokens.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgelabs.studio"),
  title: "FORGE.labs — Tools for design engineers",
  description:
    "Open source React components, design token pipelines, and animation primitives. Configure visually, install with one command, own the code forever.",
  openGraph: {
    title: "FORGE.labs",
    description:
      "Open source React components, design token pipelines, and animation primitives.",
    url: "https://forgelabs.studio",
    siteName: "FORGE.labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="forge-site-page">{children}</div>;
}
