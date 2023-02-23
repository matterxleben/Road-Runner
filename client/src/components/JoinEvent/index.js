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

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const JoinEvent = () => {

  // Stateful variable for list of events which will be returned from getEvents API

  //const [events, setEvents] = React.useState([]);

  // API to return list of events

  /*
  const callApiGetEvents = async () => {
    const url = serverURL + "/api/getEvents";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Events: ", body);
    return body;
  }

  const getEvents = () => {
    callApiGetEvents()
      .then(res => {

        //printing to console what was returned
        console.log("getEvents API Returned: " + res);
        var parsedEvents = JSON.parse(res.express);
        console.log("Events List Parsed: ", parsedEvents);

        // sets stateful variable movies to the value of the list parsedMovies
        setEvents(parsedEvents);
      });
  }

  React.useEffect(() => {
    getEvents();
  }, []);
  */

  // Stateful variables for selected event from dropdown and its ID
  const [selectedEvent, setSelectedEvent] = React.useState("");

  const[eventID, setEventID] = React.useState("");

  const handleChangedEvent = (event) => {
    setSelectedEvent(event.target.value);
    setEventID(event.currentTarget.dataset.id);
    console.log("Event Name: " + selectedEvent);
    console.log("Event ID: " + eventID);
  };

  // API to send selected event back to database with the user's ID

  /*
  const callApiJoinEvent = async () => {
    const url = serverURL + "/api/joinEvent";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: 1, // In sprint 2 this will be set to the user ID
        eventID: eventID
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Event Joined Status: ", body);
    return body;
  }

  const joinEvent = () => {
    callApiJoinEvent()
      .then(res => {

        //printing to console what was returned
        console.log("joinEvent API Returned: " + res);
        var parsedJoinEventStatus = JSON.parse(res.express);
        console.log("Event Joined Status: ", parsedJoinEventStatus);
      });
    }
    */
    

  // This will call function to verify input, and then send data back to sql to be stored, then redirect user to homepage
  const onClickJoin = () => {
    // Add function here to verify input and present modal if no movie selected
    // joinEvent();
    history.push('/');
  }

  // Redirect user to homepage on cancel
  const onClickCancel = () => {
    history.push('/');
  }

  // Test Data (TO BE REMOVED)

  const eventDemo = [
    {name: "Toronto Marathon", id: 1},
    {name: "Boston Marathon", id: 2},
    {name: "New York Marathon", id: 3},
    {name: "Miami Marathon", id: 4}
  ];

  return (
    <MuiThemeProvider theme={theme}>
    <Grid
      container
      spacing={0}
      direction="column"
    >
      <SiteHeader/>
      <Box sx={{p: 2}}>
        <Typography 
        variant="h5" 
        color="inherit" 
        noWrap
        >
          Join Event:
        </Typography>
      </Box>
      <Box sx={{ width: 1/2, p: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-movie-label">Select an Event</InputLabel>
          <Select
            labelId="select-event-label-id"
            id="select-event-label"
            value={selectedEvent}
            label="Select an Event"
            onChange={handleChangedEvent}
            color="secondary"
          >
          {eventDemo.map((item, key) => {
            return (
              <MenuItem
                data-id={item.id}
                value={item.name}
              >
                {item.name}
              </MenuItem>
            )
          })
          }
          </Select>
        </FormControl>
      </Box>
      <Box sx={{p: 2}}>
        <Button
          variant="outlined"
          onClick={onClickJoin}
        >
          Join
        </Button>
      </Box>
      <Box sx={{p: 2}}>
        <Button
          variant="outlined"
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
    </MuiThemeProvider>
  );
}

export default JoinEvent;