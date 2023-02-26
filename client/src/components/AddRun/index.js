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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';



//Dev mode
const serverURL = ""; //enable for dev mode

const AddRun= () => {

  // Stateful variable for list of events which will be returned from getEvents API

  const [events, setEvents] = React.useState([]);

  // API to return list of events
  
  const callApiGetEvents = async () => {
    const url = serverURL + "/api/getEvents";

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
    console.log("Calling getEvents API");
    getEvents();
  }, []);

  // Stateful variables for selected event from dropdown and its ID
  const [selectedEvent, setSelectedEvent] = React.useState();

  const[eventID, setEventID] = React.useState("");

  const handleChangedEvent = (event) => {
    setSelectedEvent(event.target.value);
    setEventID(event.target.value.eventID);
    console.log("Event Name: " + selectedEvent);
    console.log("Event ID: " + eventID);
  };


//Weather Demo Code Below

  const weatherDemo = [
    {name: "Sunny", id: 1},
    {name: "Rainy", id: 2},
    {name: "Cloudy", id: 3},
    {name: "Humid", id: 4},
    {name: "Snowy", id: 5},
    {name: "Icey", id: 6},
    {name: "Windy", id: 7}
  ];

  const [selectedWeather, setSelectedWeather] = React.useState("");

  const[weatherID, setWeatherID] = React.useState("");

  const handleChangedWeather = (event) => {
    setSelectedWeather(event.target.value);
    setWeatherID(event.currentTarget.dataset.id);
    console.log("Weather Name: " + selectedWeather);
    console.log("Weather ID: " + weatherID);
  };

  // New code above

  
  const[nameRun, setNameRun] = React.useState("");
  const[runDescription, setRunDescription] = React.useState("");
  const[runTime, setRunTime] = React.useState("");
  const[runDistance, setRunDistance] = React.useState("");
  const[runDate, setRunDate] = React.useState("");
  const[runLocation, setRunLocation] = React.useState("");


// Declaring API to send inputted data to event table in DB
  
const callApiAddRun = async () => {
  const url = serverURL + "/api/addRun";

  // waiting on response from api call of type POST which will be in the form of a json object
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userID: 1, // In sprint 2 this will be set to the actual user
      nameRun: nameRun,
      runDescription: runDescription,
      runTime: runTime,
      runDistance: runDistance,
      runDate: runDate,
      eventID: eventID,
      runLocation: runLocation,
      selectedWeather: selectedWeather 
    })
  });

  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  console.log("Run Added Status: ", body);
  return body;
}

const addRun = () => {
  callApiAddRun()
    .then(res => {

    });
  }

  const handleChangedName = (event) => {
    setNameRun(event.target.value);
  }

  const handleChangedDescrip = (event) => {
    setRunDescription(event.target.value);
  }

  const handleRunTime = (event) => {
    setRunTime(event.target.value);
  }

  const handleRunDistance = (event) => {
    setRunDistance(event.target.value);
  }

  const handleChangedDate = (event) => {
    setRunDate(event.target.value);
  }

  const handleChangedLocation = (event) => {
    setRunLocation(event.target.value);
  }


  // const verifyInputs = () => {
  //   var anyErrors = false;
  //   if(nameRun == ""){
  //     handleOpenNoName();
  //     anyErrors = true;
  //   }
  //   if(runDescription == ""){
  //     handleOpenNoDescr();
  //     anyErrors = true;
  //   }
  //   if(runTime == ""){
  //     handleOpenNoTime();
  //     anyErrors = true;
  //   }
  //   if(runDistance == ""){
  //     handleOpenNoDist();
  //     anyErrors = true;
  //   }
  //   if(runDate == ""){
  //     handleOpenNoDate();
  //     anyErrors = true;
  //   }
  //   if(runLocation == ""){
  //     handleOpenNoLocation();
  //     anyErrors = true;
  //   }
  //   if(selectedWeather = ""){
  //     handleOpenNoWeather();
  //     anyErrors = true;
  //   }
  //   if(anyErrors == 0) {
  //     addRun();
  //     history.push('/');
  //   }
  // }

  // // Stateful variables for modal for each of the fields if they are left blank
  // const [openNoName, setNoName] = React.useState(false);

  // const handleOpenNoName = () => {
  //   setNoName(true);
  // };

  // const handleCloseNoName = () => {
  //   setNoName(false);
  // };

  // const [openNoDescr, setNoDescr] = React.useState(false);

  // const handleOpenNoDescr = () => {
  //   setNoDescr(true);
  // };

  // const handleCloseNoDescr = () => {
  //   setNoDescr(false);
  // };

  // const [openNoTime, setNoTime] = React.useState(false);

  // const handleOpenNoTime = () => {
  //   setNoTime(true);
  // };

  // const handleCloseNoTime = () => {
  //   setNoTime(false);
  // };

  // const [openNoDist, setNoDist] = React.useState(false);

  // const handleOpenNoDist = () => {
  //   setNoDist(true);
  // };

  // const handleCloseNoDist = () => {
  //   setNoDist(false);
  // };

  // const [openNoDate, setNoDate] = React.useState(false);

  // const handleOpenNoDate = () => {
  //   setNoDate(true);
  // };

  // const handleCloseNoDate = () => {
  //   setNoDate(false);
  // };

  //  const [openNoLocation, setNoLocation] = React.useState(false);

  // const handleOpenNoLocation = () => {
  //   setNoLocation(true);
  // };

  // const handleCloseNoLocation = () => {
  //   setNoLocation(false);
  // };

  // const [openNoWeather, setNoWeather] = React.useState(false);

  // const handleOpenNoWeather = () => {
  //   setNoWeather(true);
  // };

  // const handleCloseNoWeather = () => {
  //   setNoWeather(false);
  // };

   // Function to handle saving the new event, it must first verify there is input for each field, then call API to send to DB, then return to home
   const onSave = () => {
    //verifyInputs();
    addRun();
    history.push('/');
  }

  // When cancelled, need to return to home
  const onCancel = () => {
    history.push('/');
  }

  return (
    <>
    <MuiThemeProvider theme={theme}>
      <SiteHeader/>
    <Box sx={{p: 2}}>
      <Typography variant="h5" color="inherit" noWrap>
        Add Run:
      </Typography>
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="run-name" 
        label="Enter Name of Run" 
        variant="standard" 
        value={nameRun}
        onChange={handleChangedName}
        inputProps={{ maxLength: 100 }}
        style={{color: "#000000"}}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="run-description" 
        label="Enter Run Description" 
        variant="standard" 
        value={runDescription}
        onChange={handleChangedDescrip}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="run-time" 
        label="Total Time (HH:MM:SS:MS)" 
        variant="standard" 
        value={runTime}
        onChange={handleRunTime}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="run-distance" 
        label="Enter Distance (km)" 
        variant="standard" 
        type="numeric"
        value={runDistance}
        onChange={handleRunDistance}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
    <TextField
        id="date-run"
        label="Day of Run"
        type="date"
        value={runDate}
        onChange={handleChangedDate}
        sx={{ width: 200 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
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
          {events.map((item, key) => {
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
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="run-location" 
        label="Enter Run Location" 
        variant="standard" 
        value={runLocation}
        onChange={handleChangedLocation}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2 }}>
        <FormControl fullWidth >
          <InputLabel id="select-weather-label">Weather</InputLabel>
          <Select
            labelId="select-weather-label-id"
            id="select-weather-label"
            value={selectedWeather}
            label="Select what type of Weather"
            onChange={handleChangedWeather}
            color="secondary"
          >
          {weatherDemo.map((item, key) => {
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
      </MuiThemeProvider>
    </>
  )
}

export default AddRun;