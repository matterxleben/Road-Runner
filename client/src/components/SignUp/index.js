import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TextField from "@mui/material/TextField";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../Theme';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const SignUp = () => {

    //const auth = getAuth();

    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [userPasswordConfirmation, setUserPasswordConfirmation] = React.useState("");
    const [userID, setUserID] = React.useState(0);

    const handleChangedUserID = (event) => {
        setUserID(event.target.value);
    }

    const handleChangedEmail = (event) => {
        setUserEmail(event.target.value);
    }

    const handleChangedPassword = (event) => {
        setUserPassword(event.target.value);
    }

    const handleChangedPasswordConfirmation = (event) => {
        setUserPasswordConfirmation(event.target.value);
    }

    // Stateful variables for modal for password incorrect
    const [openPasswordError, setPasswordError] = React.useState(false);

    const handleOpenPasswordError = () => {
        setPasswordError(true);
    };

    const handleClosePasswordError = () => {
        setPasswordError(false);
    };

    // Need to add function to verify passwords are correct, if not pop up modal
    const verifyPassword = () => {
        return userPassword === userPasswordConfirmation;
    }

    // add API to pass new users password and email to backend, called on clicking sign up after password has been verified
    const callApiAddUser = async () => {
        const url = serverURL + "/api/addUser";
    
        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: userEmail
          })
        });
    
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User Added Status: ", body);
        return body;
    };
    
    const addUser = () => {
        callApiAddUser()
          .then(res => {
            //getUserID();
          });
    }

    // add API to get user ID
    const callApiUserID = async () => {
        const url = serverURL + "/api/getUserID";
    
        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: userEmail
          })

        });
    
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User ID: ", body);
        return body;
    };
    
    const getUserID = () => {
        callApiUserID()
          .then(res => {
            
            //printing to console what was returned
            console.log("getUserID API Returned: " + res);
            var parsedID = JSON.parse(res.express);
            console.log("User ID Parsed: ", parsedID);
            var num = parsedID[0].userID;
            console.log(num);
            setUserID(30);
            console.log("User ID Set To:" + userID);
          });
    }


    const onSignUp = async (e) => {
        e.preventDefault();

        if (verifyPassword() ) {
            /*
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                history.push('/signIn');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
            */
            addUser();
            
            history.push('/signIn');
        } else {
            handleOpenPasswordError();
        }
    }

    // clears fields
    const onClear = () => {
        setUserEmail("");
        setUserPassword("");
        setUserPasswordConfirmation("");
    }

  return (
    <>
    <MuiThemeProvider theme={theme}>
    <AppBar 
      position="static"
      style={{ background: '#72c6ed'}}
      >
    <Container maxWidth="false">
        <Toolbar disableGutters>
        <Button
          key={"Landing"}
          sx={{ color: "black", fontWeight: 'bold'}}
          onClick={() => history.push('/')}
          >
            RoadRunner
            <DirectionsRunIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        </Button>
        </Toolbar>
    </Container>
    </AppBar>
    <Box sx={{p: 2}}>
      <Typography variant="h5" color="inherit" noWrap>
        Sign-Up:
      </Typography>
    </Box>
    <Box sx={{ width: 1 / 2, p: 2 }}>
        <TextField
            fullWidth
            id="email"
            label="Enter your Email"
            variant="standard"
            value={userEmail}
            onChange={handleChangedEmail}
            inputProps={{ maxLength: 100 }}
            style={{ color: "#000000" }}
        />
    </Box>

    <Box sx={{ width: 1 / 2, p: 2 }}>
        <TextField
            fullWidth
            id="password"
            label="Enter your Password"
            variant="standard"
            value={userPassword}
            onChange={handleChangedPassword}
            inputProps={{ maxLength: 1000 }}
        />
    </Box>

    <Box sx={{ width: 1 / 2, p: 2 }}>
        <TextField
            fullWidth
            id="passwordVerification"
            label="Confirm your Password"
            variant="standard"
            value={userPasswordConfirmation}
            onChange={handleChangedPasswordConfirmation}
            inputProps={{ maxLength: 1000 }}
        />
    </Box>

    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick={onSignUp}
      >
        Sign Up
      </Button>
    </Box>

    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick = {onClear}
      >
        Clear
      </Button>
    </Box>

    <Box sx={{p: 2}}>
      <Typography variant="h7" color="inherit" noWrap>
        Already have an account?
      </Typography>
    </Box>

    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick = {() => history.push('/signIn')}
      >
        Sign In
      </Button>
    </Box>

    <Modal
        open={openPasswordError}
        onClose={handleClosePasswordError}
        aria-labelledby="passwords-issue-modal"
        aria-describedby="password-issue-modal-desc"
    >
        <Alert 
        severity="error"
        variant="filled"
        >
        Please enter matching passwords!
        </Alert>
    </Modal>

    </MuiThemeProvider>
    </>
  )
}

export default SignUp;