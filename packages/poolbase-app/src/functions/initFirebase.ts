import * as admin from 'firebase-admin';

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();
const firestore = admin.firestore(app);
const storage = admin.storage();
const bucket = storage.bucket();

export { app, firestore, storage, bucket };
export default admin;
