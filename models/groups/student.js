var mongoose = require('mongoose');

var student = mongoose.Schema({
    name : String, // 學生會
    introduction : String, // 介紹
    branch : String, // 部門
    
});

module.exports = mongoose.model( 'student', student );