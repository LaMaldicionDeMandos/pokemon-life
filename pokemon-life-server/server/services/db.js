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

	this.findUserByUsername = function(username) {
		var defer = q.defer();
		User.findOne({username: username}, function(err, user) {
			if (user != undefined) {
				user = new User(user);
				console.log("Found User: " + user);
				defer.resolve(user);
			} else {
				console.log("Not Found User: " + username);
				defer.reject(err);
			}
		});
		return defer.promise;
	}

	this.updateUser = function(user) {
		console.log("Udating user: " + user.username + " token: " + user.token);
		saveOnRedis(user);
		updateOnMongo(user);
	};

	this.saveUser = function(user) {
		console.log("Saving user: " + user.username + " token: " + user.token);
		saveOnRedis(user);
		saveOnMongo(user);
	};

	var saveOnRedis = function(user) {
		redisClient.set(user.token, JSON.stringify(user));
        redisClient.expire(user.token, MONTH_IN_SECONDS);
	};

	var saveOnMongo = function(user) {
		new User(user).save(function(err, _user) {
        	if(err) return console.log(err);
        		console.log("Saved user: " + _user.username);
        	});
	};

	var updateOnMongo = function(user) {
		var query = {_id : user._id};
		User.update(query, user, function(err, result) {
			if(err) return console.log(err);
			console.log("Updated result: " + result);
		});
	};
};

var db = new Db();

module.exports = db;
