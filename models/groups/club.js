var mongoose = require('mongoose');

var club = mongoose.Schema({
    type : String, // 性質類別
    name : String,  // 社團名稱
    introduction : String, // 社團介紹
    participation : String, // 加入社團
    FB : String, // FB粉絲團
    picture : [String], // 活動剪影
    
});

module.exports = mongoose.model( 'club', club );