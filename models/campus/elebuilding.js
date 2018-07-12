var mongoose = require('mongoose');

var elebuilding = mongoose.Schema({
    Element_Name : String,
    Type : String,
    Element_Intro : String,
    Buildpic : String,
    Intropic : [String]
    
});

module.exports = mongoose.model('elebuilding',elebuilding);