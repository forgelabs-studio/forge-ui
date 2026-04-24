import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "FORGE.ui — Component Playground",
  description:
    "Spectrum-aware, motion-first React component library. Configure visually, install with one CLI command, own the generated files.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";
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
        <Script
          nonce={nonce}
          src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"
          strategy="beforeInteractive"
        />
        <div className="app">
          <Topbar />
          {children}
        </div>
      </body>
    </html>
  );
}
