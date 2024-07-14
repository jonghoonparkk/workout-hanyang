import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw-QVIBIGNwfbtFUxvepsN1qklJ9XsVz0",
  authDomain: "workout-hanyang.firebaseapp.com",
  projectId: "workout-hanyang",
  storageBucket: "workout-hanyang.appspot.com",
  messagingSenderId: "705268870513",
  appId: "1:705268870513:web:fb90e8f80333191b411ad0",
  measurementId: "G-NPY61KX2HT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
