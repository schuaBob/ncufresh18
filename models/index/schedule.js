/* Created by Andrew Lin on summer 2018. */
var mongoose = require('mongoose');

/**
 * schedule(行事曆)定義
 * date     date    日期
 * content  string  內容
 */
var schedule = mongoose.Schema({
    date    : Date,
    content : String
});

module.exports = mongoose.model( 'schedule', schedule );