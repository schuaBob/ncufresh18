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

router.post('/register', function(req, res){
  //Backend Validation
  let name = req.body.name;
  let password = req.body.password;
  let checkpassword = req.body.checkpassword;
  let id=req.body.id;

  req.checkBody('id', 'ID is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('checkpassword', 'Confirm Password is required').notEmpty();
  req.checkBody('checkpassword', 'Confirm Password Must Matches With Password').equals(req.body.password);

  let errors = req.validationErrors();
  if(errors){
    console.log(errors[0]);
  }
  else{
    console.log('Success');
  }
});

/* comingsoon page */
router.get('/comingsoon', function(req, res, next) {
  res.render('comingsoon/index', { title: '倒數' });
});  
module.exports = router;