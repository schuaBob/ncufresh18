var mongoose = require('mongoose');

var elebuilding = mongoose.Schema({
    Element_Name : String,
    Type : String,
    Element_Intro : String,
    Buildpic : String,
    Intropic : [String],
    X_position : Number,
    Y_position : Number,
    Size : Number
});

module.exports = mongoose.model('elebuilding',elebuilding);