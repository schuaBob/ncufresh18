var express = require('express');
var router = express.Router();
var multer = require('multer') ;
var checkuser = require("./check-user") ;
var fs = require('fs') ;
var picname ;
/* 個人專區首頁 */
router.get('/', function(req, res, next) {
  console.log(req.user) ;
  fs.access("public/personal/bighead/"+req.user.id+".png", fs.constants.R_OK, (err) => {
    if(err){
      picname = "預設頭貼.png" ;
    }
    else{
      picname = req.user.id+".png" ;
    }
    res.render('personal/index', { title : '個人專區' , user : req.user ,picname : picname});
  });
});

/* 傳圖 */
var storage = multer.diskStorage({
  destination: "public/personal/bighead/",
  filename   : function(req, file, cb){
    console.log(req) ;
    var fileName = req.user.id + ".png";
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage });

router.post('/editPicture', upload.single('picture') , function(req,res,next){
  res.redirect('back');
})



module.exports = router;
