import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
 
try
{
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
} catch(error) {
    console.log('Error:', error)
}

/*
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh *//* bool);
  }

  doGetUserByEmail = email => this.auth.getUserByEmail(email);

}
*/


export default app;