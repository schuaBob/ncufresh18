var mongoose = require('mongoose');

var description = mongoose.Schema({
    mainTitle    : String,
    subTitle     : String,
    content      : String
});

module.exports = mongoose.model('description', description);