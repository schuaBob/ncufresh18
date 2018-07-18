var mongoose = require('mongoose');

var student = mongoose.Schema({
    introduction : String, // 介紹
    branch : String, // 部門
    activity : String, //活動剪影文字
    intro_pic : [String], // 介紹照片
    act_pic : [String], //活動剪影照片
});

module.exports = mongoose.model( 'student', student );