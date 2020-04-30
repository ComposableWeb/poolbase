import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { auth } from 'firebase-admin';
import admin, { firestore } from '../../../functions/initFirebaseAdmin';

// @TODO: refactor to use cloud function
const handler = async (
  req: NextApiRequest & { session?: { decodedToken: auth.DecodedIdToken; token: string } },
  res: NextApiResponse
): Promise<void> => {
  const form = formidable();
  await form.parse(req, async (err, fields) => {
    if (err) {
      return;
    }
    const urlData = {
      ...fields,
      created: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
      processed: {},
    };
    // Push the new url into Cloud Firestore using the Firebase Admin SDK.
    console.info(urlData, req.session);
    return await firestore.collection('pages').add(urlData);
  });

  res.end();
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
