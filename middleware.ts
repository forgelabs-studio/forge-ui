import { NextRequest, NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

export function middleware(_request: NextRequest) {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://cdn.jsdelivr.net`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://va.vercel-insights.com https://va.vercel-scripts.com https://*.ingest.de.sentry.io https://cdn.jsdelivr.net",
    "frame-ancestors 'none'",
  ].join("; ");

  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
