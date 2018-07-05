var express = require('express');
var router = express.Router();
var video = require('../models/video/video');

/* 影音專區首頁 */
router.get('/', function(req, res, next) {
  video.find({}).exec(function(err, video) {
    var l1_img, l2_img, l3_img, l4_img, l5_img;
    var food_img, housing_img, transportation_img, education_img, entertainment_img, streetInterview_img;
    var D1_img, D2_img, D3_img, D4_img, D5_img, D6_img, D7_img, D8_img, D9_img, D10_img, D11_img, D12_img, D13_img, D14_img, D15_img, D16_img, D17_img, D18_img, D19_img, D20_img, D21_img, D22_img, D23_img, D24_img, D25_img;
    var food, housing, transportation, education, entertainment, streetInterview;
    var l1, l2, l3, l4, l5;
    var D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25;
    for(var i in video){
      if(video[i].type == 'l1'){
        l1 = video[i].insert;
        l1_img = video[i].introduce;
      }
      if(video[i].type == 'l2'){
        l2 = video[i].insert;
        l2_img = video[i].introduce;
      }
      if(video[i].type == 'l3'){
        l3 = video[i].insert;
        l3_img = video[i].introduce;
      }
      if(video[i].type == 'l4'){
        l4 = video[i].insert;
        l4_img = video[i].introduce;
      }
      if(video[i].type == 'l5'){
        l5 = video[i].insert;
        l5_img = video[i].introduce;
      }

      else if(video[i].type == 'food'){
        food = video[i].insert;
        food_img = video[i].introduce;
      }
      else if(video[i].type == 'housing'){
        housing = video[i].insert;
        housing_img = video[i].introduce;
      }
      else if(video[i].type == 'transportation'){
        transportation = video[i].insert;
        transportation_img = video[i].introduce;
      }
      else if(video[i].type == 'education'){
        education = video[i].insert;
        education_img = video[i].introduce;
      }
      else if(video[i].type == 'entertainment'){
        entertainment = video[i].insert;
        entertainment_img = video[i].introduce;
      }
      else if(video[i].type == 'streetInterview'){
        streetInterview = video[i].insert;
        streetInterview_img = video[i].introduce;
      }

      else if(video[i].type == 'D1'){
        D1 = video[i].insert;
        D1_img = video[i].introduce;
      }
      else if(video[i].type == 'D2'){
        D2 = video[i].insert;
        D2_img = video[i].introduce;
      }
      else if(video[i].type == 'D3'){
        D3 = video[i].insert;
        D3_img = video[i].introduce;
      }
      else if(video[i].type == 'D4'){
        D4 = video[i].insert;
        D4_img = video[i].introduce;
      }
      else if(video[i].type == 'D5'){
        D5 = video[i].insert;
        D5_img = video[i].introduce;
      }
      else if(video[i].type == 'D6'){
        D6 = video[i].insert;
        D6_img = video[i].introduce;
      }
      else if(video[i].type == 'D7'){
        D7 = video[i].insert;
        D7_img = video[i].introduce;
      }
      else if(video[i].type == 'D8'){
        D8 = video[i].insert;
        D8_img = video[i].introduce;
      }
      else if(video[i].type == 'D9'){
        D9 = video[i].insert;
        D9_img = video[i].introduce;
      }
      else if(video[i].type == 'D10'){
        D10 = video[i].insert;
        D10_img = video[i].introduce;
      }
      else if(video[i].type == 'D11'){
        D11 = video[i].insert;
        D11_img = video[i].introduce;
      }
      else if(video[i].type == 'D12'){
        D12 = video[i].insert;
        D12_img = video[i].introduce;
      }
      else if(video[i].type == 'D13'){
        D13 = video[i].insert;
        D13_img = video[i].introduce;
      }
      else if(video[i].type == 'D14'){
        D14 = video[i].insert;
        D14_img = video[i].introduce;
      }
      else if(video[i].type == 'D15'){
        D15 = video[i].insert;
        D15_img = video[i].introduce;
      }
      else if(video[i].type == 'D16'){
        D16 = video[i].insert;
        D16_img = video[i].introduce;
      }
      else if(video[i].type == 'D17'){
        D17 = video[i].insert;
        D17_img = video[i].introduce;
      }
      else if(video[i].type == 'D18'){
        D18 = video[i].insert;
        D18_img = video[i].introduce;
      }
      else if(video[i].type == 'D19'){
        D19 = video[i].insert;
        D19_img = video[i].introduce;
      }
      else if(video[i].type == 'D20'){
        D20 = video[i].insert;
        D20_img = video[i].introduce;
      }
      else if(video[i].type == 'D21'){
        D21 = video[i].insert;
        D21_img = video[i].introduce;
      }
      else if(video[i].type == 'D22'){
        D22 = video[i].insert;
        D22_img = video[i].introduce;
      }
      else if(video[i].type == 'D23'){
        D23 = video[i].insert;
        D23_img = video[i].introduce;
      }
      else if(video[i].type == 'D24'){
        D24 = video[i].insert;
        D24_img = video[i].introduce;
      }
      else if(video[i].type == 'D25'){
        D25 = video[i].insert;
        D25_img = video[i].introduce;
      }
    }
    res.render('video/index', { 
      title: '影音專區',
      l1: l1,
      l1_img: l1_img,
      l2: l2,
      l2_img: l2_img,
      l3: l3,
      l3_img: l3_img,
      l4: l4,
      l4_img: l4_img,
      l5: l5,
      l5_img: l5_img,

      food: food,
      food_img: food_img,
      housing: housing,
      housing_img: housing_img,
      transportation: transportation,
      transportation_img: transportation_img,
      education: education,
      education_img: education_img,
      entertainment: entertainment,
      entertainment_img: entertainment_img,
      streetInterview: streetInterview,
      streetInterview_img: streetInterview_img,

      D1: D1, D1_img: D1_img,
      D2: D2, D2_img: D2_img,
      D3: D3, D3_img: D3_img,
      D4: D4, D4_img: D4_img,
      D5: D5, D5_img: D5_img,
      D6: D6, D6_img: D6_img,
      D7: D7, D7_img: D7_img,
      D8: D8, D8_img: D8_img,
      D9: D9, D9_img: D9_img,
      D10: D10, D10_img: D10_img,
      D11: D11, D11_img: D11_img,
      D12: D12, D12_img: D12_img,
      D13: D13, D13_img: D13_img,
      D14: D14, D14_img: D14_img,
      D15: D15, D15_img: D15_img,
      D16: D16, D16_img: D16_img,
      D17: D17, D17_img: D17_img,
      D18: D18, D18_img: D18_img,
      D19: D19, D19_img: D19_img,
      D20: D20, D20_img: D20_img,
      D21: D21, D21_img: D21_img,
      D22: D22, D22_img: D22_img,
      D23: D23, D23_img: D23_img,
      D24: D24, D24_img: D24_img,
      D25: D25, D25_img: D25_img

    });
  });
});




router.post('/add', function(req, res, next){
  video.find({ type: req.body.type }, function(e, data) {
    var insert, introduce;
    if (data.length != 0) {
      /*video.update({ type: req.body.type }, {
        type: req.body.type,
        insert: req.body.insert,
        introduce: req.body.introduce
      }, function(e) {
        if (e) console.log(e);
      });*/
      insert = req.body.insert;
      introduce = req.body.introduce;
      if(insert != null && introduce == null){
        video.update({ type: req.body.type }, {
          type: req.body.type,
          insert: req.body.insert,
        }, function(e) {
          if (e) console.log(e);
        });
      }
      else if(insert == null && introduce != null){
        video.update({ type: req.body.type }, {
          type: req.body.type,
          introduce: req.body.introduce
        }, function(e) {
          if (e) console.log(e);
        });
      }
      else{
        video.update({ type: req.body.type }, {
          type: req.body.type,
          insert: req.body.insert,
          introduce: req.body.introduce
        }, function(e) {
          if (e) console.log(e);
        });
      }
      
    }else {
      new video({
        type: req.body.type,
        insert: req.body.insert,
        introduce: req.body.introduce
      }).save();
    }
  });
  /*var form =  new formidable.IncomingForm();
  var file_path;*/

  res.redirect('/video');
})


/*
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}*/

module.exports = router;
