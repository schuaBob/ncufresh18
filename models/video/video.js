var mongoose = require('mongoose');

var video = mongoose.Schema({
    type: String,
    insert: String,
    introduce: String
});

module.exports = mongoose.model( 'video', video );