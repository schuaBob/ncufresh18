var express = require('express');
var router = express.Router();
var Document = require('../models/document/document');
//判斷登入狀態
var check = require('../routes/check-user');

// 新生必讀首頁 
router.get('/', function (req, res, next) {

  res.render('documents/index', { title: '新生必讀 ｜ 新生知訊網', user: req.user });

});


//從資料庫要資料(for both user and editor)
router.get('/require_data/:id', function (req, res, next) {
  Document.findOne({ count: req.params.id }).exec(function (err, data) {
    //console.log("require");
    if (err) return next(err);
    res.send(data);
  });
});


router.post('/edit/:id',check.isAdmin, function (req, res, next) {
  Document.updateOne({ count: req.params.id }, { title: req.body.title, content: req.body.add_text },
    function (err, result) {
     // console.log(result);
      if (err)
        console.log(req.user.id+' failed to update article: '+req.body.title);
      console.log(req.user.id+' update article: '+req.body.title);
      return res.redirect('/documents');
    });
});






module.exports = router;
