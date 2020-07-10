import * as functions from 'firebase-functions';
import admin, { firestore } from '../initFirebaseAdmin';

const PROFILE_DEFAULT_VALUES = {
  isEmailPublic: true,
  created: admin.firestore.FieldValue.serverTimestamp(),
  updated: admin.firestore.FieldValue.serverTimestamp(),
};
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
    let userProfileId;
    // if we have a photo or diplayName, we create a public profile
    if (displayName || photoURL || email) {
      try {
        await firestore
          .collection('userProfiles')
          .doc(uid)
          .set({
            ...PROFILE_DEFAULT_VALUES,
            uid,
            displayName,
            photoURL,
            email,
          });
        userProfileId = uid;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }

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
          ...(!!userProfileId && {
            userProfileId,
          }),
        });
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
