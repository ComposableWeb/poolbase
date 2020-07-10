import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL:
    typeof location !== 'undefined' && location.hostname && location.hostname === 'localhost'
      ? 'http://127.0.0.1:8080'
      : process.env.FIREBASE_DATABASE_URL,
  storageBucket: 'poolbasefyi.appspot.com',
  messagingSenderId: '846536999829',
  appId: '1:846536999829:web:49e0728eec1abf65066c9c',
  measurementId: 'G-DRRCH48EFK',
};
const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.apps[0];
const firestore = firebase.firestore(app);
if (typeof location !== 'undefined' && location.hostname && location.hostname === 'localhost') {
  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
  });
  firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

const auth = firebase.auth(app);
const functions = firebase.app().functions('europe-west1');

export { app, auth, firestore, functions };

export default firebase;
