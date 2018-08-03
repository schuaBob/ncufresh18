var mongoose = require('mongoose');
/**
 * Answer不空白 =>審核通過
 * Reason不空白 =>被管理員刪除
 * DeleteDate存在 =>使用者自己刪除
 * CreateDate新增問題時是新增問題的時間，管理員新增答案時會更新成回答問題的時間
 */
var Question = mongoose.Schema({
    Username:String,//使用者名稱
    Title: String, //問題標題
    Type: String, //問題類型
    Content: String, //問題內容
    Answer:String,//問題的答案
    CreateDate: Date,//創立日期
    Click: Number,//點擊次數
    Reason: String, //被刪除理由
    DeleteDate: Date//被刪除日期
});
var Rule = mongoose.Schema({
    Title:String,//板規標題
    Type:String,//板規類型
    Content:String,//板規內容
    CreateDate:Date,//板規建立日期
    Click:Number//板規點擊數
});
// var deleteReason =mongoose.Schema({
//     Username:String,//使用者名稱
//     QuestionId: String, //問題標題
//     Reason: String, //被刪除理由
//     CreateDate: Date,//被刪除日期
// });
module.exports = mongoose.model( 'Question', Question );
module.exports = mongoose.model( 'Rule', Rule );
//module.exports = mongoose.model( 'deleteReason', deleteReason );
