var express = require('express');
var router = express.Router();

/* 中大生活首頁 */
router.get('/', function(req, res, next) {
  res.render('life/index', { title: '中大生活' });
});

module.exports = router;
