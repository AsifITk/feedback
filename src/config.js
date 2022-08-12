// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcYaG7cwDLV5syfIxLihylh1qRDbv_g4g",
    authDomain: "anonymous-feedback-afe4e.firebaseapp.com",
    projectId: "anonymous-feedback-afe4e",
    storageBucket: "anonymous-feedback-afe4e.appspot.com",
    messagingSenderId: "950495792861",
    appId: "1:950495792861:web:8d40da178f056ec3895534"
};

// Initialize 
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { auth, db };