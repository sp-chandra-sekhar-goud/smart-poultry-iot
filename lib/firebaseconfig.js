
import { getApps ,getApp, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtzSZSZb9K8YcFBIfnVSR1W-5hxeqdoto",
  authDomain: "smart-poultry-4cb35.firebaseapp.com",
  projectId: "smart-poultry-4cb35",
  storageBucket: "smart-poultry-4cb35.appspot.com",
  messagingSenderId: "562836641811",
  appId: "1:562836641811:web:16f1283b494352f67ac7e6",
  measurementId: "G-DX2JNPDBYT"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth}