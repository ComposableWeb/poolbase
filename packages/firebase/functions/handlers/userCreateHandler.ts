import * as functions from 'firebase-functions';
import admin, { firestore } from '../initFirebaseAdmin';

const ACCOUNT_DEFAULT_VALUES = {
  isSubscribedToNL: false,
  created: admin.firestore.FieldValue.serverTimestamp(),
  updated: admin.firestore.FieldValue.serverTimestamp(),
};
export const userCreateHandler = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (userRecord) => {
    const { email, displayName, photoURL, uid } = userRecord;

    try {
      return await firestore
        .collection('users')
        .doc(uid)
        .set({
          ...ACCOUNT_DEFAULT_VALUES,
          uid,
          email,
          name: displayName || '',
          photoURL,
          profile: {
            email,
            displayName: displayName || '',
            photoURL,
            isEmailPublic: false,
          },
        });
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
