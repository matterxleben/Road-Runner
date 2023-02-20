import React from 'react';
import history from '../Navigation/history';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SiteHeader = () => {
  return (
    <>
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
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}>
            <Button
            key={"JoinEvent"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/JoinEvent')}
            >
            Join Event
            </Button>
            <Button
            key={"AddEvent"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/AddEvent')}
            >
            Add Event
            </Button>
            <Button
            key={"AddFriend"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/AddFriend')}
            >
            Add Friend
            </Button>
            <Button
            key={"AddRun"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/AddRun')}
            >
            Add Run
            </Button>
            <Button
            key={"Profile"}
            sx={{ my: 2, color: "black", display: "block", marginLeft: "auto"}}
            onClick={() => history.push('/Profile')}
            >
            <AccountCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Button>
        </Box>
        </Toolbar>
    </Container>
    </AppBar>
    </>
  )
}

export default SiteHeader;