import Firebase from 'firebase/app';
import {firestorePlugin} from 'vuefire';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';

const config = {
  apiKey            : env('FIREBASE_APIKEY'),
  authDomain        : env('FIREBASE_AUTHDOMAIN'),
  databaseURL       : env('FIREBASE_DATABASEURL'),
  projectId         : env('FIREBASE_PROJECTID'),
  storageBucket     : env('FIREBASE_STORAGEBUCKET'),
  messagingSenderId : env('FIREBASE_MESSAGINGSENDERID'),
  appId             : env('FIREBASE_APPID')
};

Firebase.initializeApp(config);

export default ({ Vue }) => {
  Vue.use(firestorePlugin);
}

const DB         = Firebase.firestore();
const AUTH       = Firebase.auth();
const FUNCTIONS  = Firebase.app().functions('asia-northeast1');
const STORAGE    = Firebase.storage;
const STORAGEREF = Firebase.storage().ref();

export {
  DB,
  AUTH,
  FUNCTIONS,
  STORAGE,
  STORAGEREF,
}

