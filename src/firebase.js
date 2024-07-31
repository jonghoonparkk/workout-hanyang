// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnd058V-aqyfECpxBsnI1mac8CCiLdS00",
  authDomain: "workout-hanyang-eb7e6.firebaseapp.com",
  projectId: "workout-hanyang-eb7e6",
  storageBucket: "workout-hanyang-eb7e6.appspot.com",
  messagingSenderId: "864328981615",
  appId: "1:864328981615:web:1aabd9b74cfe638c2b419a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
