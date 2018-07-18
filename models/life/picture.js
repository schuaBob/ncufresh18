var mongoose = require('mongoose');

var picture = mongoose.Schema({
    mainTitle   : String,
    subTitle    : String,
    path        : String
})

module.exports = mongoose.model('picture', picture);