var express = require('express');
var auth = require('./auth');

module.exports = function ( app ) {
	app.get('/partials/*', function (req, res ) {
		res.render('../../public/app/' + req.params[0]);
	});

app.post('/login', auth.authenticate);

app.post('/logout', function (req, res) {
	req.logout();
	res.end();
});


	app.get('*', function (req, res ){
		console.log('routes.js req.user ' + req.user);
		res.render('index', {
			bootstrappedUser : req.user
		});
	});
};