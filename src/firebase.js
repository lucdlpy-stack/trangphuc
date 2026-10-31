import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAty3J451qqqYiuNoXGTQX_uKG7lCjGgAM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "duong-khiem-costum.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "duong-khiem-costum",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "duong-khiem-costum.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "312579083543",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:312579083543:web:1bac6b20502f21f7a77b52"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
