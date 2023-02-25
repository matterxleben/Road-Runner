import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MuiThemeProvider } from "@material-ui/core/styles";
import SiteHeader from '../SiteHeader';
import theme from '../Theme';
import Link from "@mui/material/Link";
import Button from '@material-ui/core/Button';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import history from '../Navigation/history';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

const Landing = () => {

  // Stateful variable for list of events which will be returned from getEventsLanding API
  const [eventsLanding, setEventsLanding] = React.useState([]);

  // API to return list of events
  const callApiGetEventsLanding = async () => {
    const url = serverURL + "/api/getEventsLanding";

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

  const getEventsLanding = () => {
    callApiGetEventsLanding()
      .then(res => {

        //printing to console what was returned
        console.log("getEventsLanding API Returned: " + res);
        var parsedEventsLanding = JSON.parse(res.express);
        console.log("Events List Landing Parsed: ", parsedEventsLanding);

        // sets stateful variable movies to the value of the list parsedMovies
        setEventsLanding(parsedEventsLanding);
      });
  }

  React.useEffect(() => {
    console.log("Calling getEventsLanding API");
    getEventsLanding();
  }, []);  

  //setEvents(eventDemo);

  // Stateful variables for selected event and its ID
  const [selectedEvent, setSelectedEvent] = React.useState();

  const[eventID, setEventID] = React.useState("");

  const handleChangedEvent = (event) => {
    setSelectedEvent(event.target.value);
    setEventID(event.target.value.eventID);
    console.log("Event Name: " + selectedEvent);
    console.log("Event ID: " + eventID);
  };

  const leaderboardData = [
    { id: 1, name: 'Matthew Erxleben', totalkm: 25, avgpace: '6:54', totalruns: 8 },
    { id: 2, name: 'Aidan Lehal', totalkm: 15, avgpace: '5:00', totalruns: 6 },
    { id: 3, name: 'Justin Villar', totalkm: 50, avgpace: '5:59', totalruns: 15 },
    { id: 4, name: 'John Kachura', totalkm: 2, avgpace: '10:32', totalruns: 3 },
  ];

  const runLogData = [
    { id: 1, name: 'Matthew Erxleben', runtitle: 'Grind on a sunday', distance: 5, duration: '30:12', pace: '6:01', date: 'Feb 21, 2023', weather: 'Sunny', location: 'Toronto', description:'Solid run, was grinding tho during the last km'},
    { id: 2, name: 'Aidan Lehal', runtitle: 'Bad Saturday run', distance: 8, duration: '45:12', pace: '7:12', date: 'Feb 20, 2023', weather: 'Cloudy', location: 'Missisauga', description:'Bad run, felt horrible'},
    { id: 3, name: 'Matthew Erxleben', runtitle: 'Rainy run', distance: 5, duration: '40:27', pace: '8:11', date: 'Feb 20, 2023', weather: 'Raining', location: 'Oakville', description:'Ok, wasnt the best'},
  ];

  const [displayEventLeaderboardData, setDisplayEventLeaderboardData] = React.useState([]);


  const callApiDisplayEventLeaderboard = async () => {
    const url = serverURL + "/api/displayEventLeaderboard";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: 1, // In sprint 2 this will be set to the user ID
        eventID: eventID // event ID is stored as a stateful variable, and will hold the value of selected event from the dropdown
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Event Displayed Status: ", body);
    return body;
  }

  const displayEventLeaderboard = () => {
    callApiDisplayEventLeaderboard()
      .then(res => {

        //printing to console what was returned
        console.log("displayEventLeaderboard API Returned: " + res);
        var parsedDisplayEventLeaderboardData = JSON.parse(res.express);
        console.log("Leaderboard Landing Parsed: ", parsedDisplayEventLeaderboardData);

        // sets stateful variable displayEventLeaderboardData to the value of the list parsedDisplayEventLeaderboardData
        setDisplayEventLeaderboardData(parsedDisplayEventLeaderboardData);
      });
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Run log


const [displayEventRunLogData, setDisplayEventRunLogData] = React.useState([]);


const callApiDisplayEventRunLog = async () => {
  const url = serverURL + "/api/displayEventRunLog";

  // waiting on response from api call of type POST which will be in the form of a json object
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userID: 1, // In sprint 2 this will be set to the user ID
      eventID: eventID // event ID is stored as a stateful variable, and will hold the value of selected event from the dropdown
    })
  });

  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  console.log("Event Displayed Status: ", body);
  return body;
}

const displayEventRunLog = () => {
  callApiDisplayEventRunLog()
    .then(res => {

      //printing to console what was returned
      console.log("displayEventRunLog API Returned: " + res);
      var parsedDisplayEventRunLogData = JSON.parse(res.express);
      console.log("RunLog Landing Parsed: ", parsedDisplayEventRunLogData);

      // sets stateful variable displayEventLeaderboardData to the value of the list parsedDisplayEventLeaderboardData
      setDisplayEventRunLogData(parsedDisplayEventRunLogData);
    });
}



  // Function to verify selected event
  const verifyInputs = () => {
    if(selectedEvent == ""){
      handleOpenNoEvent();
    } else {
      displayEventLeaderboard();
      displayEventRunLog();
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

  // This will call function to verify input, then display all information for that event on the landing page
  const onClickDisplay = () => {
    verifyInputs();
  }

  return (
    <MuiThemeProvider theme={theme}>
    <SiteHeader/>
    <Grid
      container
      spacing={0}
      direction="column"
      
    >
      
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="inherit" noWrap align="left">
          Welcome to RoadRunner! Your home for all things running!
        </Typography>
      </Box>
      <Grid
      container
      spacing={2}
      justifyContent="space-between" alignItems="center"
      >
        <Grid item xs = {9}>
          <Box sx={{ width: 1/2, p: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="select-movie-label">Select an Event</InputLabel>
              <Select
                labelId="select-event-label-id"
                id="select-event-label"
                value={selectedEvent ?? ""}
                label="Select an Event"
                onChange={handleChangedEvent}
                color="secondary"
              >
              {eventsLanding.map((item, key) => {
                return (
                  <MenuItem
                    //data-id={item.id}
                    //value={item.name}
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
        </Grid>
        <Grid item xs = {3}>
          <Box sx={{p: 2}}>
            <Button
                variant="outlined"
                onClick={onClickDisplay}
              >
                Display Leaderboard & Run Log
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="inherit" noWrap align="left">
          Leaderboard:
        </Typography>
      </Box>
      <Box sx={{ width: 1, p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Total Distance (KM)</TableCell>
                <TableCell>Total Number of runs</TableCell>
                <TableCell>Minimum Pace (HH:MM:SS / KM)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayEventLeaderboardData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.total_distance}</TableCell>
                  <TableCell>{row.number_of_runs}</TableCell>
                  <TableCell>{row.min_pace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="inherit" noWrap align="left">
          Run Log:
        </Typography>
      </Box>
      <Box sx={{ width: 1, p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Run Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Distance (KM)</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Pace (HH:MM:SS / KM)</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Weather</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayEventRunLogData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.distance}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.pace}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.weather}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
            Please select an event!
          </Alert>
        </Modal>
    </Grid>
    </MuiThemeProvider>
  )

}

export default Landing;