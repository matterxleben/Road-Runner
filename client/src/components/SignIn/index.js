import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

const SignIn = () => {

  return (
    <div>
      <Typography variant="h3" color="inherit" noWrap>
        This is Sign In Page
      </Typography>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/')}
      >
        <Typography variant="h5" color="inherit" noWrap>
          Navigate to Landing Page
        </Typography>
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/Home')}
      >
        <Typography variant="h5" color="inherit" noWrap>
          Navigate to Home Page
        </Typography>
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/Search')}
      >
        <Typography variant="h5" color="inherit" noWrap>
          Navigate to Search Page
        </Typography>
      </Link>

    </div>
  )
}

export default SignIn;