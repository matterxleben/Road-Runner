// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDmk0Ibl-kWZ7hgEnNkadfWqbXUS5acjo",
    authDomain: "roadrunner-775e0.firebaseapp.com",
    databaseURL: "https://roadrunner-775e0-default-rtdb.firebaseio.com",
    projectId: "roadrunner-775e0",
    storageBucket: "roadrunner-775e0.appspot.com",
    messagingSenderId: "831308665444",
    appId: "1:831308665444:web:8b4ed89876643db9bb0571",
    measurementId: "G-XM3EDE26E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);