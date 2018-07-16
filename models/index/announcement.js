/* Created by Andrew Lin on summer 2018. */
var mongoose = require('mongoose');

/**
 * announcement(公告)定義
 * date     date    日期
 * title    string  標題
 * content  string  內容
 */
var announcement = mongoose.Schema({
    date    : Date,
    title   : String,
    content : String
});

module.exports = mongoose.model( 'announcement', announcement );
