// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyD5UrWPMULiEtgZZOqnCBJhZ2Jtme0K7cc",
  authDomain: "chatapp-df4d5.firebaseapp.com",
  projectId: "chatapp-df4d5",
  storageBucket: "chatapp-df4d5.appspot.com",
  messagingSenderId: "862669025024",
  appId: "1:862669025024:web:463e16e4a49121defacde5",
  measurementId: "G-L3DBJP27QM",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
