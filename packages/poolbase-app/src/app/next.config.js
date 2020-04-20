/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

require('./env.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const consola = require('consola');
consola.withTag('app');
consola.wrapConsole();
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['design-system']);
const withPWA = require('next-pwa');
const distDir = process.env.NODE_ENV === 'development' ? '.next' : '../../../../dist/app/functions/next';
const nextConfiguration = {
  distDir,
  // Public, build-time env vars.
  // https://nextjs.org/docs#build-time-configuration
  env: {
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PUBLIC_API_KEY: process.env.FIREBASE_PUBLIC_API_KEY,
  },
};
module.exports = withPlugins([withTM, [withPWA, { dest: 'public' }]], nextConfiguration);
