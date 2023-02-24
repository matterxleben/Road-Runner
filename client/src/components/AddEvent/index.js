import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Button from '@material-ui/core/Button';
import SiteHeader from '../SiteHeader';
import theme from '../Theme';
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { MuiThemeProvider } from "@material-ui/core/styles";
import history from '../Navigation/history';
import Grid from '@mui/material/Grid';
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



const AddEvent = () => {

  // Declaring stateful variables for each of our fields of the event, as well as functions to handle changes to these
  const[eventName, setEventName] = React.useState("");
  const[eventDate, setEventDate] = React.useState("");
  const[eventLocation, setEventLocation] = React.useState("");

  const handleChangedName = (event) => {
    setEventName(event.target.value);
  }

  const handleChangedDate = (event) => {
    setEventDate(event.target.value);
  }

  const handleChangedLocation = (event) => {
    setEventLocation(event.target.value);
  }

  // Declaring API to send inputted data to event table in DB
  
  const callApiAddEvent = async () => {
    const url = serverURL + "/api/addEvent";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: eventName,
        eventDate: eventDate,
        eventLocation: eventLocation
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Event Added Status: ", body);
    return body;
  }

  const addEvent = () => {
    callApiAddEvent()
      .then(res => {

      });
    }

  // Need to add function to verify inputs

  const verifyInputs = () => {
    var anyErrors = false;
    if(eventName == ""){
      handleOpenNoName();
      anyErrors = true;
    }
    if(eventDate == ""){
      handleOpenNoDate();
      anyErrors = true;
    }
    if(eventLocation == ""){
      handleOpenNoLocation();
      anyErrors = true;
    }
    if(anyErrors == 0) {
      addEvent();
      history.push('/');
    }
  }

  // Stateful variables for modal for each of the fields if they are left blank
  const [openNoName, setNoName] = React.useState(false);

  const handleOpenNoName = () => {
    setNoName(true);
  };

  const handleCloseNoName = () => {
    setNoName(false);
  };

  const [openNoDate, setNoDate] = React.useState(false);

  const handleOpenNoDate = () => {
    setNoDate(true);
  };

  const handleCloseNoDate = () => {
    setNoDate(false);
  };

  const [openNoLocation, setNoLocation] = React.useState(false);

  const handleOpenNoLocation = () => {
    setNoLocation(true);
  };

  const handleCloseNoLocation = () => {
    setNoLocation(false);
  };

  // Function to handle saving the new event, it must first verify there is input for each field, then call API to send to DB, then return to home
  const onSave = () => {
    verifyInputs();
  }

  // When cancelled, need to return to home
  const onCancel = () => {
    history.push('/');
  }

  return (
    <>
    <MuiThemeProvider theme={theme}>
    <Grid
      container
      spacing={0}
      direction="column"
    >
    <SiteHeader/>
    <Box sx={{p: 2}}>
      <Typography variant="h5" color="inherit" noWrap>
        Create Event:
      </Typography>
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="movie-title" 
        label="Enter Event Name" 
        variant="standard" 
        value={eventName}
        onChange={handleChangedName}
        inputProps={{ maxLength: 100 }}
        style={{color: "#000000"}}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="actor"
        type= "date"
        value={eventDate}
        onChange={handleChangedDate}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="movie-director" 
        label="Enter Event Location" 
        variant="standard" 
        value={eventLocation}
        onChange={handleChangedLocation}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick={onSave}
      >
        Save
      </Button>
    </Box>
    <Box sx={{p: 2}}>
      <Button
        variant="outlined"
        onClick = {onCancel}
      >
        Cancel
      </Button>
    </Box>
    <Grid item>
        <Modal
          open={openNoName}
          onClose={handleCloseNoName}
          aria-labelledby="no-name-modal"
          aria-describedby="no-name-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please enter an event name!
          </Alert>
        </Modal>
      </Grid> 
      <Grid item>
        <Modal
          open={openNoDate}
          onClose={handleCloseNoDate}
          aria-labelledby="no-date-modal"
          aria-describedby="no-date-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please enter an event date!
          </Alert>
        </Modal>
      </Grid> 
      <Grid item>
        <Modal
          open={openNoLocation}
          onClose={handleCloseNoLocation}
          aria-labelledby="no-location-modal"
          aria-describedby="no-location-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please enter an event location!
          </Alert>
        </Modal>
      </Grid> 
      </Grid>
      </MuiThemeProvider>
    </>
  )
}

export default AddEvent;