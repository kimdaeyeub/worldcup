// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABigPvs-ZXfjUXtVFI_mf8vqQwU_MXgok",
  authDomain: "giftworldcup-aba89.firebaseapp.com",
  projectId: "giftworldcup-aba89",
  storageBucket: "giftworldcup-aba89.appspot.com",
  messagingSenderId: "642222315311",
  appId: "1:642222315311:web:48ed85e72e2f072c97b3da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
