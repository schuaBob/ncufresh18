var express = require('express');
var router = express.Router();
//For NCU-OAuth2 shakehands
var url = require('url');
var request = require('request');
const PORTAL_CLIENT_ID = "Nzc3NzY0MmYtMDM2Ny00MjJhLWIxZTAtYTJmYzFlMDQyYzY4";
const PORTAL_CLIENT_SECRET = "5e7a8fbddb8f00a3c4c46defd331d412733f08bf893a8194a236fe915c57d11255e1b6c21567fe0c60647e1996a64cf1e6bd302163f18f978c23f0008356c5e7";

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
        return done(null, false, console.log("User not found"));
      }
      user.comparePassword(password, user.password, function (err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user, console.log(user.name+" login Successfully"));
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
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

/* home page */
router.get('/', function (req, res, next) {
  //console.log(req);
  res.render('index/index', { title: '首頁',req : req });
});

/* login page */
router.get('/login', function (req, res, next) {
  res.render('login/login', { title: '登入',req : req  });
});

//Login step 2
router.get('/password', function(req, res, next) {
  res.render('login/password', { title: '登入',req : req  });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}),
  function (req, res) {
    res.redirect('/');
  }
);


//NCU OAuth2 登入  
router.get('/auth/provider', function (req, res) {
  var url = 'https://api.cc.ncu.edu.tw/oauth/oauth/authorize?response_type=code&scope=user.info.basic.read&client_id=' + PORTAL_CLIENT_ID;
  res.redirect(url);
});

//NCU OAuth2 Callback reach here.
router.get('/auth/provider/callback', function (req, res, next) {
  //Parse the callback query to get code which is required to exchanging access token
  url.parse(req.url, true);
  //If user decline the permissoion to read profile from NCU OAuth2,redirect to login page 
  if (req.query.error || !req.query.code) {
    return res.redirect('/login');
  }
  
  // Grab accessToken by exchangine code with NCU OAuth2
  // refer to https://github.com/NCU-CC/API-Documentation/blob/master/oauth-service/authorization_code.md
  request.post({
    url: 'https://api.cc.ncu.edu.tw/oauth/oauth/token',
    form: {
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'client_id': PORTAL_CLIENT_ID,
      'client_secret': PORTAL_CLIENT_SECRET
    }
  }, function Callback(err, httpResponse, token) {
    if (err) {
      return console.error('failed:', err);
    }
    if (!httpResponse.statusCode === 200) {
      console.log('http status 200 response error!');
      return res.redirect('/login');
    }
    //Parse the response and the the access_token we need here.
    obj = JSON.parse(token);

    //Grab personal info by the  access_token
    request({
      url: 'https://api.cc.ncu.edu.tw/personnel/v1/info',
      headers: {
        'Authorization': 'Bearer' + obj.access_token,
      }
    }, function Callback(err, httpResponse, info) {
      if (err) {
        return console.error('failed:', err);
      }
      if (!httpResponse.statusCode === 200) {
        console.log('response error!');
        return res.redirect('/login');
      }
      //Parse JSON into object
      //refer to https://github.com/NCU-CC/API-Documentation/blob/master/personnel-service/v1/cards.md#structure
      personalObj = JSON.parse(info);
     // console.log(personalObj);
      // Find user in database , if not found create one
      //then always login;

       Users.findOne({ 'id': personalObj.id}, function(err, obj) {
       if (err) return next(err);
       //If found, login
         if (obj) {
           req.login(obj, function(err) {
             if (err) return next(err);
             console.log(personalObj.name+' Login')
             res.redirect('/');
           });
         } 
         else {
          let user = new Users({
            id: personalObj.id,
            name: personalObj.name,
            unit: personalObj.unit
          });
          //Create user in database
          Users.createUser(user, function (err, user) {
            if (err) return next(err);
            else {
                    req.login(user, function(err) {
                      if (err) return next(err);
                      console.log(user.name + " Created.");
                      console.log(personalObj.name+' Login')
                      res.redirect('/');
                    });
            }
          });
        }
       });
    });
  });
});


router.get('/logout', function(req, res, next){
  req.logout()
  res.redirect('/');
})


/* register page */
router.get('/register', function (req, res, next) {
  res.render('login/register', { title: '註冊',req : req  });
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
      if (err) return next(err);
      else console.log(id + " Created.");
    });
    //Placeholder for login

    res.redirect('/');
  }
});


/* comingsoon */
router.get('/comingsoon',isAdmin, function (req, res, next) {
  res.render('comingsoon/index', { title: '倒數' });
});

//Passport isAuthenticated wrapper
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('/');
  return next();
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;