var mongoose=require('mongoose');

var document= mongoose.Schema({
    title:String,
    content:String,
});
module.exports = mongoose.model( 'document', document );