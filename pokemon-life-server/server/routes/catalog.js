var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Procesando catalog");
  res.status(200).send("Catalogo");
  //next();
});

module.exports = router;
