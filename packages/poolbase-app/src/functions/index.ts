import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import next from 'next';
/* TODO: refactor and improve
- [ ] put firebase admin initialization in singleton module
- [ ] create request validation function
- [ ] create data validation function
- [ ] create save function that is backend agnostic
*/
admin.initializeApp();

export const savePage = functions.https.onRequest(
  async (req, res): Promise<void> => {
    // minimal requirement is URL
    if (!req.body.url) {
      res.status(400).send('No url data provided');
    }
    const requestData: { title: string; url: string } = {
      ...req.body,
    };
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin
      .firestore()
      .collection('pages')
      .add(requestData);
    // Send back a message that we've successfully written the message
    res.json({ result: `Page with url: ${writeResult.id} added.` });
  }
);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest(
  async (req, res): Promise<void> => {
    console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
    await app.prepare();
    handle(req, res);
  }
);
