var express = require('express');
var router = express.Router();

/* home page */
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

/* comingsoon page */
router.get('/comingsoon', function(req, res, next) {
  res.render('comingsoon/index', { title: '倒數' });
});  

//Passport isAuthenticated wrapper
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('/');
  return next();
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.role === 'admin')
    return next();
  res.redirect('/');
}
module.exports = router;