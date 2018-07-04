var express = require('express');
var mongoose=require('mongoose');
require('../models/qna/qna');
var Question=mongoose.model('Question');
var router = express.Router();


/* Q&A首頁 */
router.get('/', function(req, res, next) {
  res.locals.username = req.session.account ;
  res.locals.authenticated = req.session.logined;
  Question.find(function(err, question,count){
    if(err){return next(err)};
    res.render('qna/index',{title:'新生Q&A',question:question});
  }); 
});
/*新增問題*/
router.post('/addq',function(req,res,next){
  /*有標題或分類才能送出問題*/
  if((req.body.Title)&&(req.body.Type)){
      var temp = new Question({
        Username:req.session.account,
        Title:req.body.Title,
        Type:req.body.Type,
        Content: req.body.Content,
        Answer: "",
        CreateDate: Date.now(),
        Click:0
      }).save(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/qna');
      });

  }
});
/*新增答案*/
router.post('/adda',function(req,res,next){
  /*有內容才能送出解答*/
  if(req.body.Answer){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
      console.log('Fail to update article.');
        Question.findById(req.params.id).exec(function(err,result){
            if(err){return next(err)};
            //if(result.Username===res.locals.username||req.session.type==="admin"){
            Question.update({_id:req.params.id}, {Answer:req.body.Answer},function(err){
              if(err)
                console.log('Fail to update article.');
              else
                console.log('Done');
            });
            //}
        })   
        res.redirect('/qna');
    }
    else{
      res.redirect('/qna');
    }
  }

});
/*刪除問題*/
/*搜尋功能*/
module.exports = router;
