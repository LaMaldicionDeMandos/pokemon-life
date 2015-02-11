var express = require('express');
var authentication = require('../services/authorization');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var token = req.get('token');
  authentication.findUserByToken(token, function(err, _user) {
    var user = JSON.parse(_user);
    console.log("Procesando catalog: " + user.username);
    res.status(200).send("Catalogo: " + user.username);
  });
  //next();
});

module.exports = router;
