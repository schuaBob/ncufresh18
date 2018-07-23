var express = require('express');
var router = express.Router();

var User = require('../models/index/user');

/* 小遊戲首頁 */
router.get('/', function(req, res, next) {
  res.render('smallgame/index', { title: '小遊戲' , user: req.user});
});

// 上傳分數
router.post('/setScore', function (req, res, next) {
  var newScore = req.body.score;
  var temp;
  console.log(req.user)
  User.findOne({
    'id': req.user.id
  }, function (err, adventure) {
    // 更新最高分數
    if (newScore > adventure.score_high) {
      User.update({ id: req.user.id}, { $set: {score_high: newScore}}, function (err, res) {
        if (err) {
          throw err;
        } 
    });
    }
    // 更新累計分數
    temp = adventure.score_sum;
    var allScore = parseInt(temp) + parseInt(newScore);
    User.update({ id: req.user.id}, { $set: {score_sum: allScore}}, function (err, res) {
        if (err) {
          throw err;
        } 
    });
  });
  console.log("伺服器收到 setScore 請求\nscore = " + req.body.score);
  res.send("setScore 執行完畢！");
})

// 傳遞分數給前端
router.get('/getScore', function(req, res, next){
  var type = req.query.type;
  if (type === 'high') {
    User.find({ score_high: { $gt: 0 }}, 'name score_high').sort({ score_high: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  } else {
    User.find({ score_sum: { $gt: 0 }}, 'name score_sum').sort({ score_sum: -1}).limit(10).exec(function(err, result) {
      if (err) throw err;
      res.send(result);
    }) 
  }
});


module.exports = router;
