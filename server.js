//server.js

var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'decelopment';
var app = express();
var port = 3030;

function compile (str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware (
	{
	src: __dirname + '/public',
	compile: compile 
	}
));
app.use(express.static( __dirname + '/public'));

app.get('/partials/:partialPath', function (req, res ) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res ){
	res.render('index');
});

app.listen(port);
console.log('listening to port ' + port + '...');