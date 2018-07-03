var mongoose = require('mongoose');

var department = mongoose.Schema({
    type : String,
    name : String,
    introduction : String,
    organization : String,
    activity : String,
    team : String,
    course : String, 
    lightning_round : String, //快問快答
});

module.exports = mongoose.model( 'department', department );