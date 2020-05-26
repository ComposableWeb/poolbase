import * as functions from 'firebase-functions';
import { WriteResult } from '@google-cloud/firestore';

import admin, { firestore } from '../initFirebaseAdmin';

import { UserAccountSchema, UserAccountData } from '../poolbase-common';

export const saveUserAccountHandler = functions.region('europe-west1').https.onCall(
  async (data: UserAccountData, context): Promise<void | WriteResult> => {
    // Validate
    const valid = await UserAccountSchema.isValid(data);
    if (!valid) {
      UserAccountSchema.validate(data).catch((validationError) => {
        console.error(validationError);
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', validationError.errors.join(' '));
      });
    }
    // Checking that the user is authenticated.
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    return await firestore
      .collection('users')
      .doc(context.auth.uid)
      .set({
        ...data,
        updated: admin.firestore.FieldValue.serverTimestamp(),
      });
  }
);
