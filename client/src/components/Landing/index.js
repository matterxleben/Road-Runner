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

const Landing = () => {

  const eventDemo = [
    {name: "All Friends", id: 1},
    {name: "Boston Marathon", id: 2},
    {name: "New York Marathon", id: 3},
    {name: "Miami Marathon", id: 4},
    {name: "Toronto Marathon", id: 5}
  ];

  //setEvents(eventDemo);

  // Stateful variables for selected event and its ID
  const [selectedEvent, setSelectedEvent] = React.useState("");

  const[eventID, setEventID] = React.useState("");

  const handleChangedEvent = (event) => {
    setSelectedEvent(event.target.value);
    setEventID(event.currentTarget.dataset.id);
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

  // This will call function to verify input, and then display data on 
  const onClickLeaderboard = () => {
    history.push('/');
  }

  // justifyContent="space-between" alignItems="center"
  /*       
  <Grid item xs={6}>
  Item 1
  </Grid>
  <Grid item xs={6}>
    Item 2
  </Grid>
  */

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
        </Grid>
        <Grid item xs = {3}>
          <Box sx={{p: 2}}>
            <Button
                variant="outlined"
                onClick={onClickLeaderboard}
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
                <TableCell>Total Distance (km)</TableCell>
                <TableCell>Total Number of runs</TableCell>
                <TableCell>Average Pace (minutes/km)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.totalkm}</TableCell>
                  <TableCell>{row.totalruns}</TableCell>
                  <TableCell>{row.avgpace}</TableCell>
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
                <TableCell>Distance (km)</TableCell>
                <TableCell>Duration (mins)</TableCell>
                <TableCell>Pace (minutes/km)</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Weather</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runLogData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.runtitle}</TableCell>
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
    </Grid>
    </MuiThemeProvider>
  )

}

export default Landing;