let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// gets a list of events which are not "friend events" and the user is not a part of for join events page dropdown
app.post('/api/getEvents', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT eventID, name FROM event WHERE friendEvent = 0 AND eventID NOT IN (SELECT eventID FROM eventUser WHERE userID = ?)`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send users info to mysql to add them to an event
app.post('/api/joinEvent', (req, res) => {
	let userID = req.body.userID;
	let eventID = req.body.eventID;
	console.log("userID: " + userID);
	console.log("eventID: " + eventID);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO eventUser (userID, eventID) VALUES (?,?)`;
	let data = [userID, eventID];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = "Event has been joined!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send new events info to add a new event
app.post('/api/addEvent', (req, res) => {
	let eventName = req.body.eventName;
	let eventDate = req.body.eventDate;
	let eventLocation = req.body.eventLocation;
	console.log("Event Name: " + eventName);
	console.log("Event Date: " + eventDate);
	console.log("Event Location" + eventLocation);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO event (name, date, location, friendEvent) VALUES (?, ?, ?, ?)`;
	let data = [eventName, eventDate, eventLocation, 0];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = "Event has been created!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});

// API to send users info to mysql to update profile
app.post('/api/updateProfile', (req, res) => {
	let userID = req.body.userID;
	let profileName = req.body.profileName;
	let profileBio = req.body.profileBio;
	let profileCity = req.body.profileCity;
	let profileHeight = req.body.profileHeight;
	let profileWeight = req.body.profileWeight;
	console.log("made to this side");

	let connection = mysql.createConnection(config);

	let sql = `UPDATE user SET name = ?, city = ?, height = ?, weight = ?, bio = ? WHERE userID = ?`;
	let data = [profileName, profileCity, profileHeight, profileWeight, profileBio, userID];

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = "Profile updated!"

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});


// gets current profile
app.post('/api/getProfile', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT name , bio, city, height, weight FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});


// gets Profile run log
app.post('/api/getRuns', (req, res) => {
	let userID = req.body.userID;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT CAST(run.date AS CHAR) as date , run.distance, TIME_FORMAT(CAST(run.duration AS CHAR), '%T') as duration, run.location, run.weather, run.description FROM run WHERE userID = ?`;
	console.log(sql);
	let data = [userID];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({ express: string });
	});
	connection.end();
});


/*
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getTopMovies', (req, res) => {
	let genre = req.body.chosenGenre;

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT m.name, m.year, AVG(r.reviewScore) as avg 
	FROM movies m, Review r 
	WHERE r.movieID = m.id AND
	m.id IN (SELECT movie_id FROM movies_genres WHERE genre = ?)
	GROUP BY m.name, m.year 
	ORDER BY AVG(r.reviewScore) DESC 
	LIMIT 5`;
	console.log(sql);
	let data = [genre];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({express: string});
	});
	connection.end();
});

app.post('/api/getGenres', (req, res) => {

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let sql = `SELECT DISTINCT genre FROM movies_genres`;
	console.log(sql);
	let data = [];

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log(string);

		res.send({express: string});
	});
	connection.end();
});

app.post('/api/getSearchedMovies', (req, res) => {
	let searchTitle = req.body.searchTitle ;
	let searchActor = req.body.searchActor;
	let searchDirector =  req.body.searchDirector;
	console.log("Search Terms: Title: " + searchTitle + ", Actor Name: " + searchActor + ", Director Name: " + searchDirector);

	//create connection to sql, declare query in string
	let connection = mysql.createConnection(config);
	let data = [];
	let sql = `SELECT m.id, m.name, scores.average, GROUP_CONCAT(r.reviewContent SEPARATOR ', ') as reviewList, CONCAT(d.first_name, " ", d.last_name) as directorFullName 
	FROM movies m
	LEFT JOIN Review r ON r.movieID = m.id 
	INNER JOIN movies_directors md ON m.id = md.movie_id 
	INNER JOIN directors d ON d.id = md.director_id
	LEFT JOIN (SELECT movieID, AVG(reviewScore) as average FROM Review GROUP BY Review.movieID) AS scores ON m.id = scores.movieID`;

	if (searchTitle || searchActor || searchDirector) {
		sql += " WHERE ";
	}

	if(searchTitle) {
		sql += "m.name = ?";
		data.push(searchTitle);
	}

	if(searchTitle && searchActor) {
		sql += "AND ";
	}

	if(searchActor) {
		sql += "m.id IN (SELECT m.id FROM movies m RIGHT JOIN roles ro ON ro.movie_id = m.id INNER JOIN actors a ON a.id = ro.actor_id WHERE CONCAT(a.first_name, ' ', a.last_name) = ?)";
		data.push(searchActor);
	}

	if((searchTitle || searchActor) && searchDirector) {
		sql += "AND ";
	}

	if(searchDirector) {
		sql += "CONCAT(d.first_name, ' ', d.last_name) = ?";
		data.push(searchDirector);
	}

	sql += " GROUP BY m.id, m.name, scores.average, directorFullName ORDER BY m.name";

	console.log(sql);
	console.log(data);

	// connecting to sql and using the query variable, turning data into JSON object and sending back as res
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message)
		}

		let string = JSON.stringify(results);

		console.log("Results: " + string);

		res.send({express: string});
	});
	connection.end();
});

*/


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
