import React from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../Theme';
import SiteHeader from '../SiteHeader';

const Profile = () => {

    return (
        <>
        <MuiThemeProvider theme={theme}>
          <SiteHeader/>
          </MuiThemeProvider>
        </>
      )

}

export default Profile;