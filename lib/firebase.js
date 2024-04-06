
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtzSZSZb9K8YcFBIfnVSR1W-5hxeqdoto",
  authDomain: "smart-poultry-4cb35.firebaseapp.com",
  projectId: "smart-poultry-4cb35",
  storageBucket: "smart-poultry-4cb35.appspot.com",
  messagingSenderId: "562836641811",
  appId: "1:562836641811:web:01506f00131a92a47ac7e6",
  measurementId: "G-11YT1R2F4K"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);