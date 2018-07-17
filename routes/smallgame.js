var express = require('express');
var router = express.Router();

/* 小遊戲首頁 */
router.get('/', function(req, res, next) {
  res.render('smallgame/index', { title: '小遊戲' });
});

router.post('/req_ajax', function (req, res, next) {
  var type = req.body.type;
  var info = req.body.info;
  console.log("服务器收到一个Ajax ["+type+"] 请求，信息为："+info);
  res.json(['success', "服务器收到一个Ajax ["+type+"] 请求，信息为："+info]);
})

router.get('/req_ajax', function(req, res, next){
  /* req.query对象
     通常称为GET请求参数。
     包含以键值对存放的查询字符串参数
     req.query不需要任何中间件即可使用
  */
  var type = req.query.type;
  var info = req.query.info;
  console.log("服务器收到一个Ajax ["+type+"] 请求，信息为："+info);
  res.json(['success', "服务器收到一个Ajax ["+type+"] 请求，信息为："+info]);
});

module.exports = router;
