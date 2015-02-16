var express = require('express');
var authentication = require('../services/authorization');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var token = req.get('token');
  var promise = authentication.findUserByToken(token);
    promise.then(function(user) {
      console.log("Procesando catalog: " + user.username);
      res.status(200).send("Catalogo: " + user.username);
    });
});

module.exports = router;
