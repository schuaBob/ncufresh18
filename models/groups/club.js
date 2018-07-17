var mongoose = require('mongoose');

var club = mongoose.Schema({
    type : String, // 性質類別
    name : String,  // 社團名稱
    introduction : String, // 社團介紹
    participation : String, // 加入社團
    FB : String, // FB粉絲團
    activity : String, //活動剪影文字
    intro_pic : [String], //社團介紹照片
    act_pic : [String], // 活動剪影照片
});

module.exports = mongoose.model( 'club', club );