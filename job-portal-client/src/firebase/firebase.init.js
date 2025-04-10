// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

/* const firebaseConfig = {
  apiKey: "AIzaSyACcqYjEmCFlYqi8IEgt09R_OR3wWqzKUo",
  authDomain: "auth-router-context2-ff8cf.firebaseapp.com",
  projectId: "auth-router-context2-ff8cf",
  storageBucket: "auth-router-context2-ff8cf.firebasestorage.app",
  messagingSenderId: "354891421688",
  appId: "1:354891421688:web:7e9c79a003e5b5b4ee680d",
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
