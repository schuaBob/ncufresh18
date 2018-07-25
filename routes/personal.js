var express = require('express');
var router = express.Router();
var multer = require('multer') ;


/* 個人專區首頁 */
router.get('/', function(req, res, next) {
  res.render('personal/index', { title: '個人專區' ,user : req.user});
});

router.post('/editPicture' ,upload.single('picture') , function(req,res ,next){
  var cuted = req.file.path.split("/"),
      pathed = cuted[2] + "/" + cuted[3];
  var newPicture = new picture({
      number    : req.body.mainTitle,
      path      : pathed
  }).save(function(err,doc){
      if(err){ return next(err);}
      console.log(doc);
      res.redirect('back');
  });
})

module.exports = router;
