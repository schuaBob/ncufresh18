var mongoose = require('mongoose');

var life = mongoose.Schema({
    mainTitle   : String,
    subTitle    : [String],
    type        : String,
    alt         : String
});

module.exports = mongoose.model('life', life);