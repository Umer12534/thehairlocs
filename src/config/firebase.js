// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB1zY_yZHez42Um8m8V1DoJoDAdtQxwsM4",
  authDomain: "thehairlocs2.firebaseapp.com",
  projectId: "thehairlocs2",
  storageBucket: "thehairlocs2.firebasestorage.app",
  messagingSenderId: "110426222948",
  appId: "1:110426222948:web:a25a3781d359ce1ac58a71",
  measurementId: "G-PPZD2PRG3Q",
  databaseURL: "https://thehairlocs2-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);