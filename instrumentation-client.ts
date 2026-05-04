const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (sentryDsn) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      tracesSampleRate: 1,
      enableLogs: true,
    });
  });
}

export function onRouterTransitionStart(
  href: string,
  navigationType: "push" | "replace" | "popstate",
): void {
  if (!sentryDsn) return;

  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.captureRouterTransitionStart(href, navigationType);
  });
}
