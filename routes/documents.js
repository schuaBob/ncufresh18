var express = require('express');
var router = express.Router();

/* 新生必讀首頁 */
router.get('/', function(req, res, next) {
  res.render('documents/index', { title: '新生必讀' });
});

module.exports = router;
