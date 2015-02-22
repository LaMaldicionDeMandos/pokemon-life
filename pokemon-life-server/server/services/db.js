var redis = require('redis');
var redisClient = redis.createClient();
var q = require('q');
var mongo = require('mongoose');
var MONTH_IN_SECONDS = 60*60*24*30;
var User;

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

function Db() {
	this.db = null;
	this.open = function(config) {
		mongo.connect(config.db.url);
		db = mongo.connection
		db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
          	console.log("DB: " + config.db.url + " is opened correctly");
			User = mongo.model('User', mongo.Schema({username: String, password: String, token: String}));
        });
	};
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
		new User(user).save(function(err, _user) {
			if(err) return console.log(err);
			console.log("Saved user: " + _user.username);
		});
	};

	var saveOnRedis = function(user) {
		redisClient.set(user.token, JSON.stringify(user));
        redisClient.expire(user.token, MONTH_IN_SECONDS);
	};
};

var db = new Db();

module.exports = db;
