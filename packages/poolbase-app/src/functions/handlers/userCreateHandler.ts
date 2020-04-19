import * as functions from 'firebase-functions';
import { firestore } from '../initFirebase';
export const userCreateHandler = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user) => {
    try {
      await firestore.collection('users').add({
        email: user.email,
        emailVerified: user.emailVerified,
        providerData: user.providerData,
      });
    } catch (e) {
      console.log(e);
    }
  });
