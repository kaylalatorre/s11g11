//this is the entrypoint or main function for the app

//imports modules
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser'); //converts posted form into an array
const cookieParser = require('cookie-parser'); //generates cookies to keep track of logged-in user
const session = require('express-session'); //keeps track of who's logged in
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT||3000;


app.use(cookieParser());

app.use(session({
	secret: 'sikret',
	name: 'saeshun',
	resave: true,
	saveUninitialized: true
}));

// init the view
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + 'views/');
app.engine('hbs', hbs.create({
	extname: 'hbs',
	defaultLayout: 'main',
	partialsDir: 'views/partials',
        layoutsDir: 'views/layouts',
        helpers: {
			convertDouble: function(number){ // converts a Double type in mongo with a .0
				return Number.parseFloat(number).toFixed(1);
			},
			getFacultyName: function(lname, fname){
				return lname + ", " + fname;
			}
        }}).engine);
app.set('view engine', 'hbs');

// init the middleware helpers (authenticates if input passed is correct)
	// addtl info: middlewares check if there's content passed through the form and if they also pass 
	// additonal requirements ("is it an email?", "does the password contain at least 8 chars?")
	// initing the middleware itself will be done in the router
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// init the router/s
const router = require('./router/animoRouter');
app.use('/', router);

// console output when server is ran
app.listen(PORT, () => {
	console.log("Listening to localhost at port 3000");
});
