var express = require('express');
var router = express.Router();

/* 系所社團首頁 */
router.get('/', function(req, res, next) {
  res.render('groups/index', { title: '系所社團' });
});

module.exports = router;
