import * as functions from 'firebase-functions';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handle = app.getRequestHandler();

export const nextHandler = functions.https.onRequest(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req, res): Promise<void | Response> => {
    await app.prepare();
    handle(req, res);
  }
);
