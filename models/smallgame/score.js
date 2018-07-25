var mongoose = require('mongoose');

var UserScore = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
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

module.exports = mongoose.model('UserScore', UserScore)