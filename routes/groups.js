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

router.get('/club', function(req, res, next) {
  res.render('groups/club', { title: '社團 ', user: req.user });
});

router.get('/community', function(req, res, next){
  res.render('groups/community', {title: '社群 ', user: req.user });
});

router.get('/department', function(req, res, next){
  res.render('groups/department', {title: '系所 ', user: req.user });
});

router.get('/student', function(req, res, next){
  res.render('groups/student', {title: '學生會 ', user: req.user });
});

  router.get('/department', function(req, res, next) {
    department.find({}).exec(function(err, department) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        res.render('groups/department', {
          title: '系所 ',
          user: req.user,
          firstClick: req.query.department,
          department: department,
        });
      });
    });

  router.get('/club', function(req, res, next) { 
    club.find({}).exec(function(err, club) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        res.render('groups/club', {
          title: '社團 ',
          user: req.user,
          firstClick: req.query.club,
          club: club,    
        });
      });
    });

  router.get('/community', function(req, res, next) { 
    community.find({}).exec(function(err, community) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        res.render('groups/community', {
          title: '社群 ',
          user: req.user,
          firstClick: req.query.community,
          community: community,    
        });
      });
    });

  router.get('/edit_club', isAdmin, function(req, res, next) {
    console.log(1234);
    club.findById(req.params.id, function(err, doc) {
      res.send(doc);
    });
  });

  router.post('/edit_club', isAdmin, function(req, res, next) {
    club.update({ _id: req.body.id }, {
      type: req.body.type,
      name: req.body.name,
      introduction: req.body.introduction,
      participation: req.body.participation,
      FB: req.body.FB,
      picture: req.body.picture,
    }, function(err, doc) {
      if (err) res.json(err);
      else res.redirect('/groups/club');
    });
  });

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;
