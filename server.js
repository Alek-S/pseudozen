'use strict';

//==MODULES==
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');


//==Express Setup==
const app = express();
app.set('port', (process.env.PORT || 5000));


//===HTTP Headers===
app.use(helmet());


//===Morgan Logger Middleware===
app.use(morgan(':method :url :status - :response-time ms'));


//===Parsing===
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


//===Static Files, CSS,Images,Fonts===
app.use(express.static('public'));


//===Trust First Proxy===
app.set('trust proxy', 1);

//===SESSIONS===
app.use(session({
	secret: 'sandbox',
	resave: false,
	saveUninitialized: true
	// cookie: { secure: true } //get https set for this
}));


//===MongoDB Connection with Mongoose==
mongoose.Promise = global.Promise; //use standard Promise instead of Mongo's promise library
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/zen',{
	useMongoClient: true
});
const db = mongoose.connection;

db.on('error', function(error) { // Show any mongoose errors
	console.log(chalk.red('Mongoose Error: '), error);
});


//===Routes===
require('./controller/html_routes.js')(app);
require('./controller/api_routes.js')(app);


//==Start Server==
let server = app.listen(app.get('port'), function() {
	console.log('Running on Port:', app.get('port'),'\n' );
});

module.exports = server; //for mocha