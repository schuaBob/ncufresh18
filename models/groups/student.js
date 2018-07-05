var mongoose = require('mongoose');

var student = mongoose.Schema({
    introduction : String, // 介紹
    branch : String, // 部門
    picture : String, //活動剪影
    
});

module.exports = mongoose.model( 'student', student );