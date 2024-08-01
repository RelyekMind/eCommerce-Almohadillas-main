import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPdVPTV0d4jqLXl8KOPHNl95fvgiVIB0E",
  authDomain: "almohadillas-epson.firebaseapp.com",
  projectId: "almohadillas-epson",
  storageBucket: "almohadillas-epson.appspot.com",
  messagingSenderId: "98451372518",
  appId: "1:98451372518:web:e1c9c33447c4a2d54802e7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
