import * as functions from 'firebase-functions';
import { firestore } from '../initFirebaseAdmin';
export const userCreateHandler = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (userRecord) => {
    try {
      const { email, displayName, photoURL, uid } = userRecord;
      return await firestore.collection('users').add({
        uid,
        email,
        displayName,
        photoURL,
      });
    } catch (e) {
      console.error(e);
    }
  });
