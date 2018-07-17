var express = require('express');
var mongoose=require('mongoose');
require('../models/qna/qna');
var Question=mongoose.model('Question');
var router = express.Router();


/* Q&A首頁 */
router.get('/', function(req, res, next) {
  res.locals.username = req.session.account ;
  res.locals.authenticated = req.session.logined;
  Question.find().sort({CreateDate:'desc'}).exec(function(err, question){
    if(err){return next(err)};
    //轉換時間欄位
    var Time = function(date) {
      var year =date.getYear();
      var monthIndex = date.getMonth();
      var day = date.getDate();
      var time = (year+1900) + '/' + (++monthIndex) + '/' + day;
      return time;
    }
    res.render('qna/index',{
      title:'新生Ｑ＆Ａ ｜ 新生知訊網',
      question:question,
      Time:Time
    });
  }); 
});
//照時間排序
router.get('/#time', function(req, res, next) {
  Question.find().sort({CreateDate:'desc'}).exec(function(err, question){
    if(err){return next(err)};
    console.log("測試用");
    //轉換時間欄位
    var Time = function(date) {
      var year =date.getYear();
      var monthIndex = date.getMonth();
      var day = date.getDate();
      var time = (year+1900) + '/' + (++monthIndex) + '/' + day;
      return time;
    }
    res.render('qna/index',{
      title:'新生Ｑ＆Ａ ｜ 新生知訊網',
      question:question,
      Time:Time
    });
  });
});
//照人氣排序
router.get('/#hot', function(req, res, next) {
  Question.find().sort({Click:'desc'}).exec(function(err, question){
    if(err){return next(err)};
    console.log("測試用");
    //轉換時間欄位
    var Time = function(date) {
      var year =date.getYear();
      var monthIndex = date.getMonth();
      var day = date.getDate();
      var time = (year+1900) + '/' + (++monthIndex) + '/' + day;
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
/*搜尋功能*/
router.get('/search',function(req,res,next){
  //console.log(req.query);
  if(req.query.keyword){
    console.log(req.query.keyword);
    //模糊查詢參數
    var query={};
    query['Title']=new RegExp(req.query.keyword);
    Question.find(query ,function(err,question){
      if(err){return next(err)};
      //轉換時間欄位
      var Time = function(date) {
        var monthIndex = date.getMonth();
        var day = date.getDate();
        var time = (++monthIndex) + '/' + day;
        return time;
      }
      res.render('qna/index', { 
        title: '新生Ｑ＆Ａ ｜ 新生知訊網',
        question:question,
        Time:Time
      });
    });
  }
});
/*紀錄點擊次數*/
router.get('/:id', function(req, res, next) {
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
      Question.findById(req.params.id,function(err,question){
          if(err){return next(err)};
          //找不到的話
          if(question===null){
            return next();
          }
          //增加瀏覽次數
          question.Click++;
          //儲存瀏覽次數
          question.save(function(err) {
            if (err){return next(err);}
            // 回傳 title, content, answer
            res.json({
              click:question.Click
            });
          });
      })
  }
  else{
    next();
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
                      res.json({ id: result._id });
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
module.exports = router;
