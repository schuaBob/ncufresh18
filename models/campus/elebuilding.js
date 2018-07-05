var mongoose = require('mongoose');

var elebuilding = mongoose.Schema({
    Element_Name : String,
    Type : String,
    Element_Intro : String,
    LastUpDate : Date
});

module.exports = mongoose.model('elebuilding',elebuilding);