/* Created by Andrew Lin on summer 2018. */
var mongoose = require('mongoose');

/**
 * news定義：
 * 最新消息
 * time     Date    時間
 * title    String  標題
 * content  String  內文
 */
var news = mongoose.Schema({
    time    : Date,
    title   : String,
    content : String,
});

module.exports = mongoose.model( 'news', news );
