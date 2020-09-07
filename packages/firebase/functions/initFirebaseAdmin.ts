import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();
const firestore = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();
const auth = admin.auth();

export { app, firestore, storage, bucket, auth, functions };
export default admin;
