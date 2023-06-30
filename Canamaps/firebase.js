// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseKey from "./keys.json"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAJFX-J1lvQqzhGmG2SXClBqYYERojXvw",
  authDomain: "canamaps.firebaseapp.com",
  projectId: "canamaps",
  storageBucket: "canamaps.appspot.com",
  messagingSenderId: "583676588888",
  appId: "1:583676588888:web:1a236a70bfd40471126b2d",
  measurementId: "G-CNDQZSGSX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app }