var redis = require('redis');
var redisClient = redis.createClient();
var q = require('q');

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

function Db() {
	//TODO
	this.findUserByToken = function(token) {
		var defer = q.defer();
		redisClient.get(token, function(err, user) {
			if (user != null) {
				defer.resolve(JSON.parse(user));
			} else {
				if (err != null) {
					defer.reject(err);
				} else {
					defer.reject(new Error("Not found user with token: " + token));
				}
			}
		});
		return defer.promise;
	};

	//TODO
	this.findUserByUsername = this.findUserByToken;

	//TODO
	this.existUserByUsername = function(username) {
		return false;
	};

	//TODO
	this.updateUser = function(user) {
		redisClient.set(user.token, JSON.stringify(user));
	};

	//TODO
	this.saveUser = function(user) {
		redisClient.set(user.token, JSON.stringify(user));
	};
};

var db = new Db();

module.exports = db;
