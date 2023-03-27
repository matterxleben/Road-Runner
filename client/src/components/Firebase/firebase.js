// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCoOXYZOWMfrG2lfWDgOIvw4l0mE9855_A",
    authDomain: "buddyfinder-e5b18.firebaseapp.com",
    projectId: "buddyfinder-e5b18",
    storageBucket: "buddyfinder-e5b18.appspot.com",
    messagingSenderId: "357117456271",
    appId: "1:357117456271:web:0f1ffc5a25ab0530ffe5fa",
    measurementId: "G-C8GDMKFJTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);