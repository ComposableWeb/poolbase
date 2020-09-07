/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

require('./env.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const consola = require('consola');
consola.withTag('app');
consola.wrapConsole();
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@poolbase/design-system', '@poolbase/common']);
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const distDir = process.env.NODE_ENV === 'development' ? '.next' : '../../../../dist/app/functions/next';
const nextConfiguration = {
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
  },
  distDir,
  // Public, build-time env vars.
  // https://nextjs.org/docs#build-time-configuration
  env: {
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PUBLIC_API_KEY: process.env.FIREBASE_PUBLIC_API_KEY,
  },

    redirects() {
      return [
        {
          source: '/',
          permanent: true,
          destination: '/en',
        },
      ];
    },

};
module.exports = withPlugins([withTM, withPWA, withBundleAnalyzer], nextConfiguration);
