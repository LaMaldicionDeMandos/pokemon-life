var redis = require('redis');
var redisClient = redis.createClient();

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

function Db() {
	//TODO
	this.findUserByToken = function(token, callback) {
		redisClient.get('token', callback);
		return;
	};

	//TODO
	this.findUserByUsername = this.findUserByToken;

	//TODO
	this.existUserByUsername = function(username) {
		return false;
	};

	//TODO
	this.updateUser = function(user) {
		redisClient.set('token', JSON.stringify(user));
	};

	//TODO
	this.saveUser = function(user) {
		redisClient.set('token', JSON.stringify(user));
	};
};

var db = new Db();

module.exports = db;
