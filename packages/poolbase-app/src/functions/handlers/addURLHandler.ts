import * as functions from 'firebase-functions';
import { DocumentReference, DocumentData } from '@google-cloud/firestore';

import admin, { firestore } from '../initFirebaseAdmin';

import { PageData } from '@poolbase/common';
type URLData = Pick<PageData, 'url' | 'title'>;

export const addURLHandler = functions.region('europe-west1').https.onCall(
  async (data: URLData, context): Promise<void | DocumentReference<DocumentData>> => {
    // Checking attribute.
    if (!(typeof data.url === 'string') || data.url.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with minimum one argument "url" containing the url text to add.'
      );
    }
    // Checking that the user is authenticated.
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
    const urlData: Omit<PageData, 'id'> = {
      ...data,
      created: admin.firestore.FieldValue.serverTimestamp(),
      uid: context.auth.uid,
      status: 'new',
      processed: {},
    };
    // Push the new url into Cloud Firestore using the Firebase Admin SDK.
    return await firestore.collection('pages').add(urlData);
  }
);
