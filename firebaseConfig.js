import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsLTZfn3iU-T6K8kNjE4GkbpDqpzVBZN8",
  authDomain: "social-media-rn-a339e.firebaseapp.com",
  projectId: "social-media-rn-a339e",
  storageBucket: "social-media-rn-a339e.appspot.com",
  messagingSenderId: "744895901778",
  appId: "1:744895901778:web:e125df80203c5b9147af8b",
};
const app = initializeApp(firebaseConfig);
export const AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const STORAGE = getStorage(app);
export const FIRESTORE = getFirestore(app);
