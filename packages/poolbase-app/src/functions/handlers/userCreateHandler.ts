import * as functions from 'firebase-functions';
import { firestore } from '../initFirebaseAdmin';
export const userCreateHandler = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (userRecord) => {
    const { email, displayName, photoURL, uid } = userRecord;
    let userProfileId;
    // if we have a photo or diplayName, we create a public profile
    if (displayName || photoURL) {
      try {
        const profileDocRef = await firestore.collection('userProfiles').add({
          uid,
          displayName,
          photoURL,
        });
        userProfileId = profileDocRef.id;
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
