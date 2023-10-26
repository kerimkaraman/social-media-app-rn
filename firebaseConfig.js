import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAownpMbmEUTLBn2jC911BSvpyuBkbVBes",
  authDomain: "social-media-a1643.firebaseapp.com",
  projectId: "social-media-a1643",
  storageBucket: "social-media-a1643.appspot.com",
  messagingSenderId: "571863275313",
  appId: "1:571863275313:web:0c3a10f590d89fdaf9c210",
};

const app = initializeApp(firebaseConfig);
export const DATABASE = getDatabase(app);
export const STORAGE = getStorage(app);
