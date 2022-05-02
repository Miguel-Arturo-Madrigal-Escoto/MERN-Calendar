
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTaCnh_pp6rxQnNsqxVEZ4ug5fhILI5v8",
  authDomain: "mern-calendar.firebaseapp.com",
  projectId: "mern-calendar",
  storageBucket: "mern-calendar.appspot.com",
  messagingSenderId: "262050419112",
  appId: "1:262050419112:web:b308b88bd8244559edcd9d",
  measurementId: "G-RKGSCLMGWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Base de datos
const db = getFirestore();

// Auth (Google)
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {
    db, googleAuthProvider, githubAuthProvider
}