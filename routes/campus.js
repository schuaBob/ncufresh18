var express = require('express');
var router = express.Router();

/* 校園導覽首頁 */
router.get('/', function(req, res, next) {
  res.render('campus/index', { title: '校園導覽' });
});

module.exports = router;
