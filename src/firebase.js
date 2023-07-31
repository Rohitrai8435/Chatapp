// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBPuGnBR4oWj4OamH1oPECwfKA_b49oR7g",
  authDomain: "chatapplication-71a96.firebaseapp.com",
  databaseURL: "https://chatapplication-71a96-default-rtdb.firebaseio.com",
  projectId: "chatapplication-71a96",
  storageBucket: "chatapplication-71a96.appspot.com",
  messagingSenderId: "20940595563",
  appId: "1:20940595563:web:5b1d68f822452ee11fac2e",
  measurementId: "G-Z6NLRREHW8"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const storage =getStorage();
 export const db=getFirestore();