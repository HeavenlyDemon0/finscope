import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyBbksdjOvxOTbl4EdUY149PwBcBNRuM0L4",
  authDomain: "finscope-dbd3f.firebaseapp.com",
  projectId: "finscope-dbd3f",
  storageBucket: "finscope-dbd3f.firebasestorage.app",
  messagingSenderId: "707059338418",
  appId: "1:707059338418:web:f2f7b19e59d542f7328dab",
  measurementId: "G-6LNV7V1ZR2"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ADD THIS

