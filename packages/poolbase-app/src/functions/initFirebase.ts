import * as admin from 'firebase-admin';

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();
const firestore = admin.firestore(app);

export { app, firestore };
export default admin;
