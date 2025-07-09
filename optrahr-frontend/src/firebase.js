// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVnp01pnhsTJqX6-8ASdfqy7VoTcItUx0",
  authDomain: "optrahr-69e90.firebaseapp.com",
  projectId: "optrahr-69e90",
  storageBucket: "optrahr-69e90.appspot.com", 
  messagingSenderId: "928497504890",
  appId: "1:928497504890:web:7c872375c89c15442961c3",
  measurementId: "G-95PWNE6P4V"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);          // 🔹 For Firestore
const storage = getStorage(app);       // 🔹 For File uploads
const auth = getAuth(app);             // 🔹 For user login/signup (optional)

export { db, storage, auth };
