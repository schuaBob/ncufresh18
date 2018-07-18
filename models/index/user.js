//using mongoose to connect mongodb
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//User Schema
var userSchema = mongoose.Schema({
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

export const createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.save(callback);
      });
    });
  }