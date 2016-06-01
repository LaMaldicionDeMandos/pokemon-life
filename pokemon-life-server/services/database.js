/**
 * Created by boot on 3/12/16.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PokemonSchema = new Schema({_id:String, type:String, lat:Number, lon:Number});


var Pokemon = mongoose.model('Pokemon', PokemonSchema);

var db = function(credentials) {
    mongoose.connect(credentials);
    var Schema = mongoose.Schema;
    console.log('Connecting to mongodb');
    this.mongoose = mongoose;
    this.Schema = Schema;
    this.ObjectId = mongoose.Types.ObjectId;
    this.Pokemon = Pokemon;
};

process.on('exit', function() {
    console.log('Desconnecting db');
    mongoose.disconnect();
});

module.exports = db;