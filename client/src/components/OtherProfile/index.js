import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import SiteHeader from '../SiteHeader';
import theme from '../Theme';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import history from '../Navigation/history';
import Grid from '@mui/material/Grid';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

//Dev mode

const serverURL = ''; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require('node-fetch');

const OtherProfile = () => {

    // user info

  var userEmail = "";
  const [userID, setUserID] = React.useState(0);

  // add API to get user ID
  const callApiUserID = async () => {
    const url = serverURL + "/api/getUserID";
    console.log("Email being passed into User ID API: " + userEmail);
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
          setUserID(num);
          console.log("User ID (variable) is now Set To:" + userID);
        });
  }

  // controlling the order in which APIs are called with useEffect hooks

  React.useEffect(() => {
    console.log("Firebase API called to check sign in");
    var email = "";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        console.log("Firebase returned email: " + user.email);
        userEmail = user.email;
        console.log("useEmail variable: " + userEmail);
        console.log("USER IS LOGGED IN");
        // ...
      } else {
        // User is signed out
        console.log("USER IS NOT LOGGED IN");
        history.push('/signIn');
      }
    });
  }, []);  

  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Calling getUserID API with email: " + userEmail);
      getUserID();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

    React.useEffect(() => {
        console.log('Calling getProfile API for other user');
        getProfile();
    }, []);

    React.useEffect(() => {
        console.log('Calling getRuns API for other user');
        getRuns();
    }, []);

    const location = useLocation();
    const selectedFriend = location.state.selectedFriend || location.state.item;


    //profile details from getProfile API
    const [currentProfile, setCurrentProfile] = React.useState([]);

    // API to return current profile
    const callApiGetProfile = async () => {
        const url = serverURL + '/api/getProfile';

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: selectedFriend, 
            }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log('Profile: ', body);
        return body;
    };

    const getProfile = () => {
        callApiGetProfile().then(res => {
            //printing to console what was returned
            console.log('getProfile API Returned: ', res);
            var parsedProfile = JSON.parse(res.express);
            console.log('Profile Parsed: ', parsedProfile);

            // sets stateful variable movies to the value of the list parsedMovies

            setCurrentProfile(parsedProfile);
            console.log('Profile was set');
        });
    };

    

    //run log details from getRuns API
    const [runs, setRuns] = React.useState([]);

    // API to return run
    const callApiGetRuns = async () => {
        const url = serverURL + '/api/getRuns';

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: selectedFriend, // In sprint 2 this will be set to the user ID
            }),
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log('Runs: ', body);
        return body;
    };

    const getRuns = () => {
        callApiGetRuns().then(res => {
            //printing to console what was returned
            console.log('getRuns API Returned: ', res);
            var parsedRuns = JSON.parse(res.express);
            console.log('Runs Parsed: ', parsedRuns);

            // sets stateful variable movies to the value of the list parsedMovies

            setRuns(parsedRuns);
            console.log('Runs was set');
        });
    };

    const onClickDisplay = () => {
        addFriend();
    };

    //api to add friend
    const callApiAddFriend = async () => {
        console.log("Calling add friend with: ", selectedFriend);
        const url = serverURL + "/api/addFriend";

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUserID: userID, // In sprint 2 this will be set to the actual user
                friendID: selectedFriend
            })
        });
        console.log("add friend in api call");

        const body = await response.json();
        console.log("add friend check response");
        if (response.status !== 200) throw Error(body.message);
        console.log("Friend Added Status: ", body);
        return body;
    }

    const addFriend = () => {
        console.log("add friend button pressed, userID: " + userID + " is adding userID: " + selectedFriend);
        callApiAddFriend()
            .then(res => {
                console.log("add friend api completed");
            });
    }

    return (
        <>
            <MuiThemeProvider theme={theme}>
                <SiteHeader />

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <Grid item xs={3}>
                        <Box sx={{ p: 2 }}>
                            <Button variant="outlined" onClick={onClickDisplay}>
                                <b>ADD FRIEND</b>
                            </Button>
                        </Box>
                    </Grid>

                    <div>
                        {' '}
                        {/* apply the class to the outer div */}
                        <div className="runner-info">
                            <h1>
                                {currentProfile.map((item, key) => {
                                    return (
                                        <MenuItem
                                            //data-id={item.id}
                                            value={item}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </h1>
                        </div>
                    </div>

                    <div>
                        <p>
                            {currentProfile.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.bio}
                                    </MenuItem>
                                );
                            })}
                        </p>
                        <h5>
                            {' '}
              City:{' '}
                            {currentProfile.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.city}
                                    </MenuItem>
                                );
                            })}
                        </h5>
                        <h5>
                            {' '}
              Height:{' '}
                            {currentProfile.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.height}
                                    </MenuItem>
                                );
                            })}
                        </h5>
                        <h5>
                            {' '}
              Weight:{' '}
                            {currentProfile.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.weight}
                                    </MenuItem>
                                );
                            })}
                        </h5>
                        <h5>id:{selectedFriend} 
                        </h5>
                    </div>
                </Box>

                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" color="inherit" noWrap>
                        Runner's Log
          </Typography>
                </Box>

                <Box sx={{ width: 1, p: 2 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>date</TableCell>
                                    <TableCell>Distance</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Weather</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {runs.map(row => (
                                    <TableRow key={row.date}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.distance}</TableCell>
                                        <TableCell>{row.duration}</TableCell>
                                        <TableCell>{row.location}</TableCell>
                                        <TableCell>{row.weather}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </MuiThemeProvider>
        </>
    );
};

export default OtherProfile;