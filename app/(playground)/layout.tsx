import type { Metadata } from "next";
import Topbar from "@/components/layout/Topbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgelabs.studio"),
  title: "FORGE.ui - Component Playground",
  description:
    "Spectrum-aware, motion-first React component library. Configure visually, install with one CLI command, own the generated files.",
  openGraph: {
    title: "FORGE.ui",
    description:
      "Spectrum-aware, motion-first React component library. Configure visually, install with one CLI command, own the generated files.",
    url: "https://forgelabs.studio",
    siteName: "FORGE.ui",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://forgelabs.studio/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FORGE.ui - Spectrum-aware, motion-first React components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://forgelabs.studio/opengraph-image"],
  },
};

export default function PlaygroundGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app">
      <Topbar />
      {children}
    </div>
  );
}
