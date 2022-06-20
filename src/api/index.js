const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const fakeData = require('../api/models/fakeData');

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.json(fakeData);
});

app.listen(port, console.log("Server start for port: " + port));