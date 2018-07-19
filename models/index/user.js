//using mongoose to connect mongodb
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//User Schema
var UserSchema = mongoose.Schema({
    id: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String, default: "student"
    },
    name: {
        type: String
    },
    score_sum: {
        type: Number,default: 0
    },
    score_high: {
        type: Number, default: 0
    },
    avatar: {
        type: String, default: "profile.png" 
    }
});

let tmp = mongoose.model('User', UserSchema);
tmp.createUser = (User, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(User.password, salt, function(err, hash) {
          User.password = hash;
          User.save(callback);
      });
    });
}
module.exports = tmp;
