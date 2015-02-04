function Db() {
	this.findUserByUsername = function(username) {
		return {
			username: "Pepe",
			password: "bla",
			token: "jojo"
		};
	};

	this.existUserByUsername = function(username) {
		return false;
	};

	this.updateUser = function(user) {

	};

	this.saveUser = function(user) {

	};
};

var db = new Db();

module.exports = db;
