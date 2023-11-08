// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBST74Lxhudjar5Ibdel42ANAWIOcBFCgI",
  authDomain: "tasky-react.firebaseapp.com",
  projectId: "tasky-react",
  storageBucket: "tasky-react.appspot.com",
  messagingSenderId: "1042974291739",
  appId: "1:1042974291739:web:cf4b0ad06f66ea0dd145be",
  measurementId: "G-DX3FHRKLFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();