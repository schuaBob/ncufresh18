/* Created by Andrew Lin on summer 2018. */
var mongoose = require('mongoose');

/**
 * schedule定義
 * 近期日程
 * date     date        日期
 * content  [string]    內容
 */
var schedule = mongoose.Schema({
    time    :  Date,
    content : [String]
});

module.exports = mongoose.model( 'schedule', schedule );