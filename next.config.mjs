import { withSentryConfig } from "@sentry/nextjs";

const hasSentryAuthToken = Boolean(process.env.SENTRY_AUTH_TOKEN);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@forgelabs-studio/shared"],
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "forgelabsstudio-tr",

  project: "javascript-nextjs",

  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Avoid build noise when Vercel/CI is missing the optional upload token.
  silent: !hasSentryAuthToken,

  // Sentry telemetry is unrelated to app error reporting.
  telemetry: false,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Only create releases and upload source maps when an auth token is configured.
  sourcemaps: {
    disable: !hasSentryAuthToken,
  },

  // Upload a larger set of source maps for prettier stack traces (increases build time).
  widenClientFileUpload: hasSentryAuthToken,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
