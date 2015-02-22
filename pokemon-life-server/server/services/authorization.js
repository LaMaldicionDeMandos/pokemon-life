var db = require('./db');
var uuid = require('node-uuid');
var q = require('q');

function ServiceBuilder() {
    this.getService = function(db, config) {
        db.open(config);
        return new AuthorizationService(db);
    }
}

function AuthorizationService(db) {
	this.db = db;
	this.authorizate = function(username, password) {
        var defer = q.defer();
        promise = db.findUserByUsername(username);
        promise.then(function(user) {
            console.log("Verify user Authentication:" + user.username);
            if (password == undefined || password != user.password) {
                defer.reject("El usuario no existe o la password es invalida");
            } else {
                user.token = uuid.v4();
                db.updateUser(user);
                return defer.resolve(user.token);
            }
        }, function(err) {
            console.log("new User");
            var user = {
                username: username,
                password: password,
                token: uuid.v4()
            };
            db.saveUser(user);
            defer.resolve(user.token);
        });
        return defer.promise;
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
var builder = new ServiceBuilder();

module.exports = builder;
