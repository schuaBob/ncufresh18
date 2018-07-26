var express = require('express');
var router = express.Router();
//For NCU-OAuth2 shakehands
var url = require('url');
var request = require('request');
const PORTAL_CLIENT_ID = "Nzc3NzY0MmYtMDM2Ny00MjJhLWIxZTAtYTJmYzFlMDQyYzY4";
const PORTAL_CLIENT_SECRET = "5e7a8fbddb8f00a3c4c46defd331d412733f08bf893a8194a236fe915c57d11255e1b6c21567fe0c60647e1996a64cf1e6bd302163f18f978c23f0008356c5e7";

var mongoose = require('mongoose');
//schema
var Users = require('../models/index/user');
var news = require('../models/index/news');
var schedule = require('../models/index/schedule');

var checkUser = require('./check-user');

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
        console.log(id+'不存在');
        return done(null, false, {message: '使用者名稱或密碼錯誤'});
      }
      user.comparePassword(password, user.password, function (err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user, console.log(user.id + " login Successfully"));
        }
        else {
          console.log(id+'密碼錯誤');
          return done(null, false, {message: '使用者名稱或密碼錯誤'});
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


//Pass error message through all pages in index route
router.get('*',function(req,res,next){
  res.locals.error=req.flash('error');
  next();
});
/* home page */
router.get('/', function (req, res, next) {
  res.render('index/index', { title: '首頁', user: req.user });
});

/* home page administer page */
router.get('/index_admin', (req, res, next) => {
  Promise.all([
    news.find().exec(),
    schedule.find().exec()
  ]).then((result) => {
    res.render("index/index_admin", { title : "編輯首頁的頁面", user : req.user, news : result[0], schedule : result[1]});
  }).catch((err) => {
    return next(err);
  })
})

/* add news */
router.post('/add_news', (req, res, next) => {
  let temp = new Date(req.body.time);
  if (isNaN(temp.getTime())) {  // date is not valid
    return res.redirect('index_admin');
  }
  new news({
    time    : temp,
    title   : req.body.title,
    content : req.body.content,
  }).save((err) => {
    if (err) return next(err);
    res.redirect('index_admin');
  })
})

/* edit news page */
router.get('/edit_news/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next();
  }
  news.findById(req.params.id).exec((err, result) => {
    if(err) return next(err);
    if(result){
      res.render("index/edit_news", { title : "編輯最新消息頁面", user : req.user, news: result});
    }else{
      return next();
    }
  })
})

/* update news */
router.post('/edit_news/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next();
  }
  let temp = new Date(req.body.time);
  if (isNaN(temp.getTime())) {  // date is not valid
    return res.redirect('../index_admin');
  }
  news.findByIdAndUpdate(req.params.id, {
    time    : temp,
    title   : req.body.title,
    content : req.body.content,
  }).exec((err, result) => {
    if(err) return next(err);
    res.redirect('../index_admin');
  })
})

/* delete news */
router.get('/delete_news/:id', (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)){
    news.findByIdAndRemove(req.params.id).exec((err) => {
      if(err) return next(err);
    })
  }
  res.redirect('../index_admin');
})

/* add schedule */
router.post('/add_schedule', (req, res, next) => {
  let temp = new Date(req.body.time);
  if (isNaN(temp.getTime())) { // date is not valid
    return res.redirect('index_admin');
  }
  new schedule({
    time    : new Date(req.body.time),
    content : []
  }).save((err) => {
    if (err) return next(err);
    res.redirect('index_admin');
  })
})

/* update schedule's content */
router.post('/update_schedule_content/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next();
  }
  let content;
  if (req.body.content){
    if (Array.isArray(req.body.content)){
      content = req.body.content;
    }else{
      content = [req.body.content];
    }
  }else{
    content = [];
  }
  schedule.findByIdAndUpdate(req.params.id, {
    content : content
  }).exec((err, result) => {
    if(err) return next(err);
    res.redirect('../index_admin');
  })
})

/* update schedule's time */
router.post('/update_schedule_time/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next();
  }
  let temp = new Date(req.body.time);
  if (isNaN(temp.getTime())) { // date is not valid
    return res.redirect('index_admin');
  }
  schedule.findByIdAndUpdate(req.params.id, {
    time : temp
  }).exec((err, result) => {
    if(err) return next(err);
    res.redirect('../index_admin');
  })
})

/* delete schedule */
router.get('/delete_schedule/:id', (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)){
    schedule.findByIdAndRemove(req.params.id).exec((err) => {
      if(err) return next(err);
    })
  }
  res.redirect('../index_admin');
})

/* login page */
router.get('/login', function (req, res, next) {
 // res.render('login/login', { title: '登入', user: req.user, message: req.flash('error')});
 res.render('login/login', { title: '登入', user: req.user});
});



router.post('/login', function (req, res, next) {
  let grade = req.body.id.substring(0, 3);
  if (grade !== '107')
    return res.redirect('auth/provider');
  Users.findOne({ 'id': req.body.id }, function (err, obj) {
      if (err) return res.redirect('/login');
      //If found, login
      if (obj && obj.password) {
        res.redirect('password?id='+req.body.id);
      }else{
        res.redirect('register?id='+req.body.id);
      }
  })
});



router.get('/password', function (req, res, next) {
  res.render('login/password', { title: '登入', user : req.user });
});

router.post('/password', passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

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

      Users.findOne({ 'id': personalObj.id }, function (err, obj) {
        if (err) return next(err);
        //If found, login
        if (obj) {
          req.login(obj, function (err) {
            if (err) return next(err);
            console.log(personalObj.id + ' Login')
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
              req.login(user, function (err) {
                if (err) return next(err);
                console.log(user.id + " Created.");
                console.log(personalObj.id + ' Login')
                res.redirect('/');
              });
            }
          });
        }
      });
    });
  });
});


router.get('/logout', function (req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})


/* register page */
router.get('/register', function (req, res, next) {
  res.render('login/register', { title: '註冊', user: req.user  });
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
    return console.log(errors[0]);
  }
  Users.findOne({ 'id': id }, function (err, obj) {
    if (err) {
      res.redirect('login');
      return next(err);
    }
    if(!obj)
       return res.redirect('register?id=' + id);
    if (obj.name !== name) {
      return res.redirect('register?id=' + id);
    }
    //If found,try to login
    else{
        obj.password = password;
      //Create password for the user in database
      Users.createUser(obj, function (err, user) {
        if (err) return next(err);
        else console.log(id + " Created.");
        req.login(user, function (err) {
          if (err) return next(err);
          console.log(obj.id + ' Login')
          res.redirect('/');
        });
      });

    }
  });
});


/* comingsoon */
router.get('/comingsoon', function (req, res, next) {
  res.render('comingsoon/index', { title: '倒數' });
});

module.exports = router;