var express = require("express");
var router = express.Router();
var elebuilding = require("../models/campus/elebuilding");

/* 校園導覽首頁 */
router.get("/", function(req, res, next) {
  res.render("campus/index", { title: "校園導覽" });
});
router.get("/editElement", function(req, res, next) {
  elebuilding.find({},{_id:1,Element_Name:1,Type : 1,
    Element_Intro : 1}).exec(function(err,result){
    if(err) {
      return next(err);
    }
    res.render("campus/editElement",{title:"編輯物件",result:result})
    
    
  })
    
});
router.post("/AddNew_element", function(req, res, next) {
  if (req.body.elename && req.body.elecategory != 0) {
    elebuilding
      .findOne({ Element_Name: req.body.elename })
      .exec(function(err, result) {
        if (result === null) {
          var temp = new elebuilding({
            Element_Name: req.body.elename,
            Type: req.body.elecategory,
            Element_Intro: req.body.eleintro,
            
          }).save(function(err) {
            if (err) {
              return next(err);
            }
            res.redirect("/campus/");
          });
        } else {
          res.redirect("/campus/");
        }
      });
  } else {
    res.redirect("/campus/");
  }
});
router.post("/editElement/:id",function(req,res,next) {
  elebuilding.findByIdAndUpdate(req.params.id,{
    Element_Name : req.body.elename,
    Type : req.body.elecategory,
    Element_Intro : req.body.eleintro
  }).exec(function(err) {
    if(err) {
      return next(err);
    }
    res.redirect("/campus/editElement");
  })
})

module.exports = router;
