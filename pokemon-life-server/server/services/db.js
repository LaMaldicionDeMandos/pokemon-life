var _user;
function Db() {
	this.findUserByToken = function(token) {
		return _user;
	};

	//TODO
	this.findUserByUsername = this.findUserByToken;

	this.existUserByUsername = function(username) {
		return _user != undefined && _user.username == username;
	};

	this.updateUser = function(user) {
		_user = user;
	};

	this.saveUser = function(user) {
		_user = user;
	};
};

var db = new Db();

module.exports = db;
