var express = require('express');
var request = require('request');
var life = require('../models/life/life');
var picture = require('../models/life/picture');
var router = express.Router();
var formidable = require('formidable');
var multer = require('multer');
fs = require('fs');
// var apiKey = 'c7282145be089c1ab3c03aa2e2f7c5dd';

var storage = multer.diskStorage({
  destination: "public/life/subPicture/",
  filename   : function(req, file, cb){
    var rdm = '';
    for(var i=0 ; i<10 ; i++) rdm += Math.floor((Math.random() * 10));
    var fileName = req.body.mainTitle + "_" + req.body.subTitle + "_" + rdm + ".jpg";
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage });

var match_num = {
  'food'          : 1,
  'dorm'          : 2,
  'comm'          : 3,
  'edu'           : 4,
  'entertainment' : 5 
}

/* 中大生活首頁 */
router.get('/', function(req, res, next){
  let url = "https://works.ioa.tw/weather/api/weathers/81.json";
  request(url, function(err, response, body){
    if(err){
      res.render('life/index', { title: '中大生活', temperature: null, error: "Error, please try again later",
                                 desc: " ", humidity: " "});
    }else{
      let weather = JSON.parse(body),
          temp = weather.temperature,
          desc = weather.desc,
          humidity = weather.humidity;
      res.render('life/index', { title: '中大生活', temperature: temp, error: " ",
                                 desc: desc, humidity: humidity});
    }
  });
});

router.get('/food', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/food', { title: '食', life: data, page: type, num: match_num[type]});
  });
});

router.get('/dorm', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
     res.render('life/dorm', { title: '住', life: data, page: type, num: match_num[type]});
   });
});

router.get('/comm', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/comm', { title: '行', life: data, page: type, num: match_num[type]});
  });
});

router.get('/edu', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/edu', { title: '育', life: data, page: type, num: match_num[type]});
  });
});

router.get('/entertainment', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/entertainment', { title: '樂', life: data, page: type, num: match_num[type]});
  });
});

router.post('/editPicture', upload.single('picture'), function(req, res, next){
  var cuted = req.file.path.split("/"),
      pathed = cuted[2] + "/" + cuted[3];
  var newPicture = new picture({
      mainTitle : req.body.mainTitle,
      subTitle  : req.body.subTitle,
      path      : pathed
  }).save(function(err,doc){
      if(err){ return next(err);}
      console.log(doc);
      res.redirect('back');
  });
});

router.post('/editContent', function(req, res, next){

});

router.post('/editTitle', function(req, res, next){
  var subTitled = req.body.subTitle.split(";");
  subTitled.pop();
  var typed = req.get('referer').split("/");
  
  life.find({mainTitle: req.body.mainTitle}, function(err, result){
    if(err) return next(err);
    if(result.length == 0){
      var newLife = new life({
        mainTitle : req.body.mainTitle,
        subTitle  : subTitled,
        type      : typed[typed.length-1]
      }).save();
    }
    else{
      life.update({mainTitle: req.body.mainTitle}, {subTitle: subTitled}, function(err, result){
        if(err) return next(err);
      })
    }
  });
  res.redirect('back');
});

router.post('/changing', function(req, res, next){
  var mainTitled = req.body.mainTitle;
  life.find({mainTitle: mainTitled}, function(err, result){
    if(err) return next(err);
    res.send(result[0].subTitle);
  });
});

router.post('/showing', function(req, res, next){
  var mainTitled = req.body.mainTitle,
      subTitled = req.body.subTitle;
  picture.find({mainTitle: mainTitled, subTitle: subTitled}, function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});
// router.post('/', function(req, res, next){
//   let city = req.body.city;
//   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
//   request(url, function(err, response, body){
//     if(err){
//       res.render('life/index', { title: '中大生活', weather: null, error: "Error, please try again"});
//     }
//     else{
//       let weather = JSON.parse(body);
//       if(weather.main == undefined){
//         res.render('life/index', { title: '中大生活', weather: null, error: "Error, please try again"});
//       }else{
//         let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//         res.render('life/index', { title: '中大生活', weather: weatherText, error: null});
//       }
//     }
//   });
// });

module.exports = router;

