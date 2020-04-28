const { setConfig } = require('next/config')

const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default

const NextI18Next = require('next-i18next').default
const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localePath: process.env.NODE_ENV === 'production' ? './locales' : '../../locales',
  localeSubpaths: {
    de: 'de',
  },
});
setConfig(require('./next.config'))
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const port = process.env.PORT || 3000;
(async () => {
  await app.prepare();

  await NextI18NextInstance.initPromise;
  server.use(nextI18NextMiddleware(NextI18NextInstance));

  server.get('*', (req, res) => handle(req, res));
  await server.listen(port)
})();




