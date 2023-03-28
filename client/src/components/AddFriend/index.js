import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Button from '@material-ui/core/Button';
import SiteHeader from '../SiteHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../Theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import history from '../Navigation/history';
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


const AddFriend = () => {


    const [users, setUsers] = React.useState([]);

    // API to return list of users

    const callApiGetUsers = async () => {
        const url = serverURL + "/api/getUsers";

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: 1, // In sprint 2 this will be set to the user ID
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Events: ", body);
        return body;
    }

    const getUsers = () => {
        callApiGetUsers()
            .then(res => {

                //printing to console what was returned
                console.log("getUsers API Returned: " + res);
                var parsedUsers = JSON.parse(res.express);
                console.log("Users List Parsed: ", parsedUsers);

                // sets stateful variable movies to the value of the list parsedMovies
                setUsers(parsedUsers);
            });
    }

    React.useEffect(() => {
        console.log("Calling getUsers API");
        getUsers();
    }, []);

    // Stateful variables for selected event from dropdown and its ID
    const [selectedUser, setSelectedUser] = React.useState();

    const [userID, setUserID] = React.useState("");

    const handleChangedUser = (event) => {
        setSelectedUser(event.target.value);
        setUserID(event.target.value.userID);
        console.log("User Name: " + selectedUser);
        console.log("User ID: " + userID);
    };

    //api to add friend
    const callApiAddFriend = async () => {
        console.log("The selected friends ID ", selectedUser.userID);
        const url = serverURL + "/api/addFriend";

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUserID: 1, // In sprint 2 this will be set to the actual user
                friendID: selectedUser.userID
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
        console.log("add friend button pressed");
        callApiAddFriend()
            .then(res => {
                console.log("add friend api called");
            });
    }

    // Function to verify selected event

    const verifyInputs = () => {
        if (selectedUser == "") {
            handleOpenNoEvent();
        } else {
            addFriend();
            history.push('/');
        }
    }

    // Stateful variable for modal, and functions to open and close

    const [openNoEvent, setNoEvent] = React.useState(false);

    const handleOpenNoEvent = () => {
        setNoEvent(true);
    };

    const handleCloseNoEvent = () => {
        setNoEvent(false);
    };

    // This will call function to verify input, and then send data back to sql to be stored, then redirect user to homepage
    const onClickAdd = () => {
        verifyInputs();
    }

    // Redirect user to homepage on cancel
    const onClickCancel = () => {
        history.push('/');
    }




    return (
        <MuiThemeProvider theme={theme}>
            <Grid
                container
                spacing={0}
                direction="column"
            >
                <SiteHeader />
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="h5"
                        color="inherit"
                        noWrap
                    >
                        Add Friends:
        </Typography>
                </Box>
                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-movie-label">Select a User</InputLabel>
                        <Select
                            labelId="select-event-label-id"
                            id="select-event-label"
                            value={selectedUser ?? ""}
                            label="Select an Event"
                            onChange={handleChangedUser}
                            color="secondary"
                        >
                            {users.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.name}
                                    </MenuItem>
                                )
                            })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={onClickAdd}
                    >
                        Add
        </Button>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={onClickCancel}
                    >
                        Cancel
        </Button>
                </Box>
            </Grid>
            <Grid item>
                <Modal
                    open={openNoEvent}
                    onClose={handleCloseNoEvent}
                    aria-labelledby="no-event-modal"
                    aria-describedby="no-event-modal-desc"
                >
                    <Alert
                        severity="error"
                        variant="filled"
                    >
                        Please select a User!
          </Alert>
                </Modal>
            </Grid>
        </MuiThemeProvider>
    );

}

export default AddFriend;