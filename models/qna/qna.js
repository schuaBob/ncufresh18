var mongoose = require('mongoose');

var Question =new Schema({
    Username: String, 
    Type: String, //文章類型
    Title: String, //文章標題
    Article: String, //文章內容
    CreateDate: Date
});

module.exports = mongoose.model( 'Question', Question );