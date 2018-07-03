var express = require('express');
var router = express.Router();

/* 校園導覽首頁 */
router.get('/', function(req, res, next) {
  res.render('campus/index', { title: '校園導覽' });
});
router.get('/editElement', function(req, res, next) {
  res.render('campus/editElement', { title: '編輯物件' });
});
router.post('/AddNew_element', function(req, res, next) {
  if((req.body.elename)&&(req.body.elecategory!=0)&&(req.body.eleintro)) {
    elements_building.findOne({Element_Name:req.body.elename}).exec(function(err,result) {
      if (result === null) {
        var temp = new Element_Name({
          Element_Name : req.body.elename,
          Type : req.body.elecategory,
          Element_Intro : req.body.eleintro,
          AED : (req.body.AED === "AED_yes"),
          Emercall : (req.body.SOS === "SOS_yes"),
          LastUpDate : Date.now() 
        }).save(function(err) {
          if(err) {
            return next(err)
          }
        })
      }
    })
  }
})

module.exports = router;
