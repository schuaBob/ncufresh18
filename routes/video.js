var express = require('express');
var router = express.Router();

/* 影音專區首頁 */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區' });
});


router.post('/add', isAdmin, function(req, res, next){

  res.redirect('/video');
})



function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;
