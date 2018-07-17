var mongoose = require('mongoose');

var community = mongoose.Schema({
    name : String,  // 社群名稱
    introduction : String, // 社群介紹
    participation : String, // 加入社群
    FB : String, // FB粉絲團
    activity : String, // 活動剪影文字
    intro_pic : [String], //介紹照片
    act_pic : [String], //活動照片

});

module.exports = mongoose.model( 'community', community );