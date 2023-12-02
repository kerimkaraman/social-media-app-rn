import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQV0PLz1TYJdhBmODUFQA7T3mAK1OIZTQ",
  authDomain: "social-media-rn-19287.firebaseapp.com",
  databaseURL: "https://social-media-rn-19287-default-rtdb.firebaseio.com",
  projectId: "social-media-rn-19287",
  storageBucket: "social-media-rn-19287.appspot.com",
  messagingSenderId: "993555563518",
  appId: "1:993555563518:web:ebfeeca1fb5e5a4f7cb6af",
};

const app = initializeApp(firebaseConfig);
export const DATABASE = getDatabase(app);
export const STORAGE = getStorage(app);
export const AUTH = getAuth(app);
