//server.js

var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'decelopment';
var app = express();


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

/*
db.createUser(
    {
      user: "user",
      pwd: "dbpassword-changemeNOW",
      roles: [
         { role: "readWrite", db: "mv" }
    ]})	
*/

var	mongodbServer = 'ds051933.mongolab.com:51933';
var	mongodbName	= 'mv';
var dbuser = 'user';
var dbpassword = 'dbpassword-changemeNOW';

var server;

if (env ==='development'){	//jf if we are in dev use local host for server.
	mongodbServer = 'localhost';
}


//mongoose.connect('mongodb://localhost/mv');
mongoose.connect('mongodb://'+dbuser+':'+dbpassword+'@'+mongodbServer+'/'+mongodbName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecton error...'));
db.once('open', function callback() {
	console.log('mv db opened ..');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne({}).exec(function (err, messageDoc) {
	mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (req, res ) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res ){
	res.render('index', {
		mongoMessage : mongoMessage
	});
});

var port = process.env.port || 3030;
app.listen(port);
console.log('listening to port ' + port + '...');