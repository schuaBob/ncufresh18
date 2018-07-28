var express = require('express');
var router = express.Router();
var multer = require('multer') ;
var checkuser = require("./check-user") ;
var fs = require('fs') ;
var User = require('../models/index/user');
var mongoose = require('mongoose');
require('../models/qna/qna') ;
var Question = mongoose.model('Question');

var picname ;
/* 個人專區首頁 */
router.get('/',checkuser.isLoggedIn, function(req, res, next) {
  /* 拿發問紀錄 */
  
  fs.access("public/personal/bighead/"+req.user.id+".png", fs.constants.R_OK, (err) => {
    if(err){
      picname = "default.png" ;
    }
    else{
      picname = req.user.id+".png" ;
    }
    Question.find({Username : req.user.id}).exec(function(err, question){
      if(err){return next(err)};
      res.render('personal/index',{
        title : '個人專區' ,
        question:question,
        user:req.user,
        picname : picname
      });
    });
    // res.render('personal/index', { 
    //   title : '個人專區' , user : req.user ,picname : picname});
  });
});

/* 傳圖 */
var storage = multer.diskStorage({
  destination: "public/personal/bighead/",
  filename   : function(req, file, cb){
    console.log(req) ;
    var fileName = req.user.id + ".png";
    User.update({id: req.user.id}, { $set: {avatar: fileName}}, function(err, result) {
      if (err) {
        return next(err);
      }
    })
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage });

router.post('/editPicture', upload.single('picture') , function(req,res,next){
      res.redirect('/');
})




/* 拿分數*/
router.get('/getScore' ,function(req, res, next){
  /* 前端傳id */
  // console.log(req.user)
  var userID = req.user.id
  User.find({ id: userID}, 'score_high score_sum').exec(function(err, result) {
    if (err) throw err;
    res.send(result);
  }) 
})

module.exports = router;
