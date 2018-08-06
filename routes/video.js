var express = require('express');
var router = express.Router();
var video = require('../models/video/video');
var checkuser = require('./check-user');

/* 影音專區首頁 */
router.get('/', function(req, res, next) {
  /*video.find({type:"長劇"}).sort({id:1}).exec(function(err, video) {
    res.render('',{longvideo:video});
  })

  <% for(let i = 0;i<longvideo;i++){ %>
    <tr><%= longvideo[i].title %></tr>
  <% } %>
  let jjj = ["is","fdsaf","fdsaf"]
  let ppp = JSON.stringify(jjj)*/


  // let job = [];
  // job.push(video.find({type:"1"}).sort({id:-1}));
  // job.push(video.find({type:"2"}).sort({id:-1}));
  // job.push(video.find({type:"3"}).sort({id:-1}));
  // Promise.all(job).then(function(video){
  //   res.render('video/index', { 
  //     title: '影音專區 ｜ 新生知訊網',
  //     longvideo: video
  //     video[0]
  //     video[1]
  //     video[3]
  //   });
  // }).catch(function(err){
  //   if(err){
  //     return next(err);
  //   }
  // })


  video.find({type:"1"}).sort({id:-1}).exec(function(err, video1) {
    video.find({type:"2"}).sort({id:-1}).exec(function(err, video2) {
      video.find({type:"3"}).sort({id:-1}).exec(function(err, video3) { 
        let video = video1.concat(video2).concat(video3);
        res.render('video/index', { 
          title: '影音專區 ｜ 新生知訊網',
          user: req.user,
          longvideo: video1,
          QAvideo: video2,
          lifevideo: video3,
          video: video
        });
      });
    });
  });
});



router.post('/add', checkuser.isAdmin, function(req, res, next){
  let college, type, title;
  type = req.body.title[0];
  if(type === '1' || type === '3'){//中大長劇or悠遊中大
      title = req.body.title.slice(1);
  }
  else if(type === '2'){//快問快答
    college = 'c' + req.body.title[1];
    title = req.body.title.slice(2);
  }
  
  video.find({ title: title }, function(e, data) {
    if (data.length != 0) {
      if(req.body.insert != ""){
        video.update({title: title},{
          title: title,
          type: type,//中大長劇or悠遊中大or快問快答
          college: college,//學院
          insert: req.body.insert, //youtubeID
        },function(e){
          if(e) console.log(e);
        })
      }
      // if(req.body.introduce != ""){
      //   video.update({title: title},{
      //     title: title,//中大長劇or悠遊中大or快問快答
      //     introduce: req.body.introduce
      //   },function(err){
      //     if(e) console.log(e);
      //   })
      // }
      
    }else {
      new video({
        title: title,
        type: type,//中大長劇or悠遊中大 or快問快答
        college: college,//學院
        insert: req.body.insert, //youtubeID
        //introduce: req.body.introduce //影片介紹圖片
      }).save();
    }
  });

  res.redirect('/video');
})




module.exports = router;
