import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.apps[0];
const firestore = firebase.firestore(app);

const auth = firebase.auth(app);
const functions = firebase.app().functions('europe-west1');

export { app, auth, firestore, functions };

export default firebase;
