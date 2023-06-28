// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from 'firebase';
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
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth()
const analytics = getAnalytics(app);

export { auth }