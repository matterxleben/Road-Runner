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

const SignUp = () => {

    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [userPasswordConfirmation, setUserPasswordConfirmation] = React.useState("");

    const handleChangedEmail = (event) => {
        setUserEmail(event.target.value);
    }

    const handleChangedPassword = (event) => {
        setUserPassword(event.target.value);
    }

    const handleChangedPasswordConfirmation = (event) => {
        setUserPasswordConfirmation(event.target.value);
    }

    // Need to add function to verify passwords are correct, if not pop up modal
    const verifyPassword = () => {

    }

    // add API to pass new users password and email to backend, called on clicking sign up after password has been verified
    const onSignUp = () => {
        verifyPassword();

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

    </MuiThemeProvider>
    </>
  )
}

export default SignUp;