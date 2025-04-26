// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhy4mode-YDad9zStqxw950Ly_xr2STSI",
  authDomain: "neurocue-66816.firebaseapp.com",
  projectId: "neurocue-66816",
  storageBucket: "neurocue-66816.firebasestorage.app",
  messagingSenderId: "489620184251",
  appId: "1:489620184251:web:fd28755551403b04495d9e",
  measurementId: "G-QFKMZ9JS4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
