const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')

const moduleExports = withPWA({
  images: {
    domains: ['loja-saudavel.s3.amazonaws.com'],
    path: '/_next/image',
  },
  productionBrowserSourceMaps: true,
});

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
