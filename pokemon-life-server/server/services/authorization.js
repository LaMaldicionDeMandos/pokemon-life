var db = require('./db');
var uuid = require('node-uuid');

function AuthorizationService(db) {
	this.db = db;
	this.authorizate = function(username, password) {
	    if (db.existUserByUsername(username)) {
            var user = db.findUserByUsername(username);
            if (password == undefined || (user != undefined && password != user.password)) {
				return;
            } else {
                user.token = uuid.v4();
                db.updateUser(user);
                return user.token;
            }
        } else {
            var user = {
                username: username,
                password: password,
                token: uuid.v4()
            };
            db.saveUser(user);
            return user.token;
        }
	};
	this.authenticate = function(token) {
	    var promise = db.findUserByToken(token);
	    promise.then(function(user) {
            console.log("User: " + user);
    		console.log("Username: " + user.username);
        	console.log("token: " + token);
        	return user;
	    });
	    return promise;
	};

	this.findUserByToken = function(token) {
		return db.findUserByToken(token);
	};
};
var service = new AuthorizationService(db);

module.exports = service;
