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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';

const SignIn = () => {

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChangedEmail = (event) => {
      setUserEmail(event.target.value);
  }

  const handleChangedPassword = (event) => {
      setUserPassword(event.target.value);
  }

  // Stateful variables for modal for empty fields
  const [openError, setError] = React.useState(false);

  const handleOpenError = () => {
      setError(true);
  };

  const handleCloseError = () => {
      setError(false);
  };

  // Stateful var for modal for incorrect entry
  const[inputError, setInputError] = React.useState(false);

  const handleOpenInputError = () => {
    setInputError(true);
  };

  const handleCloseInputError = () => {
    setInputError(false);
  };

  // Need to add function to verify passwords are correct, passing info to back end to verify

  const verifyNotEmpty = () => {
    return userEmail !== "" && userPassword !== "";
  }

  // verify email and password are correct, if so re route to home page, if not pop-up modal
  const onSignIn = (e) => {
    e.preventDefault();
        
    if (verifyNotEmpty()) {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            history.push('/');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setInputError(true);
        });
    } else {
        handleOpenError();
    }

}



// clears fields
const onClear = () => {
    setUserEmail("");
    setUserPassword("");
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
        Sign-In:
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

    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick={onSignIn}
      >
        Sign In
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
        Don't have an account?
      </Typography>
    </Box>

    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick = {() => history.push('/signUp')}
      >
        Create an Account
      </Button>
    </Box>

    <Modal
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="passwords-issue-modal"
        aria-describedby="password-issue-modal-desc"
    >
        <Alert 
        severity="error"
        variant="filled"
        >
        Please enter an email and password!
        </Alert>
    </Modal>

    <Modal
        open={inputError}
        onClose={handleCloseInputError}
        aria-labelledby="input-issue-modal"
        aria-describedby="input-issue-modal-desc"
    >
        <Alert 
        severity="error"
        variant="filled"
        >
        Your email or password is incorrect!
        </Alert>
    </Modal>

    </MuiThemeProvider>
    </>
  )
}

export default SignIn;