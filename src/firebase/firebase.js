// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsQOLMPrC5RXbDQ1DCtC9gIRA2mgiR8e8",
  authDomain: "internarea-3f71a.firebaseapp.com",
  projectId: "internarea-3f71a",
  storageBucket: "internarea-3f71a.appspot.com",
  messagingSenderId: "788391801629",
  appId: "1:788391801629:web:4afaef1aa79d02b9dca7f4",
  measurementId: "G-76JQVHPPDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export { auth, provider, app, analytics, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, RecaptchaVerifier, signInWithPhoneNumber }