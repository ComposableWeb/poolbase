import * as functions from 'firebase-functions';
import { scrapeHTML } from '../processing';
import { firestore } from '../initFirebase';

export const pageCreateHandler = functions
  .region('europe-west1')
  .runWith({
    timeoutSeconds: 540,
    memory: '1GB',
  })
  .firestore.document('pages/{pageId}')
  .onCreate(async (snapshot, context) => {
    const page = snapshot.data();
    try {
      if (typeof page !== 'undefined' && typeof page.url !== 'undefined') {
        const data = await scrapeHTML(page.url, context.params.pageId);
        await firestore.collection('pages').doc(context.params.pageId).update(data);
      }
    } catch (e) {
      console.log(e);
    }
  });
