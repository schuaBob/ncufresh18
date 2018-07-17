var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id: {
        type: String,
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

//export User schema
var User = module.exports = mongoose.model('User', UserSchema);

//export createUser function
module.exports.createUser = function(newUser, callback){
    newUser.save(callback); //mongoose function to insert to DB
};