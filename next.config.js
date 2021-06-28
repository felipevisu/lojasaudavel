const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const moduleExports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['loja-saudavel.s3.amazonaws.com'],
    path: '/_next/image',
  },
  productionBrowserSourceMaps: true,
});

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
