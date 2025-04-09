import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5fR12H29f2MEBcksvTk-E9oiV_MVcoUo", // replace with your actual keys
  authDomain: "edumate-93b81.firebaseapp.com",
  projectId: "edumate-93b81",
  storageBucket: "edumate-93b81.firebasestorage.app",
  messagingSenderId: "811835389646",
  appId: "1:811835389646:web:ea0ad9de9fe5b330fdc29f",
  measurementId: "G-RHHW8DFMSL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);