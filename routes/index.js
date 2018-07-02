var express = require('express');
var router = express.Router();

/* 首頁 */
router.get('/', function(req, res, next) {
  res.render('index/index', { title: '首頁' });
});

/* login page */
router.get('/login', function(req, res, next) {
  res.render('login/login', { title: '登入' });
});

/* register page */
router.get('/register', function(req, res, next) {
  res.render('login/register', { title: '註冊' });
});
module.exports = router;