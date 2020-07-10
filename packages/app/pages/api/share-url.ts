import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from 'firebase-admin';

// @TODO: refactor to use cloud function
const handler = (
  req: NextApiRequest & { session?: { decodedToken: auth.DecodedIdToken; token: string } },
  res: NextApiResponse
): void => {
  // @TODO: forward the post data to callable firebase function

  res.end();
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
