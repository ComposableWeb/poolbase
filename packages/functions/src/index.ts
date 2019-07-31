import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
  // Send back a message that we've succesfully written the message
  response.json({ result: `Page with url: ${writeResult.id} added.` });
});
