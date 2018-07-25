var express = require('express');
var router = express.Router();

var User = require('../models/index/user');
var UserScore = require('../models/smallgame/score');

/* 小遊戲首頁 */
router.get('/', function(req, res, next) {
  res.render('smallgame/index', { title: '小遊戲' , user: req.user});
});

// 上傳分數
router.post('/setScore', function (req, res, next) {
  var newScore = req.body.score;
  var player
  var temp;
  console.log(req.user)
  UserScore.findOne({
    'id': req.user.id
  }, function(err, user) {
    // 此用戶不存在, 新建
    if (user === null) {
      // 從總數據庫中尋找
      User.findOne({
        'id': req.user.id
      }, function(err, newUser) {
        if(err) console.log(err);
        player = {
          id: newUser.id,
          name: newUser.name,
          score_sum: newUser.score_sum,
          score_high: newUser.score_high,
          avatar: newUser.avatar
        }
        UserScore.create(player, function(err, result){
          if(err) console.log(err);
          console.log('新建用戶：' + result);
        });
        updateScore(player)
      })
    } else {
      player = user
      updateScore(player)
    }
    
    // 更新數據到總表和小遊戲表
    function updateScore(player) {
      // 更新最高分數
      if (newScore > player.score_high) {
        // 更新總表
        User.update({ id: req.user.id}, { $set: {score_high: newScore}}, function (err, res) {
          if (err) {
            throw err;
          } 
        });
        // 更新小遊戲表
        UserScore.update({ id: req.user.id}, { $set: {score_high: newScore}}, function (err, res) {
          if (err) {
            throw err;
          } 
        });
      }
      // 更新累計分數
      temp = player.score_sum;
      var allScore = parseInt(temp) + parseInt(newScore);
      User.update({ id: req.user.id}, { $set: {score_sum: allScore}}, function (err, res) {
          if (err) {
            throw err;
          } 
      });
      UserScore.update({ id: req.user.id}, { $set: {score_sum: allScore}}, function (err, res) {
          if (err) {
            throw err;
          } 
      });
    }
  });
})

// 傳遞分數給前端
router.get('/getScore', function(req, res, next){
  var type = req.query.type;
  if (type === 'high') {
    User.find({ score_high: { $gte: 0 }}, 'name score_high avatar').sort({ score_high: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  } else {
    User.find({ score_sum: { $gte: 0 }}, 'name score_sum avatar').sort({ score_sum: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  }
});

module.exports = router;