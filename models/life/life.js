var mongoose = require('mongoose');

var life = mongoose.Schema({
    mainTitle   : String,
    subTitle    : [String],
    type        : String
});

var picture = mongoose.Schema({
    mainTitle   : String,
    subTitle    : String,
    path        : String
})

module.exports = mongoose.model('life', life);