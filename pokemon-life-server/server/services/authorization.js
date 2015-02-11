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
		var user = db.findUserByToken(token, function(err, user) {
		    var _user = JSON.parse(user);
		    console.log("User: " + user);
		    console.log("Username: " + _user.username);
		    console.log("token: " + token);
            if (user == null || token != _user.token) {
                err = new Error("Invalid Token");
            }
            return err;
		});
	};

	this.findUserByToken = function(token, callback) {
		return db.findUserByToken(token, callback);
	};
};
var service = new AuthorizationService(db);

module.exports = service;
