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
		console.log(config.mongodbName+' db opened...');
	});

	var userSchema = mongoose.Schema({
		firstName: String
		, lastName : String
		, username : String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			User.create({firstName: 'Joe', lastName : 'Eames', username : 'joe'});
			User.create({firstName:'John', lastName:'Papa', username: 'john'});
			User.create({firstName:'Dan', lastName:'Wahlin', username: 'dan'});
		}
	});
};