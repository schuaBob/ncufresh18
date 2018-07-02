var express = require('express');
var router = express.Router();

/* 影音專區首頁 */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區' });
});

module.exports = router;
