import * as functions from 'firebase-functions';
import { firestore } from '../initFirebaseAdmin';

const PROFILE_DEFAULT_VALUES = {
  isEmailPublic: true,
};
const ACCOUNT_DEFAULT_VALUES = {
  isSubscribedToNL: false,
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
        const profileDocRef = await firestore.collection('userProfiles').add({
          ...PROFILE_DEFAULT_VALUES,
          uid,
          displayName,
          photoURL,
          email,
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
