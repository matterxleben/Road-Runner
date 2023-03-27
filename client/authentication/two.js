import React, { useState } from "react";
import { TextField, Button, Typography } from '@material-ui/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export function SignInForm(authUser) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validation parameters
    const [errorPassword, triggerErrorPassword] = React.useState(false);
    const [errorEmail, triggerErrorEmail] = React.useState(false);

    // Firebase error logging for bad input
    const [errorFirebase, setErrorFirebase] = React.useState("");

    // Sign in: For existing users
    const signIn = (e) => {
        e.preventDefault();

        // Validation
        password === "" ? triggerErrorPassword(true) : triggerErrorPassword(false)
        email === "" ? triggerErrorEmail(true) : triggerErrorEmail(false)

        // If no errors then continue to sign in
        if (password !== "" && email !== "") {
            signInWithEmailAndPassword(auth, email, password)
                // For demo purposes: The user data is logged
                .then((userCredential) => {
                    console.log(userCredential);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorFirebase(getRefinedFirebaseAuthErrorMessage(error.message));
                });
        }
    };

    // Sign up: For new users
    const signUp = (e) => {
        e.preventDefault();

        e.preventDefault();

        // Validation
        password === "" ? triggerErrorPassword(true) : triggerErrorPassword(false)
        email === "" ? triggerErrorEmail(true) : triggerErrorEmail(false)

        // If no errors then continue to sign in
        if (password !== "" && email !== "") {
            createUserWithEmailAndPassword(auth, email, password)
                // For demo purposes: The user data is logged
                .then((userCredential) => {
                    console.log(userCredential);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorFirebase(getRefinedFirebaseAuthErrorMessage(error.message));
                });
        }
    };

    return (
        <form>
            {errorFirebase === "" ? "" :
                <b style={{ color: "darkred" }}>{errorFirebase}</b>
            }
            <TextField
                type="email"
                placeholder="Enter your email"
                value={email}
                helperText={errorEmail ? "Please enter an email" : ""}
                error={errorEmail}
                variant="outlined"
                fullWidth
                style={{ marginBottom: "20px", marginTop: '20px' }}
                onChange={(e) => setEmail(e.target.value)} />
            <TextField
                type="password"
                placeholder="Enter your password"
                value={password}
                helperText={errorPassword ? "Please enter a password" : ""}
                error={errorPassword}
                variant="outlined"
                fullWidth
                style={{ marginBottom: "20px" }}
                onChange={(e) => setPassword(e.target.value)} />
            <Button
                type="submit"
                color="primary"
                fullWidth
                onClick={signIn}
                style={{ marginBottom: '20px' }}
                variant="contained">
                <Typography variant="h6">Log In</Typography>
            </Button>
            <Button
                type="submit"
                color="primary"
                fullWidth
                onClick={signUp}
                variant="contained">
                <Typography variant="h6">Register</Typography>
            </Button>
        </form>
    );
}

function getRefinedFirebaseAuthErrorMessage(errorMesssage) {
    return errorMesssage
        .replace('Firebase: ', '')
        .replace('auth/', '');
}