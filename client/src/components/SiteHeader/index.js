import React from 'react';
import history from '../Navigation/history';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

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
            key={"CreateEvent"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/CreateEvent')}
            >
            Create Event
            </Button>
            <Button
            key={"Reviews"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/Reviews')}
            >
            Reviews
            </Button>
            <Button
            key={"JoinEvent"}
            sx={{ my: 2, color: "black", display: "block" }}
            onClick={() => history.push('/JoinEvent')}
            >
            Join Event
            </Button>
        </Box>
        </Toolbar>
    </Container>
    </AppBar>
    </>
  )
}

export default SiteHeader;