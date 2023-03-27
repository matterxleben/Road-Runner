import React, { useContext } from "react";
import { Typography } from '@material-ui/core';
import { AuthContext } from '../Authentication/AuthDetails'
import { SignInForm } from "./SignInForm";

const SignIn = () => {
    const { authUser } = useContext(AuthContext);

    return (
        <>
            {
                authUser ?
                    <>
                        You are now signed in using <b>{authUser.email}</b>
                    </>
                    :
                    <>
                        <Typography style={{ fontSize: '24px' }}>Log In to your Account (or Register)</Typography>
                        <hr />
                        {/* Form for sign in / registration */}
                        {SignInForm(authUser)}
                    </>
            }
        </>
    );
};

export default SignIn;