var express = require('express');
var router = express.Router();

/* 小遊戲首頁 */
router.get('/', function(req, res, next) {
  res.render('smallgame/index', { title: '小遊戲' ,user : req.user});
});

// 上傳分數
router.post('/setScore', function (req, res, next) {

  console.log("伺服器收到 setScore 請求\nscore = " + req.body.score);
  res.send("setScore 執行完畢！")
})

// 傳遞分數給前端
router.get('/getScore', function(req, res, next){
  var userScore = 10
  var userName = "admin"
  console.log("伺服器收到 getScore 請求！\n用戶 " + userName + " " + userScore);
  res.send("getScore 執行完畢！")
});

module.exports = router;
