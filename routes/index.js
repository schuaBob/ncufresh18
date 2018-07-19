var express = require('express');
var router = express.Router();
//User schema
var Users = require('../models/index/user');

//passport
var passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, id, password, done) {
    Users.findOne({ id: id }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, console.log("user not find."));
      }
      user.comparePassword(password, user.password, function (err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user, console.log("Success Login"));
        }
        else {
          return done(null, false, console.log("Error Password"));
        }
      });
    });
  }
))

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* home page */
router.get('/', function (req, res, next) {
  res.render('index/index', { title: '首頁' });
});

/* login page */
router.get('/login', function (req, res, next) {
  res.render('login/login', { title: '登入' });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login/login'
}),
  function (req, res) {
    res.redirect('/');
  }
);

/* register page */
router.get('/register', function (req, res, next) {
  res.render('login/register', { title: '註冊' });
});

router.post('/register', function (req, res) {
  //Backend Validation
  let name = req.body.name;
  let password = req.body.password;
  let checkpassword = req.body.checkpassword;
  let id = req.body.id;

  req.checkBody('id', 'ID is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('checkpassword', 'Confirm Password is required').notEmpty();
  req.checkBody('checkpassword', 'Confirm Password Must Matches With Password').equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    console.log(errors[0]);
  }
  else {
    let user = new Users({
      id: id,
      name: name,
      password: password
    });
    //Create user in database
    Users.createUser(user, function (err, user) {
      if (err) throw err;
      else console.log(id + " Created.");
    });
    //Placeholder for login

    res.redirect('/');
  }
});


/* comingsoon */
router.get('/comingsoon', function (req, res, next) {
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