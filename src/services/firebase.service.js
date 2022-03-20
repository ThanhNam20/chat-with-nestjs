import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_KEY,
  authDomain: "chat-nestjs.firebaseapp.com",
  projectId: "chat-nestjs",
  storageBucket: "chat-nestjs.appspot.com",
  messagingSenderId: "279639276434",
  appId: "1:279639276434:web:a3b6043387e61eca8f5f4b",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
