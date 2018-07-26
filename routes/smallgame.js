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
  var player = {
    id: req.user.id,
    name: req.user.name,
    score_high: req.user.score_high,
    score_sum: req.user.score_sum,
    avatar: req.user.avatar
  }
  var newScoreHigh = req.body.score;
  var newScoreSum = parseInt(newScoreHigh) + parseInt(player.score_sum)
  if (newScoreHigh < req.user.score_high) {
    newScoreHigh = req.user.score_high
  }
  player.score_high = newScoreHigh
  player.score_sum = newScoreSum
  // 更新總表分數
  User.update({ id: req.user.id}, { $set: {score_high: newScoreHigh, score_sum: newScoreSum}}, function(err, res) {
    if (err) {
      return next(err);
    } 
  });

  console.log("player: " + player.id)
  var count;
  UserScore.count({}, function(err, result) {
    count = parseInt(result);
    console.log("count: " + count)
    // UserScore 中少於 10 個直接新建
    if (count < 10) {
      UserScore.findOne({ id: player.id}, function(err, result) {
        if (err) {
          return next(err);
        }
        if (result) {
          UserScore.update({ id: player.id}, { $set: {
            score_high: player.score_high,
            score_sum: player.score_sum,
            id: player.id,
            name: player.name,
            avatar: player.avatar
          }}, function(err, result) {
            if (err) {
              return next(err);
            }
          })
        } else {
          UserScore.create(player, function(err, result){
            if(err) {
              return next(err);
            }
            console.log('新建用戶：' + result);
          });
        }   
      })
      res.end()
    } else {
      // highScore 為 UserScore 中的最小分數
      var highScore = {
        id_high: "",
        id_sum: "",
        score_high: 0,
        score_sum: 0
      }
      UserScore.findOne({ score_high: { $gte: 0 }}, 'id score_high avatar').sort({ score_high: 1}).limit(10).exec(function(err, result) {
        if (err) {
          return next(err);
        }
        if (result !== null) {
          highScore.id_high = result.id
          highScore.score_high = result.score_high;
        }
      });
      UserScore.findOne({ score_sum: { $gte: 0 }}, 'id score_sum avatar').sort({ score_sum: 1}).limit(10).exec(function(err, result) {
        if (err) {
          return next(err);
        }
        if (result !== null) {
          highScore.id_sum = result.id
          highScore.score_sum = result.score_sum;
        }
      });
      
      // 如果用戶已經在 UserScore 中則直接更新
      console.log("用戶已在 UserScore")
      UserScore.findOne({ id: player.id}, function(err, result) {
        if (err) {
          return next(err);
        }
        if (result) {
          UserScore.update({ id: player.id}, { $set: {
            score_high: player.score_high,
            score_sum: player.score_sum,
            id: player.id,
            name: player.name,
            avatar: player.avatar
          }}, function(err, result) {
            if (err) {
              return next(err);
            }
          });
        } else {
          // 如果分數大於 highScore 則替換 UserScore 中的最後一名
          console.log("用戶不在 UserScore")
          if (player.score_high > highScore.score_high) {
            UserScore.update({ id: highScore.id_high}, { $set: {
              score_sum: player.score_sum,      
              score_high: player.score_high,
              id: player.id,
              name: player.name,
              avatar: player.avatar
            }}, function(err, result) {
              if (err) {
                return next(err);
              }
            })
          }
        
          if (player.score_sum > highScore.score_sum) {
            UserScore.update({ id: highScore.id_sum}, { $set: {
              score_sum: player.score_sum,
              score_high: player.score_high,
              id: player.id,
              name: player.name,
              avatar: player.avatar
            }}, function(err, result) {
              if (err) {
                return next(err);
              }
            })
          }
        }   
      }) 
    }
    res.end();
  });
});

// 傳遞分數給前端
router.get('/getScore', function(req, res, next){
  var type = req.query.type;
  if (type === 'high') {
    UserScore.find({ score_high: { $gte: 0 }}, 'name score_high avatar').sort({ score_high: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  } else {
    UserScore.find({ score_sum: { $gte: 0 }}, 'name score_sum avatar').sort({ score_sum: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  }
});

module.exports = router;