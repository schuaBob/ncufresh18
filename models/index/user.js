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
    //腳色
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
    //圖片
    avatar: {
        type: String, default: "profile.png" 
    }
});
//Schema method for checking user login password hash with Bcrypt
UserSchema.methods.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, isMatch){
       if(err) throw err;
       callback(null, isMatch);
    });
}
//A UserSchema instance
let tmp = mongoose.model('User', UserSchema);

//Function for user object instance
tmp.createUser = (User, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(User.password, salt, function(err, hash) {
          User.password = hash;
          User.save(callback);
      });
    });
}

module.exports = tmp;
