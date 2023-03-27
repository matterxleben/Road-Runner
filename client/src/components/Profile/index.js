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
import Grid from '@mui/material/Grid';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//import gridTable from "/Users/abhinav/Documents/MSCI-342-Project_local/client/src/components/Profile/EmptyTableGrid.css";
//import "/Users/abhinav/Documents/MSCI-342-Project_local/client/src/components/Profile/RunnerProfile.css"; // import CSS file
//import runnerPhoto from "/Users/abhinav/Documents/MSCI-342-Project_local/client/src/components/Profile/runner-photo.jpg"; // import image file

import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@material-ui/core/Paper';


//Dev mode

const serverURL = "";//enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3039"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");


const Profile = () => {

    const [profile, setProfile] = React.useState([]);

    const heights = [
        { name: "4'11", id: 1 },
        { name: "5'0", id: 2 },
        { name: "5'1", id: 3 },
        { name: "5'2", id: 4 },
        { name: "5'3", id: 5 },
        { name: "5'4", id: 6 },
        { name: "5'5", id: 7 },
        { name: "5'6", id: 8 },
        { name: "5'7", id: 9 },
        { name: "5'8", id: 10 },
        { name: "5'9", id: 11 },
        { name: "5'10", id: 12 },
        { name: "5'11", id: 13 },
        { name: "6'0", id: 14 },
        { name: "6'1", id: 15 },
        { name: "6'2", id: 16 },
        { name: "6'3", id: 17 },
        { name: "6'4", id: 18 },
        { name: "6'5 +", id: 19 }

    ];


    const [profileHeight, setProfileHeight] = React.useState("");

    const [heightID, setHeightID] = React.useState("");

    const handleChangedHeight = (event) => {
        setProfileHeight(event.target.value);
        setHeightID(event.currentTarget.dataset.id);
        console.log("Height: " + profileHeight);
        console.log("Height ID: " + heightID);
    };


    const weights = [
        { name: "95 lbs", id: 1 },
        { name: "96 lbs", id: 2 },
        { name: "97 lbs", id: 3 },
        { name: "98 lbs", id: 4 },
        { name: "99 lbs", id: 5 },
        { name: "100 lbs", id: 6 },
        { name: "101 lbs", id: 7 },
        { name: "102 lbs", id: 8 },
        { name: "103 lbs", id: 9 },
        { name: "104 lbs", id: 10 },
        { name: "105 lbs", id: 11 },
        { name: "106 lbs", id: 12 },
        { name: "107 lbs", id: 13 },
        { name: "108 lbs", id: 14 },
        { name: "109 lbs", id: 15 },
        { name: "110 lbs", id: 16 },
        { name: "111 lbs", id: 17 },
        { name: "112 lbs", id: 18 },
        { name: "113 lbs", id: 19 },
        { name: "114 lbs", id: 20 },
        { name: "115 lbs", id: 21 },
        { name: "116 lbs", id: 22 },
        { name: "117 lbs", id: 23 },
        { name: "118 lbs", id: 24 },
        { name: "119 lbs", id: 25 },
        { name: "120 lbs", id: 26 },
        { name: "121 lbs", id: 27 },
        { name: "122 lbs", id: 28 },
        { name: "123 lbs", id: 29 },
        { name: "124 lbs", id: 30 },
        { name: "125 lbs", id: 31 },
        { name: "126 lbs", id: 32 },
        { name: "127 lbs", id: 33 },
        { name: "128 lbs", id: 34 },
        { name: "129 lbs", id: 35 },
        { name: "130 lbs", id: 36 },
        { name: "131 lbs", id: 37 },
        { name: "132 lbs", id: 38 },
        { name: "133 lbs", id: 39 },
        { name: "134 lbs", id: 40 },
        { name: "135 lbs", id: 41 },
        { name: "136 lbs", id: 42 },
        { name: "137 lbs", id: 43 },
        { name: "138 lbs", id: 44 },
        { name: "139 lbs", id: 45 },
        { name: "140 lbs", id: 46 },
        { name: "141 lbs", id: 47 },
        { name: "142 lbs", id: 48 },
        { name: "143 lbs", id: 49 },
        { name: "144 lbs", id: 50 },
        { name: "145 lbs", id: 51 },
        { name: "146 lbs", id: 52 },
        { name: "147 lbs", id: 53 },
        { name: "148 lbs", id: 54 },
        { name: "149 lbs", id: 55 },
        { name: "150 lbs", id: 56 },
        { name: "151 lbs", id: 57 },
        { name: "152 lbs", id: 58 },
        { name: "153 lbs", id: 59 },
        { name: "154 lbs", id: 60 },
        { name: "155 lbs", id: 61 },
        { name: "156 lbs", id: 62 },
        { name: "157 lbs", id: 63 },
        { name: "158 lbs", id: 64 },
        { name: "159 lbs", id: 65 },
        { name: "160 lbs", id: 66 },
        { name: "161 lbs", id: 67 },
        { name: "162 lbs", id: 68 },
        { name: "163 lbs", id: 69 },
        { name: "164 lbs", id: 70 },
        { name: "165 lbs", id: 71 },
        { name: "166 lbs", id: 72 },
        { name: "167 lbs", id: 73 },
        { name: "168 lbs", id: 74 },
        { name: "169 lbs", id: 75 },
        { name: "170 lbs", id: 76 },
        { name: "171 lbs", id: 77 },
        { name: "172 lbs", id: 78 },
        { name: "173 lbs", id: 79 },
        { name: "174 lbs", id: 80 },
        { name: "175 lbs", id: 81 },
        { name: "176 lbs", id: 82 },
        { name: "177 lbs", id: 83 },
        { name: "178 lbs", id: 84 },
        { name: "179 lbs", id: 85 },
        { name: "180 lbs", id: 86 },
        { name: "181 lbs", id: 87 },
        { name: "182 lbs", id: 88 },
        { name: "183 lbs", id: 89 },
        { name: "184 lbs", id: 90 },
        { name: "185 lbs", id: 91 },
        { name: "186 lbs", id: 92 },
        { name: "187 lbs", id: 93 },
        { name: "188 lbs", id: 94 },
        { name: "189 lbs", id: 95 },
        { name: "190 lbs", id: 96 },
        { name: "191 lbs", id: 97 },
        { name: "192 lbs", id: 98 },
        { name: "193 lbs", id: 99 },
        { name: "194 lbs", id: 100 },
        { name: "195 lbs", id: 101 },
        { name: "196 lbs", id: 102 },
        { name: "197 lbs", id: 103 },
        { name: "198 lbs", id: 104 },
        { name: "199 lbs", id: 105 },
        { name: "200 lbs", id: 106 },
        { name: "201 lbs", id: 107 },
        { name: "202 lbs", id: 108 },
        { name: "203 lbs", id: 109 },
        { name: "204 lbs", id: 110 },

    ];

    const [profileWeight, setProfileWeight] = React.useState("");

    const [weightID, setWeightID] = React.useState("");

    const handleChangedWeight = (event) => {
        setProfileWeight(event.target.value);
        setWeightID(event.currentTarget.dataset.id);
        console.log("Weight: " + profileWeight);
        console.log("Weight ID: " + weightID);
    };


    const [profileName, setProfileName] = React.useState("");
    const [profileCity, setProfileCity] = React.useState("");
    const [profileBio, setProfileBio] = React.useState("");
    const [profileAge, setProfileAge] = React.useState("");

    const handleChangedName = (event) => {
        setProfileName(event.target.value);
    }

    const handleChangedCity = (event) => {
        setProfileCity(event.target.value);
    }

    const handleChangedBio = (event) => {
        setProfileBio(event.target.value);
    }

    const handleChangedAge = (event) => {
        setProfileAge(event.target.value);
    }



    // Declaring API to send inputted data to profile table in DB
    const callApiUpdateProfile = async () => {
        const url = serverURL + "/api/updateProfile";

        // waiting on response from api call of type POST which will be in the form of a json object
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                profileName: profileName,
                profileBio: profileBio,
                profileAge: profileAge,
                profileCity: profileCity,
                profileHeight: profileHeight,
                profileWeight: profileWeight,
                userID: 1,

            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile update Status: ", body);
        return body;
    }

    const updateProfile = () => {
        console.log("updateProdile was called");
        callApiUpdateProfile()
            .then(res => {

            });
    }


    //profile details from getProfile API
    const [currentProfile, setCurrentProfile] = React.useState([]);

    // API to return current profile 
    const callApiGetProfile = async () => {
        const url = serverURL + "/api/getProfile";

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
        console.log("Profile: ", body);
        return body;
    }

    const getProfile = () => {
        callApiGetProfile()
            .then(res => {

                //printing to console what was returned
                console.log("getProfile API Returned: ", res);
                var parsedProfile = JSON.parse(res.express);
                console.log("Profile Parsed: ", parsedProfile);

                // sets stateful variable movies to the value of the list parsedMovies

                setCurrentProfile(parsedProfile);
                console.log("Profile was set");
            });
    }

    React.useEffect(() => {
        console.log("Calling getProfile API");
        getProfile();
    }, []);




    //run log details from getRuns API
    const [runs, setRuns] = React.useState([]);

    // API to return run 
    const callApiGetRuns = async () => {
        const url = serverURL + "/api/getRuns";

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
        console.log("Runs: ", body);
        return body;
    }

    const getRuns = () => {
        callApiGetRuns()
            .then(res => {

                //printing to console what was returned
                console.log("getRuns API Returned: ", res);
                var parsedRuns = JSON.parse(res.express);
                console.log("Runs Parsed: ", parsedRuns);

                // sets stateful variable movies to the value of the list parsedMovies

                setRuns(parsedRuns);
                console.log("Runs was set");
            });
    }

    React.useEffect(() => {
        console.log("Calling getRuns API");
        getRuns();
    }, []);




    const verifyInputs = () => {
        var anyErrors = false;
        if (profileName == "") {
            handleOpenNoName();
            anyErrors = true;
        }
        if (profileBio == "") {
            handleOpenNoBio();
            anyErrors = true;
        }
        if (profileAge == "") {
            handleOpenNoAge();
            anyErrors = true;
        }
        if (profileCity == "") {
            handleOpenNoCity();
            anyErrors = true;
        }
        if (profileHeight == "") {
            handleOpenNoHeight();
            anyErrors = true;
        }
        if (profileWeight == "") {
            handleOpenNoWeight();
            anyErrors = true;
        }

        if (anyErrors == 0) {
            updateProfile();
            getProfile();
            //history.push('/');
        }

    }


    // Stateful variables for modal for each of the fields if they are left blank
    const [openNoName, setNoName] = React.useState(false);

    const handleOpenNoName = () => {
        setNoName(true);
    };

    const handleCloseNoName = () => {
        setNoName(false);
    };

    const [openNoBio, setNoBio] = React.useState(false);

    const handleOpenNoBio = () => {
        setNoBio(true);
    };

    const handleCloseNoBio = () => {
        setNoBio(false);
    };

    const [openNoAge, setNoAge] = React.useState(false);

    const handleOpenNoAge = () => {
        setNoAge(true);
    };

    const handleCloseNoAge = () => {
        setNoAge(false);
    };

    const [openNoCity, setNoCity] = React.useState(false);

    const handleOpenNoCity = () => {
        setNoCity(true);
    };

    const handleCloseNoCity = () => {
        setNoCity(false);
    };

    const [openNoHeight, setNoHeight] = React.useState(false);

    const handleOpenNoHeight = () => {
        setNoHeight(true);
    };

    const handleCloseNoHeight = () => {
        setNoHeight(false);
    };

    const [openNoWeight, setNoWeight] = React.useState(false);

    const handleOpenNoWeight = () => {
        setNoWeight(true);
    };

    const handleCloseNoWeight = () => {
        setNoWeight(false);
    };

    // Function to handle saving the new event, it must first verify there is input for each field, then call API to send to DB, then return to home
    const onSave = () => {
        verifyInputs();
    }


    return (
        <>
            <MuiThemeProvider theme={theme}>
                <SiteHeader />


                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <div > {/* apply the class to the outer div */}
                        <div className="runner-info">
                            <h1>{currentProfile.map((item, key) => {
                                return (
                                    <MenuItem
                                        //data-id={item.id}
                                        value={item}
                                    >
                                        {item.name}
                                    </MenuItem>
                                )
                            })
                            }</h1>



                        </div>
                    </div>

                    <div>
                        <p>{currentProfile.map((item, key) => {
                            return (
                                <MenuItem
                                    //data-id={item.id}
                                    value={item}
                                >
                                    {item.bio}
                                </MenuItem>
                            )
                        })
                        }</p>
                        <h5>    City: {currentProfile.map((item, key) => {
                            return (
                                <MenuItem
                                    //data-id={item.id}
                                    value={item}
                                >
                                    {item.city}
                                </MenuItem>
                            )
                        })
                        }</h5>
                        <h5>    Height: {currentProfile.map((item, key) => {
                            return (
                                <MenuItem
                                    //data-id={item.id}
                                    value={item}
                                >
                                    {item.height}
                                </MenuItem>
                            )
                        })
                        }</h5>
                        <h5>    Weight: {currentProfile.map((item, key) => {
                            return (
                                <MenuItem
                                    //data-id={item.id}
                                    value={item}
                                >
                                    {item.weight}
                                </MenuItem>
                            )
                        })
                        }</h5>
                    </div>

                </Box>



                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <TextField
                        fullWidth
                        id="name"
                        label="Enter Runner's Name"
                        variant="standard"
                        value={profileName}
                        onChange={handleChangedName}
                        inputProps={{ maxLength: 100 }}
                        style={{ color: "#000000" }}
                    />
                </Box>

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <TextField
                        fullWidth
                        id="bio"
                        label="Enter a Bio"
                        variant="standard"
                        value={profileBio}
                        onChange={handleChangedBio}
                        inputProps={{ maxLength: 1000 }}
                    />
                </Box>

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <TextField
                        fullWidth
                        id="Age"
                        label="Enter a Age"
                        variant="standard"
                        value={profileAge}
                        onChange={handleChangedAge}
                        inputProps={{ maxLength: 1000 }}
                    />
                </Box>

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <TextField
                        fullWidth
                        id="city"
                        label="Enter Runner's City"
                        variant="standard"
                        value={profileCity}
                        onChange={handleChangedCity}
                        inputProps={{ maxLength: 100 }}
                    />
                </Box>

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-height-label">Select an Height (ft'in")</InputLabel>
                        <Select
                            labelId="select-height-label-id"
                            id="select-height-label"
                            value={profileHeight}
                            label="Select a Height"
                            onChange={handleChangedHeight}
                            color="secondary"
                        >
                            {heights.map((item, key) => {
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

                <Box sx={{ width: 1 / 2, p: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-weight-label">Select a Weight (lbs)</InputLabel>
                        <Select
                            labelId="select-weight-label-id"
                            id="select-weight-label"
                            value={profileWeight}
                            label="Select an Event"
                            onChange={handleChangedWeight}
                            color="secondary"
                        >
                            {weights.map((item, key) => {
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

                <Box sx={{ p: 2 }}>

                    <Button
                        label id="button-name"
                        value="button-name"
                        // id="button-name"
                        aria-label="button-name"
                        variant="outlined"
                        onClick={onSave} data-testID='button-name'
                    >
                        Save
                    </Button>
                </Box>

                <Grid item>
                    <Modal
                        open={openNoName}
                        onClose={handleCloseNoName}
                        aria-labelledby="no-name-modal"
                        aria-describedby="no-name-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter an Profile Name!
                        </Alert>
                    </Modal>
                </Grid>

                <Grid item>
                    <Modal
                        open={openNoBio}
                        onClose={handleCloseNoBio}
                        aria-labelledby="no-Bio-modal"
                        aria-describedby="no-Bio-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter an Profile Bio!
                        </Alert>
                    </Modal>
                </Grid>

                <Grid item>
                    <Modal
                        open={openNoAge}
                        onClose={handleCloseNoAge}
                        aria-labelledby="no-Age-modal"
                        aria-describedby="no-Age-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter your Age!
                        </Alert>
                    </Modal>
                </Grid>

                <Grid item>
                    <Modal
                        open={openNoCity}
                        onClose={handleCloseNoCity}
                        aria-labelledby="no-city-modal"
                        aria-describedby="no-city-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter an Profile City!
                        </Alert>
                    </Modal>
                </Grid>

                <Grid item>
                    <Modal
                        open={openNoHeight}
                        onClose={handleCloseNoHeight}
                        aria-labelledby="no-height-modal"
                        aria-describedby="no-height-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter an Profile Height!
                        </Alert>
                    </Modal>
                </Grid>

                <Grid item>
                    <Modal
                        open={openNoWeight}
                        onClose={handleCloseNoWeight}
                        aria-labelledby="no-weight-modal"
                        aria-describedby="no-weight-modal-desc"
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            Please enter an Profile Weight!
                        </Alert>
                    </Modal>
                </Grid>


                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" color="inherit" noWrap>
                        Runner's Log
                        </Typography>
                </Box>

                <Box sx={{ width: 1, p: 2 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>date</TableCell>
                                    <TableCell>Distance</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Weather</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {runs.map((row) => (
                                    <TableRow key={row.date}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.distance}</TableCell>
                                        <TableCell>{row.duration}</TableCell>
                                        <TableCell>{row.location}</TableCell>
                                        <TableCell>{row.weather}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </MuiThemeProvider>
        </>
    )

}

export default Profile;