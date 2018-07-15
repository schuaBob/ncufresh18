var mongoose = require('mongoose');

var department = mongoose.Schema({
    type : String, 
    college: String,
    name : String,
    introduction : String, //系所介紹
    organization : String, //系學會
    activity : String, //系上活動
    team : String, //系隊
    course : String, //系上課程
    lightning_round : String, //快問快答
});

module.exports = mongoose.model( 'department', department );