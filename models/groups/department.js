var mongoose = require('mongoose');

var department = mongoose.Schema({
    type : String, 
    college: String,
    name : String,
    introduction : String, //系所介紹
    intro_pic : [String],
    organization : String, //系學會
    organ_pic : [String],
    activity : String, //系上活動
    act_pic : [String],
    team : String, //系隊
    team_pic : [String],
    course : String, //系上課程
    lightning_round : String, //快問快答
});

module.exports = mongoose.model( 'department', department );