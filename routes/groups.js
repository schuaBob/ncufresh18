var express = require('express');
var router = express.Router();
var department = require('../models/groups/department');
var club = require('../models/groups/club');
var community = require('../models/groups/community');
var student = require('../models/groups/student');


/* 系所社團首頁 */
router.get('/', function(req, res, next) {
  res.render('groups/index', { title: '系所社團' });
});

// router.get('/club', function(req, res, next) {
//   res.render('groups/club', { title: '社團 ', user: req.user });
// });

router.get('/community', function(req, res, next){
  res.render('groups/community', {title: '社群 ', user: req.user });
});

router.get('/department', function(req, res, next){
  res.render('groups/department', {title: '系所 ', user: req.user });
});

// router.get('/student', function(req, res, next){
//   res.render('groups/student', {title: '學生會 ', user: req.user });
// });

router.get('/department', function(req, res, next) {
  department.find({}).exec(function(err, department) {
    res.render('groups/department', {
      title: '系所 ',
      user: req.user,
      department: department,
    });
  });
});

  router.get('/club', function(req, res, next) { 
    club.find({}).exec(function(err, club) {
        res.render('groups/club', {
          title: '社團 ',
          user: req.user,
          club: club,    
        });
      });
    });

    router.get('/community', function(req, res, next) { 
    community.find({}).exec(function(err, community) {
        res.render('groups/community', {
          title: '社群 ',
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


  router.post('/edit_club', function(req, res, next) {
    club.update({  
      typenum: req.body.typenum,
      name: req.body.name,
      introduction: req.body.introduction,
      participation: req.body.participation,
      FB: req.body.FB,
      picture: req.body.picture,
    }, function(err, doc) {
      if (err) {
      return next(err)
      }
      else 
      res.redirect('/groups/club');
    });
  });

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
  

  router.post('/add_club', function(req, res, next) {
    var cb = new club ({
      typenum: req.body.typenum,
      name: req.body.name,
      introduction: req.body.introduction,
      participation: req.body.participation,
      FB: req.body.FB,
      picture: req.body.picture,
    }).save(function(err, doc) {
      if (err) {
        return next(err)
      }
      else 
      res.redirect('/groups/club');
    });
  });

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;
