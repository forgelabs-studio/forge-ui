import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgelabs.studio"),
  title: "FORGE.ui — Component Playground",
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
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Manrope:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Sora:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Analytics />
        <div className="app">
          <Topbar />
          {children}
        </div>
      </body>
    </html>
  );
}
