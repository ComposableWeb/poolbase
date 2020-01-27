import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import next from 'next'

admin.initializeApp();

export const savePage = functions.https.onRequest(async (request, response) => {
  const requestData: { title: string; url: string } = {
    ...request.body,
  };
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection('pages')
    .add(requestData);
  // Send back a message that we've successfully written the message
  response.json({ result: `Page with url: ${writeResult.id} added.` });
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest(async (req, res) => {
  console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
  await app.prepare();
  handle(req, res);
});

