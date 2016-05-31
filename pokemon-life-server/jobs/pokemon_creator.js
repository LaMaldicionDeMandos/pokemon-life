/**
 * Created by boot on 5/31/16.
 */
var total = 3;//10404;
var DB = require('../services/database');
var area = require('../model/metropolitanArea');

var db = new DB("mongodb://localhost/pokemon_life");

var Pokemon = db.Pokemon;
var ObjectId = db.ObjectId;

db.Pokemon.count().exec(function(err, result) {
    if (err) {
        console.log("Error :( --> " + err);
    } else {
        console.log('hay ' + result + " el total debe ser " + total);
        var toCreate = total - result;
        for(var i = 0; i < toCreate;i++) {
            var point = area.createPoint();
            var pokemon = new Pokemon();
            pokemon._id = new ObjectId();
            pokemon.type = '13';
            pokemon.lat = point.lat;
            pokemon.lon = point.lon;
            pokemon.save(function(err) {
                if(err) {
                    console.log("Error :( --> " + err);
                } else {
                    console.log("Success!!");
                }
            });
        }
    }
});