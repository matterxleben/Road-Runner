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

const SignIn = () => {

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChangedEmail = (event) => {
      setUserEmail(event.target.value);
  }

  const handleChangedPassword = (event) => {
      setUserPassword(event.target.value);
  }

  // Need to add function to verify passwords are correct, passing info to back end to verify

  const verifyCredentials = () => {

  }

  // verify email and password are correct, if so re route to home page, if not pop-up modal
  const onSignIn = () => {
    verifyCredentials();
    history.push('/');

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
    </MuiThemeProvider>
    </>
  )
}

export default SignIn;