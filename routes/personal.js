var express = require('express');
var router = express.Router();

/* 個人專區首頁 */
router.get('/', function(req, res, next) {
  res.render('about/index', { title: '個人專區' });
});

module.exports = router;
