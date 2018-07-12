var express = require("express");
var router = express.Router();
var elebuilding = require("../models/campus/elebuilding");
var formidable = require("formidable");
var mongoose = require("mongoose");
var fs = require("fs");
/* 校園導覽首頁 */
router.get("/", function(req, res, next) {
  res.render("campus/index", { title: "校園導覽" });
});
router.get("/editElement", function(req, res, next) {
  elebuilding
    .find(
      {},
      {
        _id: 1,
        Element_Name: 1,
        Type: 1,
        Element_Intro: 1
      }
    )
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.render("campus/editElement", { title: "編輯物件", result: result });
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
            Buildpic: "",
            Intropic: []
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
router.post("/editElement/:id", function(req, res, next) {
  elebuilding
    .findByIdAndUpdate(req.params.id, {
      Element_Name: req.body.elename,
      Type: req.body.elecategory,
      Element_Intro: req.body.eleintro
    })
    .exec(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/campus/editElement");
    });
});
router.get("/delete/:id", function(req, res, next) {
  elebuilding.findByIdAndRemove(req.params.id).exec(function(err, result) {
    if (err) {
      return next(err);
    }
    res.redirect("/campus/editElement");
  });
});
router.post("/insert_img/:id", function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId(); //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {
      //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path; //現在檔案被暫存在哪
      fileName =
        tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf(".")); //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = "./public/campus/" + fileName; //我們希望檔案存在public下
      var readStream = fs.createReadStream(tmpPath);
      var writeStream = fs.createWriteStream(targetPath);
      readStream
        .on("end", err => {
          if (err) return next(err);
          elebuilding.findByIdAndUpdate(req.params.id, {
            Buildpic : fileName 
          }).exec(function(err,result) {
            if (err) {
              return next(err)
            }

          })
          fs.unlink(tmpPath, () => {
            //把暫存的檔案刪除
            console.log(
              "File Uploaded to " +
                targetPath +
                " - " +
                uploadedFile.size +
                " bytes"
            );
          });
        })
        .pipe(writeStream);
    }
    res.redirect("/campus/editElement");
  });
});
router.get("/getimg", function(req, res, next) {
  elebuilding
    .findById(req.query.id, { _id:0,Buildpic: 1, Intropic: 1 })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
 // res.redirect("/campus/editElement");
});


module.exports = router;
