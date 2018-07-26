var express = require('express');
var request = require('request');
var life = require('../models/life/life');
var picture = require('../models/life/picture');
var description = require('../models/life/description');
var router = express.Router();
var formidable = require('formidable');
var multer = require('multer');
var checkuser = require('./check-user');
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

/*-------------------------中大生活首頁----------------------------*/
router.get('/', function(req, res, next){
  res.render('life/index', {title: '中大生活', user: req.user});
});
/* 天氣 */
/*
router.get('/index_com', function(req, res, next){
  let url = "https://works.ioa.tw/weather/api/weathers/81.json";
  request(url, function(err, response, body){
    if(err){
      res.render('life/index_com', { title: '中大生活', temperature: null, error: "Error, please try again later",
                                 desc: " ", humidity: " "});
    }else{
      let weather = JSON.parse(body),
          temp = weather.temperature,
          desc = weather.desc,
          humidity = weather.humidity;
      res.render('life/index_com', { title: '中大生活', temperature: temp, error: " ",
                                 desc: desc, humidity: humidity, user: req.user});
    }
  });
});
*/

router.get('/index_com', function(req, res, next){
  res.render('life/index_com', {title: '中大生活', user: req.user});
})

router.get('/index_phone', function(req, res, next){
  res.render('life/phone/index_phone', {title: '中大生活', user: req.user});
});

/*-------------------------網頁版分頁-------------------------*/
router.get('/food', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/sub', { title: '中大生活', life: data, page: type, num: match_num[type], user: req.user});
  });
});

router.get('/dorm', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
     res.render('life/sub', { title: '中大生活', life: data, page: type, num: match_num[type], user: req.user});
   });
});

router.get('/comm', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/sub', { title: '中大生活', life: data, page: type, num: match_num[type], user: req.user});
  });
});

router.get('/edu', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/sub', { title: '中大生活', life: data, page: type, num: match_num[type], user: req.user});
  });
});

router.get('/entertainment', function(req, res, next){
  var type = req.url;
  type = type.substr(1);
  life.find({}, function(err, data){
    res.render('life/sub', { title: '中大生活', life: data, page: type, num: match_num[type], user: req.user});
  });
});

/*-------------------------手機版分頁-------------------------*/
router.get('/food_phone', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/phone/sub_phone', { title: '中大生活', life: data, page: 'food', num: match_num['food'], user: req.user});
  });
})

router.get('/dorm_phone', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/phone/sub_phone', { title: '中大生活', life: data, page: 'dorm', num: match_num['dorm'], user: req.user});
  });
})

router.get('/comm_phone', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/phone/sub_phone', { title: '中大生活', life: data, page: 'comm', num: match_num['comm'], user: req.user});
  });
})

router.get('/edu_phone', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/phone/sub_phone', { title: '中大生活', life: data, page: 'edu', num: match_num['edu'], user: req.user});
  });
})

router.get('/entertainment_phone', function(req, res, next){
  life.find({}, function(err, data){
    res.render('life/phone/sub_phone', { title: '中大生活', life: data, page: 'entertainment', num: match_num['entertainment'], user: req.user});
  });
})

/*-------------------------後台-------------------------*/
router.post('/editPicture', checkuser.isAdmin,  upload.single('picture'), function(req, res, next){
  var cuted = req.file.path.split("/"),
      pathed = cuted[2] + "/" + cuted[3];
  var newPicture = new picture({
      mainTitle : req.body.mainTitle,
      subTitle  : req.body.subTitle,
      path      : pathed
  }).save(function(err,doc){
      if(err){ return next(err);}
      res.redirect('back');
  });
});

router.post('/editContent', checkuser.isAdmin, function(req, res, next){
  description.find({mainTitle: req.body.mainTitle, subTitle: req.body.subTitle}, function(err, result){
    if(err) next(err);
    if(result.length == 0){
      var newDesc = new description({
        mainTitle   :   req.body.mainTitle,
        subTitle    :   req.body.subTitle,
        content     :   req.body.description
      }).save();
    }
    else{
      description.update({mainTitle: req.body.mainTitle, subTitle: req.body.subTitle},
                         {content: req.body.description}, function(err, result){
          if(err) next(err);
      })
    }
  });
  res.redirect('back');
});

router.post('/editTitle', checkuser.isAdmin, function(req, res, next){
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

router.post('/changing', checkuser.isAdmin, function(req, res, next){
  var mainTitled = req.body.mainTitle;
  life.find({mainTitle: mainTitled}, function(err, result){
    if(err) return next(err);
    res.send(result[0].subTitle);
  });
});

router.post('/delete_pic', checkuser.isAdmin, function(req, res, next){
  picture.remove({path: req.body.path}, function(err, result){
    if(err) return next(err);
    res.send();
  })
});

/*-------------------------抓細項內容-------------------------*/
router.post('/showing', function(req, res, next){
  var mainTitled = req.body.mainTitle,
      subTitled = req.body.subTitle;
  picture.find({mainTitle: mainTitled, subTitle: subTitled}, function(err, result){
    if(err) return next(err);
    description.findOne({mainTitle: mainTitled, subTitle: subTitled}, function(err, result2){
      if(err) return next(err);
      let tobesend = Object();
      tobesend.res1 = result;
      tobesend.res2 = result2;
      res.send(tobesend);
    });
  });
});

module.exports = router;

