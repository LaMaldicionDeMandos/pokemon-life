/**
 * Created by boot on 6/1/16.
 */
var express = require('express');
var app = express();

var DB = require('./services/database');
var db = new DB("mongodb://localhost/pokemon_life");

app.set('port', (process.env.PORT || 5000));

app.get('/pokemons', function(req, res) {
    db.Pokemon.find(function(err, pokemons) {
       if(err) {
           console.log(err);
       }
        res.send(pokemons);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});