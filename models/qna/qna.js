var mongoose = require('mongoose');

var Question =new Schema({
    Title: String, //問題標題
    Type: String, //問題類型
    Content: String, //問題內容
    CreateDate: Date
});

module.exports = mongoose.model( 'Question', question );