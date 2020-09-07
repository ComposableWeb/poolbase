import * as functions from 'firebase-functions';
import * as zod from 'zod';
import { WriteResult } from '@google-cloud/firestore';

import admin, { firestore } from '../initFirebaseAdmin';

import { UserAccountSchema, UserAccountData } from '../common';

export const saveUserAccountHandler = functions.region('europe-west1').https.onCall(
  async (data: UserAccountData, context): Promise<void | WriteResult> => {
    // Validate
    try {
      const valid = UserAccountSchema.parse(data);
      // Checking that the user is authenticated.
      if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
      }

      return await firestore
        .collection('users')
        .doc(context.auth.uid)
        .set({
          ...valid,
          updated: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
      console.error(e);
      // Throwing an HttpsError so that the client gets the error details.
      if (e instanceof zod.ZodError) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          e.errors.map((e) => `${e.path.join('>')} - ${e.message}`).join(' ')
        );
      }
    }
  }
);
