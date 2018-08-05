var express = require('express');
var mongoose=require('mongoose');
require('../models/qna/qna');
var Question=mongoose.model('Question');
var Rule =mongoose.model('Rule');
//var deleteReason =mongoose.model('deleteReason');
var router = express.Router();
var checkUser = require('./check-user');


/* Q&A首頁 */
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user ;
  res.locals.role = req.session.role;
  //deleteReason.find().exec(function(err, deleteReason){
    Rule.find().sort({CreateDate:'desc'}).exec(function(err, rule){
    //管理員的話才顯示未回答的問題
    if(req.user && req.user.role==="admin"){
      Question.find({DeleteDate: {$exists: false}}).sort({CreateDate:'desc'}).exec(function(err, question){
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
          //deleteReason:deleteReason,
          rule:rule,
          question:question,
          Time:Time,
          user:req.user
        });
      }); 
 
    }
    else{
      /**
       * Answer不空白 =>審核通過
       * Reason空白 =>沒被管理員刪除
       * DeleteDate不存在 =>文章沒被使用者刪除
       */
      Question.find({Answer:{$nin:[""]},Reason:{$in:[""]},DeleteDate: {$exists: false}}).sort({CreateDate:'desc'}).exec(function(err, question){
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
          rule:rule,
          question:question,
          Time:Time,
          user:req.user
        });
      });
    }
  });
  //});
});
//新增板規
router.post('/addR',checkUser.isAdmin,function(req,res,next){
  if((req.body.Title)&&(req.body.Type)&&(req.body.Content)){
    var temp = new Rule({
      Title:req.body.Title,
      Type:req.body.Type,
      Content: req.body.Content,
      CreateDate: Date.now(),
      Click:0,
    }).save(function(err){
      if(err){
        return next(err);
      }
      else{
        //sendSuccess();
      }
      res.redirect('/qna');
    });
    
  }
});
//編輯板規
router.post('/updateR/:id',checkUser.isAdmin,function(req,res,next){
  //if(result.Username===res.locals.username||req.session.type==="admin"){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
      Rule.findById(req.params.id).exec(function(err,result){
        if(err){return next(err)};
        Rule.update({_id:req.params.id}, {Content:req.body.Content},function(err){
          if(err)
              console.log('Fail to update answer.');
          else
              //sendSuccess();
              console.log('Done');
        });
    })   
  //}
    res.redirect('/qna');
  }
});
/*新增問題*/
router.post('/addq',checkUser.isLoggedIn,function(req,res,next){
  /*有標題或分類才能送出問題*/
  if((req.body.Title)&&(req.body.Type)){
      var temp = new Question({
        Username:req.user.id,
        Title:req.body.Title,
        Type:req.body.Type,
        Content: req.body.Content,
        Answer: "",
        CreateDate:Date.now(),
        Reason: "",
        Click:0
      }).save(function(err){
        if(err){
          return next(err);
        }
        else{
          //sendSuccess();
        }
        // alert("發送問題成功！");
        res.redirect('/qna');
      });
      
    }
  });
  /*新增答案*/
  router.post('/adda/:id',checkUser.isAdmin,function(req,res,next){
    /*有內容才能送出解答*/
    if(req.body.Answer){
      if(mongoose.Types.ObjectId.isValid(req.params.id)){
        console.log('Fail to update article.');
        Question.findById(req.params.id).exec(function(err,result){
          if(err){return next(err)};
          if(result!==null){
            Question.update({_id:req.params.id},{Type:req.body.Type,Answer:req.body.Answer,CreateDate:Date.now()},function(err){
              if(err)
              console.log('Fail to update article.');
              else
              console.log('Done');
            });
            }
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
    //模糊查詢參數，標題跟答案都要找
    if(req.user && req.user.role==="admin"){
      Question.find({DeleteDate: {$exists: false},$or : [ {Title : {$regex : req.query.keyword}},{Answer : {$regex :req.query.keyword}},{Content : {$regex :req.query.keyword}}]}).exec(function(err,question,rule){
        if(err){return next(err)};
        //轉換時間欄位
        var Time = function(date) {
          var year=date.getYear();
          var monthIndex = date.getMonth();
          var day = date.getDate();
          var time = (year+1900) + '/' + (++monthIndex) + '/' + day;
          return time;
        }
        var rule=0;
        res.render('qna/index', { 
          title: '新生Ｑ＆Ａ ｜ 新生知訊網',
          question:question,
          rule:rule,
          Time:Time,
          user:req.user
        });
      });
    }
    else{
          Question.find({Answer:{$nin:[""]},Reason:{$in:[""]},DeleteDate: {$exists: false},$or : [ {Title : {$regex : req.query.keyword}},{Answer : {$regex :req.query.keyword}},{Content : {$regex :req.query.keyword}}]}).exec(function(err,question,rule){
            if(err){return next(err)};
            //轉換時間欄位
            var Time = function(date) {
              var year=date.getYear();
              var monthIndex = date.getMonth();
              var day = date.getDate();
              var time = (year+1900) + '/' + (++monthIndex) + '/' + day;
              return time;
            }
            var rule=0;
            res.render('qna/index', { 
              title: '新生Ｑ＆Ａ ｜ 新生知訊網',
              question:question,
              rule:rule,
              Time:Time,
              user:req.user
            });
          });

    }
  }
});

/*紀錄問題點擊次數*/
router.get('/clickQ/:id', function(req, res, next) {
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    Question.findById(req.params.id,function(err,question){
      if(err){return next(err)};
      
   
        //增加瀏覽次數
        question.Click++;
        //儲存瀏覽次數
       question.save(function(err) {
          if (err){return next(err);}
          res.json({
            title:question.Title,
            content:question.Content,
            answer:question.Answer,
            click:question.Click
          });
       });

      
    });
  }
  else{
    next();
  }
});
/*紀錄板規點擊次數*/
router.get('/clickR/:id', function(req, res, next) {
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    Rule.findById(req.params.id,function(err,rule){
      if(err){return next(err)};
      

        //增加瀏覽次數
        rule.Click++;
        //儲存瀏覽次數
       rule.save(function(err) {
          if (err){return next(err);}
          res.json({
            title:rule.Title,
            content:rule.Content,
            click:rule.Click
          });
       });
      
    });
  }
  else{
    next();
  }
});
/*編輯答案*/
router.post('/updateA/:id',checkUser.isAdmin,function(req,res,next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
          Question.findById(req.params.id).exec(function(err,result){
            if(err){return next(err)};
            //if(result.Username===res.locals.username||req.session.type==="admin"){
            if(req.body.Answer){
              Question.update({_id:req.params.id}, {Type:req.body.Type},{Answer:req.body.Answer},function(err){
                if(err)
                    console.log('Fail to update answer.');
                else
                    console.log('Done');
              });
            }    
            //}
          })   
          res.redirect('/qna');
  }
});
/*編輯板規*/
router.post('/updateR/:id',checkUser.isAdmin,function(req,res,next){
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Rule.findById(req.params.id).exec(function(err,result){
          if(err){return next(err)};
          //if(result.Username===res.locals.username||req.session.type==="admin"){
          if(req.body.Content){
            Rule.update({_id:req.params.id}, {Content:req.body.Content},function(err){
              if(err)
                  console.log('Fail to update answer.');
              else
                  console.log('Done');
            });
          }    
          //}
        })   
        res.redirect('/qna');
}
});
/*管理員給刪除理由*/
router.post('/deleteReason/:id',checkUser.isAdmin,function(req,res,next){
    /*確定傳進來的是不是有效ID*/
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
      /*找是哪篇文章*/
        Question.findById(req.params.id).exec(function(err,result){
          if(err){return next(err)};
              /*真的有這篇文章*/
              if(result!==null){
                //有刪除理由才能送出
                if(req.body.Reason){
                  Question.update({_id:req.params.id}, {Reason:req.body.Reason},function(err){
                    if(err){
                      console.log('Fail to update reason.');
                    }
                    else{
                      console.log('Done');
                    }
                    res.redirect('/qna');
                  });
                }    
              }
              else{
                res.redirect('/qna');
              }
          });
    }
    else{
      return next(err);
    }
});
/*管理員刪除問題*/
router.get('/deleteQ/:id',checkUser.isAdmin,function(req,res,next){
  /*確定傳進來的是不是有效ID*/
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    /*找是哪篇文章*/
      Question.findById(req.params.id).exec(function(err,result){
        if(err){return next(err)};
            /*真的有這篇文章*/
            if(result!==null){
              //有刪除理由才能送出
              if(result.Reason!==""){
                Question.update({_id:req.params.id}, {DeleteDate:Date.now()},function(err){
                  if(err){
                    console.log('Fail to update reason.');
                  }
                  else{
                    console.log('Done');
                  }
                  res.redirect('/qna');
                });
              }    
            }
            else{
              res.redirect('/qna');
            }
        });
  }
  else{
    return next(err);
  }
});
/*刪除板規*/
router.get('/deleteR/:id',checkUser.isAdmin,function(req,res,next){
      /*確定傳進來的是不是有效ID*/
      if(mongoose.Types.ObjectId.isValid(req.params.id)){
        /*確定這篇文章是他發的或他是管理員*/
        Rule.findById(req.params.id).exec(function(err,result){
          if(err){return next(err)};
          /*真的有這篇文章*/
          if(result!==null){
            if(err){return next(err)};
              /*刪除*/
              result.remove();
              // res.json({ id: result._id });
              res.redirect('/qna');
            }
          else{
            return next(err);
          }
        });
      }
      else{
        return next(err);
      }
});
// 使用者刪除問題 
router.post('/deleteByUser/:id', checkUser.isLoggedIn, function(req, res, next) {
  Question.findById(req.params.id, function(err,result) {
    if (err){return next(err);}
    //發問者本人且問題還沒被管理員審核才能刪除問題
    if ((req.user.id === result.Username)&&(result.Answer==="")) {
      if(result!==null){
        /*刪除*/
        result.remove();
      }
      else{
        return next(err);
      }
    } 
    else {
      return next(err);
    }
  });
});
// 使用者編輯問題 
router.post('/editByUser/:id', checkUser.isLoggedIn, function(req, res, next) {
  Question.findById(req.params.id, function(err,result) {
    if (err){return next(err);}
    //發問者本人且問題還沒被管理員審核才能刪除問題
    if ((req.user.id === result.Username)&&(result.Answer==="")) {
      if(result!==null){
        /*編輯*/
        Question.update({_id:req.params.id}, {Content:req.body.Content},function(err){
          if(err)
              console.log('Fail to update question.');
          else
              console.log('Done');
        });
      }
      else{
        return next(err);
      }
    } 
    else {
      return next(err);
    }
  });
});
// 使用者刪除問題 
router.post('/deleteByUser/:id', checkUser.isLoggedIn, function(req, res, next) {
  Question.findById(req.params.id, function(err,result) {
    if (err){return next(err);}
    //發問者本人且問題還沒被管理員審核才能刪除問題
    if ((req.user.id === result.Username)&&(result.Answer==="")) {
      if(result!==null){
        /*刪除*/
        result.remove();
      }
      else{
        return next(err);
      }
    } 
    else {
      return next(err);
    }
  });
});
// 使用者編輯問題 
router.post('/editByUser/:id', checkUser.isLoggedIn, function(req, res, next) {
  Question.findById(req.params.id, function(err,result) {
    if (err){return next(err);}
    //發問者本人且問題還沒被管理員審核才能刪除問題
    if ((req.user.id === result.Username)&&(result.Answer==="")) {
      if(result!==null){
        /*編輯*/
        Question.update({_id:req.params.id}, {Content:req.body.Content},function(err){
          if(err)
              console.log('Fail to update question.');
          else
              console.log('Done');
        });
      }
      else{
        return next(err);
      }
    } 
    else {
      return next(err);
    }
  });
});
//判斷是否登入
function isLoggedIn(req, res, next) {
  if (req.user)
    return next();
  res.redirect('/login');
}
//判斷是否管理員
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin')
    return next();
  res.redirect('/qna');
}
//發送成功提示
// function sendSuccess(){
//   alert("發送成功");
// }
module.exports = router;
