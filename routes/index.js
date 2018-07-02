var express = require('express');
var router = express.Router();

/* 首頁 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首頁' });
});

module.exports = router;
