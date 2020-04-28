import * as functions from 'firebase-functions';
import next from 'next';
import express from 'express';
import nextI18NextMiddleware from 'next-i18next/middleware';

import nextI18Next from './i18n';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handle = app.getRequestHandler();
const server = express();
(async (): Promise<void> => {
  await app.prepare();

  await nextI18Next.initPromise;
  server.use(nextI18NextMiddleware(nextI18Next));

  server.get('*', (req, res) => handle(req, res));
})();

export const expressServer = server;
export const nextHandler = functions
  .runWith({
    timeoutSeconds: 540,
  })
  .https.onRequest(server);
