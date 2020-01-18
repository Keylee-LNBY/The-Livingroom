// dependencies
const express = require('express');
const path = require('path');

// set up the express app
const app = express();
const PORT = process.env.PORT || 8000;

// handles the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table Data
let reservationsARR = [];
let waitListARR = [];

// routes:
// route to home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'home.html'));
});
// route to reservations form
app.get('/reservations', function(req, res) {
	res.sendFile(path.join(__dirname, 'reservation.html'));
});
// route to currently seated and waitlist tables
app.get('/viewtables', function(req, res) {
	res.sendFile(path.join(__dirname, 'view.html'));
});
// route to json view of currently seated tables
app.get('/api/currentseating', function(req, res) {
	return res.json(reservationsARR);
});
// route to json view of the waitlist tables
app.get('/api/waitlist', function(req, res) {
	return res.json(waitListARR);
});

// grabs info from the reservation form and creates new object & pushes into correct arr
app.post('/api/newtable', function(req, res) {
	let newTable = req.body;

	if (reservationsARR.length < 5) {
		reservationsARR.push(newTable);
	} else {
		waitListARR.push(newTable);
	}
	// newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();
});

// starts the server & begins to listen
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});
