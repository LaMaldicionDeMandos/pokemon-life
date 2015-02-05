var db = require('./db');
function AuthorizationService(db) {
	this.db = db;
	this.authorizate = function(username, password) {
	    if (db.existUserByUsername(username)) {
            var user = db.findUserByUsername(username);
            if (password == undefined || (user != undefined && password != user.password)) {
				return;
            } else {
                user.token = "Generate Token";
                db.updateUser(user);
                return user.token;
            }
        } else {
            var user = {
                username: username,
                password: password,
                token: "Generate Token"
            };
            db.saveUser(user);
            return user.token;
        }
	};
	this.authenticate = function(token) {
		var user = db.findUserByToken(token);
		var err;
        console.log("token: " + token);
        console.log("Deberia ser:");
        console.log("username: " + user.username);
        console.log("password: " + user.password);
        console.log("token: " + user.token);
        if (user == null || token != user.token) {
            err = new Error("Invalid Token");
        }
        return err;
	};

	this.findUserByToken = function(token) {
		return db.findUserByToken(token);
	};
};
var service = new AuthorizationService(db);

module.exports = service;
