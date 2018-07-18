//using mongoose to connect mongodb
var mongoose = require('mongoose');

//User Schema
var UserSchema = mongoose.Schema({
    id: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    name: {
        type: String
    },
    score_sum: {
        type: String
    },
    score_high: {
        type: String
    },
    avatar: {
        type: String, default: "profile.png" 
    }
});

//export User schema
module.exports = mongoose.model('User', userSchema);
