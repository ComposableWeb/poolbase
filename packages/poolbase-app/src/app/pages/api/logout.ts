import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from 'firebase-admin';

import commonMiddleware from '../../utils/middleware/commonMiddleware';

const handler = (
  req: NextApiRequest & { session?: { decodedToken: auth.DecodedIdToken; token: string } },
  res: NextApiResponse
): void => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  req.session = null;
  res.status(200).json({ status: true });
};

export default commonMiddleware(handler);
