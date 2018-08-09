var express = require('express');
var router = express.Router();

var User = require('../models/index/user');
var UserScore = require('../models/smallgame/score');
var checkLogin = require('./check-user')

/* 小遊戲首頁 */
router.get('/', checkLogin.isLoggedIn, function (req, res, next) {
  UserScore.find({}, 'avatar id').sort({
    score_high: -1
  }).exec(function (err, result) {
    if (err) throw err;
    res.render('smallgame/index', {
      title: '小遊戲 ｜ 新生知訊網',
      user: req.user,
      result: result
    });
  })
});

// 上傳分數
router.post('/setScore', checkLogin.isLoggedIn, function (req, res, next) {
  // 驗證 60s
  User.findOne({
    id: req.user.id
  }, function (err, result) {
    var resultDate = new Date(result.update).getTime()
    var nowTime = Date.now()
    var checkTime = nowTime - resultDate
    // 間隔 60s 才能 post
    if (checkTime > 50000) {
      var player = {
        id: req.user.id,
        name: req.user.name,
        score_high: req.user.score_high,
        score_sum: req.user.score_sum,
        avatar: req.user.avatar
      }

      var newScoreHigh = Math.floor(parseInt(req.body.score));
      if (parseInt(req.body.score) < 100 || parseInt(req.body.score) > 17000 || (parseInt(req.body.score) % 100 != 0)) {
        newScoreHigh = 0
      }
      // console.log("player: " + player.id)
      // console.log("score: " + newScoreHigh)
      var newScoreSum = newScoreHigh + parseInt(player.score_sum);
      if (newScoreHigh < req.user.score_high) {
        newScoreHigh = req.user.score_high
      }
      player.score_high = newScoreHigh
      player.score_sum = newScoreSum
      // 更新總表分數
      User.update({
        id: req.user.id
      }, {
        $set: {
          score_high: newScoreHigh,
          score_sum: newScoreSum,
          update: nowTime
        }
      }, function (err, res) {
        if (err) {
          return next(err);
        }
      });

      var count;
      UserScore.count({}, function (err, result) {
        count = parseInt(result);
        // UserScore 中少於 20 個直接新建
        if (count < 20) {
          UserScore.findOne({
            id: player.id
          }, function (err, result) {
            if (err) {
              return next(err);
            }
            // UserScore 中存在此用戶
            if (result) {
              UserScore.update({
                id: player.id
              }, {
                $set: {
                  score_high: player.score_high,
                  score_sum: player.score_sum,
                  id: player.id,
                  name: player.name,
                  avatar: player.avatar
                }
              }, function (err, result) {
                if (err) {
                  return next(err);
                }
              })
            } else {
              UserScore.create(player, function (err, result) {
                if (err) {
                  return next(err);
                }
                // console.log('新建用戶：' + result);
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

          // 保證執行順序
          new Promise((resolve, reject) => {
            queryHigh(resolve)
          }).then(res => {
            new Promise((resolve, reject) => {
              querySum(resolve)
            }).then(res => {
              updateAll()
            })
          }).catch(function (err) {
            return next(err);
          })

          function queryHigh(resolve) {
            // console.log("step 1\n")
            UserScore.findOne({
              score_high: {
                $gte: 0
              }
            }, 'id score_high avatar').sort({
              score_high: 1
            }).limit(10).exec(function (err, result) {
              if (err) {
                return next(err);
              }
              if (result !== null) {
                // console.log("resultHigh: " + result)
                highScore.id_high = result.id
                highScore.score_high = result.score_high;
                resolve();
              }
            });
          }

          function querySum(resolve) {
            // console.log("step 2\n")
            UserScore.findOne({
              score_sum: {
                $gte: 0
              }
            }, 'id score_sum avatar').sort({
              score_sum: 1
            }).limit(10).exec(function (err, result) {
              if (err) {
                return next(err);
              }
              if (result !== null) {
                highScore.id_sum = result.id
                highScore.score_sum = result.score_sum;
                resolve();
              }
            });
          }

          function updateAll() {
            UserScore.findOne({
              id: player.id
            }, function (err, result) {
              if (err) {
                return next(err);
              }
              // 如果用戶已經在 UserScore 中則直接更新
              if (result != null) {
                UserScore.update({
                  id: player.id
                }, {
                  $set: {
                    score_high: player.score_high,
                    score_sum: player.score_sum,
                    id: player.id,
                    name: player.name,
                    avatar: player.avatar
                  }
                }, function (err, result) {
                  if (err) {
                    return next(err);
                  }
                });
              } else {
                // 如果分數大於 highScore 則替換 UserScore 中的最後一名
                // flag = 1時代表 player 已在單次最高進榜，如果進入累計排行榜的判斷則不替換
                var flag = 0;
                if (player.score_high > highScore.score_high) {
                  flag = 1;
                  // console.log('111:' + highScore.id_high)
                  UserScore.update({
                    id: highScore.id_high
                  }, {
                    $set: {
                      score_sum: player.score_sum,
                      score_high: player.score_high,
                      id: player.id,
                      name: player.name,
                      avatar: player.avatar
                    }
                  }, function (err, result) {
                    if (err) {
                      return next(err);
                    }
                  })
                }

                if (player.score_sum > highScore.score_sum) {
                  if (flag !== 1) {
                    // console.log('222:' + highScore.id_sum)
                    UserScore.update({
                      id: highScore.id_sum
                    }, {
                      $set: {
                        score_sum: player.score_sum,
                        score_high: player.score_high,
                        id: player.id,
                        name: player.name,
                        avatar: player.avatar
                      }
                    }, function (err, result) {
                      if (err) {
                        return next(err);
                      }
                    })
                  }
                }
              }
            })
          }

        }
        res.end();
      });
    } else {
      res.end('Do not do anything illegal!!!');
    }
  })
});

// 傳遞分數給前端
router.get('/getScore', checkLogin.isLoggedIn, function (req, res, next) {
  var type = req.query.type;
  if (type === 'high') {
    UserScore.find({
      score_high: {
        $gte: 0
      }
    }, 'id name score_high avatar').sort({
      score_high: -1
    }).limit(10).exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    })
  } else {
    UserScore.find({
      score_sum: {
        $gte: 0
      }
    }, 'id name score_sum avatar').sort({
      score_sum: -1
    }).limit(10).exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    })
  }
});

module.exports = router;