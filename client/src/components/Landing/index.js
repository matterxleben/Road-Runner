import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MuiThemeProvider } from "@material-ui/core/styles";
import SiteHeader from '../SiteHeader';
import theme from '../Theme';
import Link from "@mui/material/Link";

const Landing = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <SiteHeader/>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="inherit" noWrap align="left">
          Welcome to RoadRunner! Your home for all things running!
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="inherit" Wrap align="left">
          The navigation bar found along the top of the page will lead you to other features of the site!
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="inherit" Wrap align="left">
          This site was prepared for <Link href="https://uwaterloo.ca/future-students/programs/management-engineering"> MSCI 342</Link>, a class at the <Link href="https://uwaterloo.ca/"> University of Waterloo</Link>. Thanks for visting!
        </Typography>
      </Box>
    </MuiThemeProvider>
  )

}

export default Landing;