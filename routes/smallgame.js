var express = require('express');
var router = express.Router();

/* 小遊戲首頁 */
router.get('/', function(req, res, next) {
  res.render('smallgame/index', { title: '小遊戲' });
});

module.exports = router;
