'use strict';

require('./env.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const consola = require('consola');
consola.withTag('app');
consola.wrapConsole();

module.exports = {
  distDir: process.env.NODE_ENV === 'development' ? '.next' : '../../../../dist/app/functions/next',
  // Public, build-time env vars.
  // https://nextjs.org/docs#build-time-configuration
  env: {
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PUBLIC_API_KEY: process.env.FIREBASE_PUBLIC_API_KEY,
  },
};
