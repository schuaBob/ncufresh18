var express = require('express');
var router = express.Router();

/* 校園導覽首頁 */
router.get('/', function(req, res, next) {
  res.render('campus/index', { title: '校園導覽' });
});
router.get('/editElement', function(req, res, next) {
  res.render('campus/editElement', { title: '編輯物件' });
});

module.exports = router;
