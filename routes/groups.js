var express = require('express');
var router = express.Router();
var department = require('../models/groups/department');
var club = require('../models/groups/club');
var community = require('../models/groups/community');
var student = require('../models/groups/student');


/* 系所社團首頁 */
router.get('/', function(req, res, next) {
  res.render('groups/index', { title: '系所社團', user: req.user });
});

router.get('/department', function(req, res, next) {
  department.find({}).exec(function(err, department) {
    res.render('groups/department', {
      title: '系所 ',
      user: req.user,
      department: department,
    });
  });
});

router.get('/community', function(req, res, next) { 
  community.find({}).exec(function(err, community) {
    res.render('groups/community', {
      title: '其他學生組織 ',
      community: community,    
    });
  });
});

router.get('/student', function(req, res, next) {
  student.find({}).exec(function(err, student) { 
    res.render('groups/student', {
      title: '學生會',
      student: student,
    });
  });
});



/* 原本想用typelearn.play.date.service分類，後來不用那麼麻煩 */
router.get('/club', function(req, res, next) {
  club.find({type:"1"}).exec(function(err, club1) {
    club.find({type:"2"}).exec(function(err, club2) {
      club.find({type:"3"}).exec(function(err, club3) { 
        club.find({type:"4"}).exec(function(err, club4) {
          let club = club1.concat(club2).concat(club3).concat(club4);
          res.render('groups/club', {
            title: '社團',
            typelearn: club1,
            typeplay: club2,
            typedate: club3,
            typeservice: club4,
            club: club,
          });
        });
      });
    });
  });
});


/*新增編輯社團 */
router.post('/add_club', function(req, res, next) {
  let typenum = req.body.type[0];
  name = req.body.name;
  club.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new club ({
        type: typenum,
        name: req.body.name,
        introduction: req.body.introduction,
        participation: req.body.participation,
        FB: req.body.FB,
        picture: req.body.picture,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].participation = req.body.participation;
      data[0].FB = req.body.FB;
      data[0].picture = req.body.picture;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/club');
});

/* 新增編輯其他學生組織 */
router.post('/add_community', function(req, res, next) {
  name = req.body.name;
  community.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new community ({
        name: req.body.name,
        introduction: req.body.introduction,
        participation: req.body.participation,
        FB: req.body.FB,
        picture: req.body.picture,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].participation = req.body.participation;
      data[0].FB = req.body.FB;
      data[0].picture = req.body.picture;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/community');
});

/* 新增編輯系所 */
router.post('/add_department', function(req, res, next) {
  let typenum = req.body.type[0];
  name = req.body.name;
  college = req.body.type.slice(1);
  department.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new department ({
        type: typenum,
        college: college,
        name: req.body.name,
        introduction: req.body.introduction,
        organization: req.body.organization,
        activity: req.body.activity,
        team: req.body.team,
        course: req.body.course,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].organization = req.body.organization;
      data[0].activity = req.body.activity;
      data[0].team = req.body.team;
      data[0].course = req.body.course;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/department');
});
  

/* 學生會只有一項需要編輯所以直接update就可 */
  router.post('/edit_student', function(req, res, next) {
    student.update({
      introduction: req.body.introduction,
      branch: req.body.branch,
      picture: req.body.picture,
    }, function(err, doc) {
      if (err) {
        return next(err)
      }
      else 
      res.redirect('/groups/student');
    });
  });
  

  

module.exports = router;
