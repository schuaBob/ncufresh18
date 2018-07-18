var mongoose = require('mongoose');

var video = mongoose.Schema({
    title: {type : String, unique :true},
    type: String,//中大長劇or悠遊中大 or快問快答
    college: String,//學院(1~8)
    insert: String, //youtubeID
    //introduce: String //影片介紹圖片
});

module.exports = mongoose.model( 'video', video );