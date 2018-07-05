var express = require("express");
var router = express.Router();
var elebuilding = require("../models/campus/elebuilding");

/* 校園導覽首頁 */
router.get("/", function(req, res, next) {
  res.render("campus/index", { title: "校園導覽" });
});
router.get("/editElement", function(req, res, next) {
  elebuilding.find({}).exec(function(err, result) {
    if (err) {
      return next(err);
    }
    if (Object.keys(result).lenght === 0) {
      res.render("campus/editElement", {
        title: "編輯物件",
        rew: req,
        result: Object()
      });
    } else {
      let count = 0;
      for (let i in result) {
        elebuilding
          .findOne({
            Element_Name: result[i].Element_Name
          })
          .exec(function(err, result_elebuilding) {
            if (err) {
              next(err);
            }
            result[i].Element_Name = result_elebuilding.Element_Name;
            count = count + 1;
            if (count === Object.keys(result).length) {
              res.render("campus/editElement", {
                title: "編輯物件",
                req: req,
                result: result
              });
            }
          });
      }
    }
  });
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
            LastUpDate: Date.now()
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

module.exports = router;
