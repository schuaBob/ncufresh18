var mongoose = require('mongoose');

var community = mongoose.Schema({
    name : String,  // 社群名稱
    introduction : String, // 社群介紹
    participation : String, // 加入社群
    FB : String, // FB粉絲團
    picture : [String], // 活動剪影
    
});

module.exports = mongoose.model( 'community', community );