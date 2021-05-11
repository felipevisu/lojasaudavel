const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const moduleExports = withPWA({
  images: {
    domains: ['loja-saudavel.s3.amazonaws.com'],
    path: '/_next/image',
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  productionBrowserSourceMaps: true,
});

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
