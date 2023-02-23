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



//Dev mode
const serverURL = ""; //enable for dev mode

const AddRun= () => {
  // New code below

  const onSave = () => {
    history.push('/');
  }

  const onCancel = () => {
    history.push('/');
  }

//Event Demo Code Below

  const eventDemo = [
    {name: "Toronto Marathon", id: 1},
    {name: "Boston Marathon", id: 2},
    {name: "New York Marathon", id: 3},
    {name: "Miami Marathon", id: 4},
    {name: "N/A", id: 5}
  ];

  const [selectedEvent, setSelectedEvent] = React.useState("");

  const[eventID, setEventID] = React.useState("");

  const handleChangedEvent = (event) => {
    setSelectedEvent(event.target.value);
    setEventID(event.currentTarget.dataset.id);
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
  const[runDateTime, setRunDateTime] = React.useState("");
  const[runLocation, setRunLocation] = React.useState("");

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

  const handleChangedDateTime = (event) => {
    setRunDateTime(event.target.value);
  }

  const handleChangedLocation = (event) => {
    setRunLocation(event.target.value);
  }

  const onSearch = () => {
    getSearchedMovies();
  }

  const[searchedMovies, setSearchedMovies] = React.useState([]);

  const callApiGetSearchedMovies = async () => {
    const url = serverURL + "/api/getSearchedMovies";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nameRun: nameRun,
        runDescription: runDescription,
        runDateTime: runDateTime,
        runLocation: runLocation
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Searched Movies: ", body);
    return body;
  }

  const getSearchedMovies = () => {
    callApiGetSearchedMovies()
      .then(res => {

        //printing to console what was returned
        console.log("getSearchedMovies API Returned: " + res);
        var parsedSearchedMovies = JSON.parse(res.express);
        console.log("Searched Movie List Parsed: ", parsedSearchedMovies);

        // sets stateful variable movies to the value of the list parsedMovies
        setSearchedMovies(parsedSearchedMovies);
      });
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
        label="Total Time (H:MM.SS)" 
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
        id="datetime-run"
        label="Time of Run"
        type="datetime-local"
        value={runDateTime}
        onChange={handleChangedDateTime}
        sx={{ width: 225 }}
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
    {/* <List>
        {searchedMovies.map((item, key) => {
              return (
                <>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary= {
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={"By Director: " + item.directorFullName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={"Average Review Score: " + item.average}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={"Reviews: " + item.reviewList}
                        />
                      </ListItem>
                    </List>}
                  />
                </ListItem>
                <Divider />
                </>
              )
            })
            }
      </List> */}
      </MuiThemeProvider>
    </>
  )
}

export default AddRun;