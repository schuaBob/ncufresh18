var express = require('express');
var mongoose=require('mongoose');
require('../models/qna/qna');
var Question=mongoose.model('Question');
var router = express.Router();


/* Q&A首頁 */
router.get('/', function(req, res, next) {
  res.locals.username = req.session.account ;
  res.locals.authenticated = req.session.logined;
  Question.find().sort({Click:'desc'}).exec(function(err, question,count){
    if(err){return next(err)};
    //轉換時間欄位
      var Time = function(date) {
      var monthIndex = date.getMonth();
      var day = date.getDate();
      var time = (++monthIndex) + '/' + day;
      return time;
    }
    res.render('qna/index',{
      title:'新生Ｑ＆Ａ ｜ 新生知訊網',
      question:question,
      Time:Time
    });
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
router.post('/adda/:id',function(req,res,next){
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
/*紀錄點擊次數*/
router.get('/:id', function(req, res, next) {
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
      Question.findById(req.params.id,function(err,question){
          if(err){return next(err)};
          //增加瀏覽次數
          question.Click++;
          //儲存瀏覽次數
          question.save(function(err) {
            if (err){return next(err);}
            // 回傳 title, content, answer
            res.json({
              click:question.click
            });
          });
      })
  }
});
/*編輯答案*/
router.post('/update/:id',function(req,res,next){
  if(req.body.Answer){
      if(mongoose.Types.ObjectId.isValid(req.params.id)){
          Question.findById(req.params.id).exec(function(err,result){
              if(err){return next(err)};
              //if(result.Username===res.locals.username||req.session.type==="admin"){
              Question.update({_id:req.params.id}, {Answer:req.body.Answer},function(err){
                if(err)
                    console.log('Fail to update answer.');
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
router.get('/delete/:id',function(req,res,next){
  /*沒登入導向到登入頁面*/
  /*if(!req.session.logined){
      res.redirect('/signin');
  }*/
  //else{
      /*確定傳進來的是不是有效ID*/
      if(mongoose.Types.ObjectId.isValid(req.params.id)){
          /*確定這篇文章是他發的或他是管理員*/
          Question.findById(req.params.id).exec(function(err,result){
              if(err){return next(err)};
              /*真的有這篇文章*/
              if(result!==null){
                      /*刪除*/
                      result.remove();
                      res.redirect('/qna');
                  
              }
              else{
                  res.redirect('/qna');
              }
          })
      }
      else{
        return next(err);
      }
  //}
});
/*搜尋功能*/
router.get('/search',function(req,res,next){
  if(req.query.keyword){
    console.log(req.query.keyword);
    Question.find({Title: req.query.keyword},function(err,result,count){
      if(err){return next(err)};
      console.log("測試用");
      res.render('qna/search', { 
        title: '新生Ｑ＆Ａ ｜ 新生知訊網',
        result:result
      });
      /*res.json({
        result:result
      });*/
    });
  }
});
module.exports = router;
