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
app.use(express.static('dist'));


//===Trust First Proxy===
// app.set('trust proxy', 1);


//===SESSIONS===
let secret = undefined;

if (process.env.zenSecret){
	secret = process.env.zenSecret;
}else{
	secret = 'development-only';
}

app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: true
}));


//===MongoDB Connection with Mongoose==
const connect = () => {
mongoose.connect(
	process.env.MONGOURL || 'mongodb://localhost:27017/zen',
	{ useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));
}

setTimeout(
	connect, 
	process.env.DOCKER ? 15000 : 0 
);

//===Routes===
require('./controller/html_routes.js')(app);
require('./controller/api_routes.js')(app);


//==Start Server==
let server = app.listen(app.get('port'), function() {
	if(process.env.PORT){
		console.log('Running on Port:', app.get('port'),'\n' );
	}else{
		console.log(`Running on: http://localhost:${app.get('port')}` );
	}
});

module.exports = server; //for mocha