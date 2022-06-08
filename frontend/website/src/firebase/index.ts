import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ9U-wH43U7z4VOdbexnLj_WxPbpO1kXA",
  authDomain: "gallery-e29e9.firebaseapp.com",
  databaseURL: "https://gallery-e29e9.firebaseio.com",
  projectId: "gallery-e29e9",
  storageBucket: "gallery-e29e9.appspot.com",
  messagingSenderId: "108782296384",
  appId: "1:108782296384:web:e49aa63e6e8ce519552ea5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

