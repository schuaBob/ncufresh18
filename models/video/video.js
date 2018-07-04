var mongoose = require('mongoose');

var video = mongoose.Schema({
    type: String,
    insert: String, //youtube嵌入碼
    introduce: String //影片介紹圖片路徑
});

module.exports = mongoose.model( 'video', video );