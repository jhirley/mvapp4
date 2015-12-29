//server.js
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'decelopment';
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({username:username}).exec(function (err, user){
			console.log('server.js '+ user);
			if ( user && user.authenticate(password)) {
				console.log('server.js passport.use working');
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
));

passport.serializeUser( function ( user, done ) {
	if ( user) {
		console.log('server.js passport.serialize working');
		done(null, user._id);
	}
});

passport.deserializeUser ( function (id, done ) {
	User.findOne({_id:id}).exec(function (err, user){
		if ( user ) {
			console.log('server.js passport.desearial working');
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

require('./server/config/routes')(app);


app.listen(config.port);
console.log('listening to port ' + config.port + '...');