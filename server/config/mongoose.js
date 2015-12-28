var mongoose = require('mongoose');

module.exports = function (config) {
	/*
db.createUser(
    {
      user: "user",
      pwd: "dbpassword-changemeNOW",
      roles: [
         { role: "readWrite", db: "mv" }
    ]})	
*/

	mongoose.connect('mongodb://'+config.dbuser+':'+config.dbpassword+'@'+config.mongodbServer+'/'+config.mongodbName);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connecton error...'));
	db.once('open', function callback() {
		console.log('mv db opened ..');
	});

};