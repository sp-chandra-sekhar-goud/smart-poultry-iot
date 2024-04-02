import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASllWXfJO9aFiA1IDTLbCwEYTJQ3rOqMI",
    authDomain: "poultry-e46da.firebaseapp.com",
    projectId: "poultry-e46da",
    storageBucket: "poultry-e46da.appspot.com",
    messagingSenderId: "83835374891",
    appId: "1:83835374891:web:df64aac0550a0ebf54896e",
    measurementId: "G-P994Q6BR9K"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
