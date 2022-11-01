import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'tonote-894c5.firebaseapp.com',
  projectId: 'tonote-894c5',
  storageBucket: 'tonote-894c5.appspot.com',
  messagingSenderId: '1018818637223',
  appId: '1:1018818637223:web:eb8523961b6baccda79a82'
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;

