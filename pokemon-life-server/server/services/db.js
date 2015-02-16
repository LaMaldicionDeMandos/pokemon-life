var redis = require('redis');
var redisClient = redis.createClient();
var q = require('q');
var MONTH_IN_SECONDS = 60*60*24*30;

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

function Db() {
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
		saveOnRedis(user);
	};

	//TODO
	this.saveUser = function(user) {
		saveOnRedis(user);
	};

	var saveOnRedis = function(user) {
		redisClient.set(user.token, JSON.stringify(user));
        redisClient.expire(user.token, MONTH_IN_SECONDS);
	};
};

var db = new Db();

module.exports = db;
