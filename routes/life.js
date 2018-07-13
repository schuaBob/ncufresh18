var express = require('express');
var request = require('request');
var life = require('../models/life/life');
var router = express.Router();
var formidable = require('formidable');
// var apiKey = 'c7282145be089c1ab3c03aa2e2f7c5dd';

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
  life.find({}, function(err, data){
    res.render('life/food', { title: '食', life: data});
  });
});

router.get('/dorm', function(req, res, next){
  life.find({}, function(err, data){
     res.render('life/dorm', { title: '住', life: data});
   });
});

router.get('/comm', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/comm', { title: '行', life: data});
  });
});

router.get('/edu', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/edu', { title: '育', life: data});
  });
});

router.get('/entertainment', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/entertainment', { title: '樂', life: data});
  });
});

router.post('/edit', function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err) return next(err);
    res.redirect('back');
  });
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

