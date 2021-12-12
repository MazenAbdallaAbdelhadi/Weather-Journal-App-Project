// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 7000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('weather'));
app.listen( port, portInfo );

// Setup Server
function portInfo() {
    console.log(`Server is running on: http://localhost:${port}`);
}

//Get Data
app.get('/All', (req, res) => {
    res.send(projectData).status(200).end();
});

//post data

app.post('/postData', (req, res) => {

    projectData = req.body;
    console.log(req.body);
    res.status(200).send(projectData).end();
});