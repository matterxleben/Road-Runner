import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';
import SiteHeader from '../SiteHeader';
import theme from '../Theme';


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;


const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#FFFFFF",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: 0,
    marginLeft: 0,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});



class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  
  render() {
    const { classes } = this.props;
    const userID = this.state.userID;

    return (
        <>
          <SiteHeader />
          <MuiThemeProvider
          theme={theme}
          >
            <CssBaseline />
            <Review
              classes={classes}
              userID={userID}
            />
          </MuiThemeProvider>
        </>
    );
  }
}

const Review = ({classes, userID}) => {
  
  const [movies, setMovies] = React.useState([]);

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  }

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {

        //printing to console what was returned
        console.log("getMovies API Returned: " + res);
        var parsedMovies = JSON.parse(res.express);
        console.log("Movie List Parsed: ", parsedMovies);

        // sets stateful variable movies to the value of the list parsedMovies
        setMovies(parsedMovies);
      });
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  
  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";

    // waiting on response from api call of type POST which will be in the form of a json object
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: userID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        movieID: movieID
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Review Status: ", body);
    return body;
  }

  const addReview = () => {
    callApiAddReview()
      .then(res => {

        //printing to console what was returned
        console.log("addReview API Returned: " + res);
        var parsedReviewStatus = JSON.parse(res.express);
        console.log("Review Added Status: ", parsedReviewStatus);
      });
    }
  
  const [selectedMovie, setSelectedMovie] = React.useState("");

  const[movieID, setMovieID] = React.useState("");

  const handleChangedMovie = (event) => {
    setSelectedMovie(event.target.value);
    setMovieID(event.currentTarget.dataset.id);
    console.log("Movie Name: " + selectedMovie);
    console.log("Movie ID: " + movieID);
  };

  const [enteredTitle, setReviewTitle] = React.useState("");

  const handleChangedReviewTitle = (event) => {
    setReviewTitle(event.target.value);
  };

  const [enteredReview, setReviewBody] = React.useState("");

  const handleChangedReviewBody = (event) => {
    setReviewBody(event.target.value);
  };

  const [selectedRating, setRating] = React.useState("");

  const handleChangedRating = (event) => {
    setRating(event.target.value);
  };
  
  const verifyInputs = (props) => {
    var anyErrors = false;
    if(selectedMovie == ""){
      handleOpenNoMovie();
      anyErrors = true;
    }
    if(enteredTitle == ""){
      handleOpenNoTitle();
      anyErrors = true;
    }
    if(enteredReview == ""){
      handleOpenNoReview();
      anyErrors = true;
    }
    if(selectedRating == ""){
      handleOpenNoRating();
      anyErrors = true;
    }
    if(anyErrors == 0) {
      addReview();
      handleOpenSuccess();
    }
  }
  
  

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleOpenSuccess = () => {
    console.log("attempting to open modal");
    if (!openSuccess) { setOpenSuccess(true); }
  };

  const handleCloseSuccess = () => {
    console.log("attempting to close modal");
    setOpenSuccess(false);
  };

  const [openNoMovie, setNoMovie] = React.useState(false);

  const handleOpenNoMovie = () => {
    setNoMovie(true);
  };

  const handleCloseNoMovie = () => {
    setNoMovie(false);
  };

  const [openNoTitle, setNoTitle] = React.useState(false);

  const handleOpenNoTitle = () => {
    setNoTitle(true);
  };

  const handleCloseNoTitle = () => {
    setNoTitle(false);
  };

  const [openNoReview, setNoReview] = React.useState(false);

  const handleOpenNoReview = () => {
    setNoReview(true);
  };

  const handleCloseNoReview = () => {
    setNoReview(false);
  };

  const [openNoRating, setNoRating] = React.useState(false);

  const handleOpenNoRating = () => {
    setNoRating(true);
  };

  const handleCloseNoRating = () => {
    setNoRating(false);
  };

  return(
    <Grid
      container
      spacing={5}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ minHeight: '100vh' }}
      className={classes.mainMessageContainer}
    >
      <Grid item>
        <Typography
          variant={"h5"}
        >
          Review a Movie:
        </Typography>
      </Grid>
      <MovieSelection
        selectedMovie={selectedMovie}
        handleChangedMovie={handleChangedMovie}
        movies={movies}
      />
      <ReviewTitle 
        enteredTitle={enteredTitle}
        handleChangedReviewTitle={handleChangedReviewTitle}
      />
      <ReviewBody
        enteredReview={enteredReview}
        handleChangedReviewBody={handleChangedReviewBody}
      />
      <ReviewRating
        selectedRating={selectedRating}
        handleChangedRating={handleChangedRating}
      />
      <Grid item>
        <Button
          variant="outlined"
          onClick={verifyInputs}
        >
          Submit
        </Button>
      </Grid>
        <Modal
          open={openSuccess}
          onBackdropClick={handleCloseSuccess}
          aria-labelledby="Successful-save-modal"
          aria-describedby="successful-save-modal-desc"
        >
          <Alert 
            severity="success"
            variant="filled"
          >
            <AlertTitle>Your review has been saved!</AlertTitle>
            Movie Name: {selectedMovie} 
            <br></br> Review Title: {enteredTitle} 
            <br></br> Review: {enteredReview} 
            <br></br> Rating: {selectedRating}
          </Alert>
        </Modal>
      <Grid item>
        <Modal
          open={openNoMovie}
          onClose={handleCloseNoMovie}
          aria-labelledby="no-movie-modal"
          aria-describedby="no-movie-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please select a movie!
          </Alert>
        </Modal>
      </Grid>
      <Grid item>
        <Modal
          open={openNoTitle}
          onClose={handleCloseNoTitle}
          aria-labelledby="no-title-modal"
          aria-describedby="no-title-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please enter a review title!
          </Alert>
        </Modal>
      </Grid> 
      <Grid item>
        <Modal
          open={openNoReview}
          onClose={handleCloseNoReview}
          aria-labelledby="no-review-modal"
          aria-describedby="no-review-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please enter a review!
          </Alert>
        </Modal>
      </Grid> 
      <Grid item>
        <Modal
          open={openNoRating}
          onClose={handleCloseNoRating}
          aria-labelledby="no-rating-modal"
          aria-describedby="no-rating-modal-desc"
        >
          <Alert 
            severity="error"
            variant="filled"
          >
            Please select a rating!
          </Alert>
        </Modal>
      </Grid> 
    </Grid>
  )
}

const MovieSelection = ({selectedMovie, handleChangedMovie, movies}) => {
  return (
    <Grid item>
        <Box sx={{ minWidth: 500 }}>
          <FormControl fullWidth>
            <InputLabel id="select-movie-label">Select a Movie</InputLabel>
            <Select
              labelId="select-movie-label-id"
              id="select-movie-label"
              value={selectedMovie}
              label="Select a Movie"
              onChange={handleChangedMovie}
              color="secondary"
            >
            {movies.map((item, key) => {
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
  );
}

const ReviewTitle = ({enteredTitle, handleChangedReviewTitle}) => {
  return (
    <Grid item>
        <Box sx={{ minWidth: 500}}>
            <TextField 
              fullWidth 
              id="review-title" 
              label="Enter Review Title" 
              variant="standard" 
              value={enteredTitle}
              onChange={handleChangedReviewTitle}
              inputProps={{ maxLength: 100 }}
            />
        </Box>
      </Grid>
  )
}

const ReviewBody = ({enteredReview, handleChangedReviewBody}) => {
  return (
    <Grid item>
        <Box sx={{ minWidth: 500}}>
            <TextField 
              fullWidth
              multiline 
              id="review-body" 
              label="Enter Review" 
              variant="standard" 
              value={enteredReview}
              onChange={handleChangedReviewBody}
              inputProps={{ maxLength: 200 }}
            />
        </Box>
      </Grid>
  )
}

const ReviewRating = ({selectedRating, handleChangedRating}) => {
  return (
    <Grid item>
        <Box pt={2}>
          <FormControl>
            <FormLabel id="rating-radio-buttons-group-label">What is your rating of the movie?</FormLabel>
            <RadioGroup
              aria-labelledby="rating-radio-buttons-group-label"
              name="rating-radio-buttons-group"
              value={selectedRating}
              onChange={handleChangedRating}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
  )
}

Reviews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reviews);