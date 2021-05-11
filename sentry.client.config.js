import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  environment: "production",
  dsn: SENTRY_DSN || 'https://8cf83e43c2bb4700a32c9f5ddb08c1ee@o491419.ingest.sentry.io/5559997',
});
