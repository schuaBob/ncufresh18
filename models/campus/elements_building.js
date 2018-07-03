var mongoose = require('mongoose');

var user = mongoose.Schema({
    Element_Name : String,
    Type : String,
    Element_Intro : String,
    AED : Boolean,
    Emercall : Boolean,
    LastUpDate : Date
});

module.exports = mongoose.model('elements_building',elements_buildings);