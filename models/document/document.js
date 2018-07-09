var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var document= mongoose.Schema({
    count : String,
    title:String,
    content:String,
});
module.exports = mongoose.model( 'document', document );