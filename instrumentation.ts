type CaptureRequestError = typeof import("@sentry/nextjs").captureRequestError;

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

export async function register() {
  if (!sentryDsn) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError: CaptureRequestError = (...args) => {
  if (!sentryDsn) return;

  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.captureRequestError(...args);
  });
};
