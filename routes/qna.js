var express = require('express');
var router = express.Router();

/* Q&A首頁 */
router.get('/', function(req, res, next) {
  Question.find(function(err, question, count){
    if(err){return next(err)};
        res.render('qna/index', {
            title:'新生Q&A',
            question:question
        });
  });
});
/*新增問題*/
router.post('/addq',function(req,res,next){
  /*有標題或分類才能送出問題*/
  if((req.body.Title)&&(req.body.Type)){
      var temp = new Question({
        Title:req.body.Title,
        Type:req.body.Type,
        Content: req.body.Content,
        CreateDate: Date.now()
      }).save(function(err){
        if(err){
            return next(err);
        }
        res.redirect('qna/index');
      });

  }
});
module.exports = router;
