var express = require('express');
var router = express.Router();

/* 系所社團首頁 */
router.get('/', function(req, res, next) {
  res.render('groups/index', { title: '系所社團' });
});

router.get('/club', function(req, res, next) {
  res.render('groups/club', { title: '社團 ｜ 新生知訊網', user: req.user });
});

router.get('/community', function(req, res, next){
  res.render('groups/community', {title: '社群 ｜ 新生知訊網', user: req.user });
});

router.get('/department', function(req, res, next){
  res.render('groups/department', {title: '系所 ｜ 新生知訊網', user: req.user });
});

router.get('/student_union', function(req, res, next){
  res.render('groups/student_union', {title: '學生會 ｜ 新生知訊網', user: req.user });
});

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;
