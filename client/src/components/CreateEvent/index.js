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

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");



const CreateEvent = () => {

  // New code below

  const onSave = () => {
    history.push('/');
  }

  const onCancel = () => {
    history.push('/');
  }

  // New code above

  
  const[searchTitle, setSearchTitle] = React.useState("");
  const[searchActor, setSearchActor] = React.useState("");
  const[searchDirector, setSearchDirector] = React.useState("");

  const handleChangedTitle = (event) => {
    setSearchTitle(event.target.value);
  }

  const handleChangedActor = (event) => {
    setSearchActor(event.target.value);
  }

  const handleChangedDirector = (event) => {
    setSearchDirector(event.target.value);
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
        searchTitle: searchTitle,
        searchActor: searchActor,
        searchDirector: searchDirector
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
        Create Event:
      </Typography>
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="movie-title" 
        label="Enter Event Name" 
        variant="standard" 
        value={searchTitle}
        onChange={handleChangedTitle}
        inputProps={{ maxLength: 100 }}
        style={{color: "#000000"}}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="actor" 
        label="Enter Event Date" 
        variant="standard" 
        value={searchActor}
        onChange={handleChangedActor}
        inputProps={{ maxLength: 100 }}
      />
    </Box>
    <Box sx={{ width: 1/2, p: 2}}>
      <TextField 
        fullWidth 
        id="movie-director" 
        label="Enter Event Location" 
        variant="standard" 
        value={searchDirector}
        onChange={handleChangedDirector}
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
    <List>
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
      </List>
      </MuiThemeProvider>
    </>
  )
}

export default CreateEvent;