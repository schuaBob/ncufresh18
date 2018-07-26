var express = require('express');
var router = express.Router();
var multer = require('multer') ;
var checkuser = require("./check-user") ;

/* 個人專區首頁 */
router.get('/', function(req, res, next) {
  res.render('personal/index', { title : '個人專區' , user : req.user});
});

/* 傳圖 */
var storage = multer.diskStorage({
  destination: "public/personal/bighead/",
  filename   : function(req, file, cb){
    console.log(req) ;
    var fileName = req.user.id + ".jpg";
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
  User.find({ id: userID}, 'score_high').exec(function(err, result) {
    if (err) throw err;
    res.send(result);
  }) 
})

module.exports = router;
