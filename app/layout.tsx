export const dynamic = "force-static";

import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgelabs.studio"),
  title: "FORGE.labs",
  description:
    "Open source React components, design token pipelines, and animation primitives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
