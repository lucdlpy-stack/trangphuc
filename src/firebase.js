import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAty3J451qqqYiuNoXGTQX_uKG7lCjGgAM",
  authDomain: "duong-khiem-costum.firebaseapp.com",
  projectId: "duong-khiem-costum",
  storageBucket: "duong-khiem-costum.firebasestorage.app",
  messagingSenderId: "312579083543",
  appId: "1:312579083543:web:1bac6b20502f21f7a77b52"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
