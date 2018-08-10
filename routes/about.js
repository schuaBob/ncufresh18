var express = require('express');
var router = express.Router();

/* 關於我們首頁. */
router.get('/', function(req, res, next) {
  res.render('about/index', { title: '關於我們 ｜ 新生知訊網' ,user:req.user});
});
module.exports = router;
