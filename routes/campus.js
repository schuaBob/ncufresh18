var express = require("express");
var router = express.Router();
var elebuilding = require("../models/campus/elebuilding");
var formidable = require("formidable");
var mongoose = require("mongoose");
var fs = require("fs");
var checkuser = require("./check-user");
/* 校園導覽首頁 */
router.get("/", function(req, res, next) {
  elebuilding
    .find(
      {},
      {
        _id: 1,
        Element_Name: 1,
        Type: 1,
        Buildpic: 1,
        X_position: 1,
        Y_position: 1,
        Size: 1,
        Multi: 1,
        Modalneed: 1,
        Showdefault: 1
      }
    )
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.render("campus/index", {
        title: "校園地圖 ｜ 新生知訊網",
        result: result,
        user: req.user
      });
    });
});
router.get("/editElement", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .find(
      {},
      {
        _id: 1,
        Element_Name: 1,
        Type: 1,
        Element_Intro: 1,
        X_position: 1,
        Y_position: 1,
        Size: 1
      }
    )
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.render("campus/editElement", {
        title: "編輯物件",
        result: result,
        user: req.user
      });
    });
});
router.post("/AddNew_element", checkuser.isAdmin, function(req, res, next) {
  if (req.body.elename && req.body.elecategory != 0) {
    console.log(req.user.id+" add "+req.body.elename);
    new elebuilding({
      Element_Name: req.body.elename,
      Type: req.body.elecategory,
      Element_Intro: req.body.eleintro,
      Buildpic: "",
      Intropic: [],
      X_position: 0,
      Y_position: 0,
      Size: 8,
      Showdefault: req.body.radios1,
      Multi: req.body.radios2,
      Modalneed: req.body.radios3
    }).save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/campus/editElement");
    });
  } else {
    res.redirect("/campus/editElement");
  }
});
router.post("/editElement/:id", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .findByIdAndUpdate(req.params.id, {
      Element_Name: req.body.elename,
      Type: req.body.elecategory,
      Element_Intro: req.body.eleintro,
      Showdefault: req.body.radios1,
      Multi: req.body.radios2,
      Modalneed: req.body.radios3
    })
    .exec(function(err) {
      if (err) {
        return next(err);
      }
      console.log(req.user.id+" edit "+req.body.elename);
      res.redirect("/campus/editElement");
    });
});
router.get("/delete/:id", checkuser.isAdmin, function(req, res, next) {
  elebuilding.findByIdAndRemove(req.params.id).exec(function(err, result) {
    if (err) {
      return next(err);
    }
    console.log(req.user.id+" delete "+req.params.id);
    res.redirect("/campus/editElement");
  });
});
router.post("/insert_img/:id", checkuser.isAdmin, function(req, res, next) {
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

          if (fields.imgtype === "0") {
            elebuilding
              .findByIdAndUpdate(req.params.id, {
                Buildpic: fileName
              })
              .exec(function(err, result) {
                if (err) {
                  return next(err);
                }
                res.redirect("/campus/editElement");
              });
          } else if (fields.imgtype === "1") {
            elebuilding
              .findByIdAndUpdate(req.params.id, {
                $push: { Intropic: fileName }
              })
              .exec(function(err, result) {
                if (err) {
                  return next(err);
                }
                res.redirect("/campus/editElement");
              });
          }

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
    } else {
      res.redirect("/campus/editElement");
    }
  });
});
router.get("/picposition", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .findById(req.query.id, {
      _id: 0,
      Buildpic: 1,
      X_position: 1,
      Y_position: 1,
      Size: 1
    })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
});

router.get("/getimg", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .findById(req.query.id, { _id: 0, Buildpic: 1, Intropic: 1 })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
});
router.post("/deleimg", checkuser.isAdmin, function(req, res, next) {
  if (req.body.val === "0") {
    elebuilding
      .findByIdAndUpdate(req.body.id, {
        Buildpic: ""
      })
      .exec(function(err) {
        if (err) {
          return next(err);
        }
        res.send(true);
        res.end();
      });
  } else if (req.body.val === "1") {
    elebuilding
      .findByIdAndUpdate(req.body.id, {
        $pull: { Intropic: req.body.ipid }
      })
      .exec(function(err) {
        if (err) {
          return next(err);
        }
        res.send(true);
        res.end();
      });
  }
});
router.post("/saveposition/:id", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .findByIdAndUpdate(req.params.id, {
      X_position: req.body.x_position,
      Y_position: req.body.y_position,
      Size: req.body.size
    })
    .exec(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/campus/editElement");
    });
});
router.get("/indexmodal", function(req, res, next) {
  elebuilding
    .findById(req.query.id, {
      _id: 0,
      Element_Name: 1,
      Element_Intro: 1,
      Intropic: 1
    })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
});
router.get("/edittext", checkuser.isAdmin, function(req, res, next) {
  elebuilding
    .findById(req.query.id, {
      _id: 1,
      Element_Name: 1,
      Type: 1,
      Element_Intro: 1,
      Modalneed: 1,
      Multi: 1,
      Showdefault: 1
    })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
});

module.exports = router;
