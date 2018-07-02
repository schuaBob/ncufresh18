/* Created by Andrew Lin on spring 2018. */
var mongoose = require('mongoose');

/**
 * feature_picture定義：
 * picture     {string}        五張圖片把位置存成陣列
 * type        string          english or chinese
 */
var example = mongoose.Schema({
    receivers     : [String],
});

module.exports = mongoose.model( 'example', example );
