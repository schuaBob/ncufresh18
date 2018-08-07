var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var department = require('../models/groups/department');
var club = require('../models/groups/club');
var community = require('../models/groups/community');
var student = require('../models/groups/student');
var mongoose = require('mongoose');
var fs = require('fs');
var video = require('../models/video/video');
var checkuser = require('./check-user');

/* 系所社團首頁 */
router.get('/', function(req, res, next) {
  res.render('groups/index', { title: '系所社團 ｜ 新生知訊網', user: req.user });
});

router.get('/department', function(req, res, next) {
  department.find({}).exec(function(err, department) {
    video.find({type:"2"}).sort({id:-1}).exec(function(err, video2) {
      res.render('groups/department', {
        title: '系所 ｜ 新生知訊網',
        department: department,
        QAvideo: video2,       
        user: req.user,

      });
    });
  });
});

router.get('/community', function(req, res, next) { 
  community.find({}).exec(function(err, community) {
    res.render('groups/community', {
      title: '其他學生組織 ｜ 新生知訊網',
      community: community,
      user: req.user,    
    });
  });
});

router.get('/student', function(req, res, next) {
  student.find({}).exec(function(err, student) { 
    res.render('groups/student', {
      title: '學生會 ｜ 新生知訊網',
      student: student,
      user: req.user,
    });
  });
});


/* 原本想用typelearn.play.date.service分類，後來不用那麼麻煩 */
router.get('/club', function(req, res, next) {
  club.find({type:"1"}).exec(function(err, club1) {
    club.find({type:"2"}).exec(function(err, club2) {
      club.find({type:"3"}).exec(function(err, club3) { 
        club.find({type:"4"}).exec(function(err, club4) {
          let club = club1.concat(club2).concat(club3).concat(club4);
          res.render('groups/club', {
            title: '社團 ｜ 新生知訊網',
            typelearn: club1,
            typeplay: club2,
            typedate: club3,
            typeservice: club4,
            club: club,
            user: req.user,
          });
        });
      });
    });
  });
});


/*新增編輯社團 */
router.post('/add_club', checkuser.isAdmin,function(req, res, next) {
  let typenum = req.body.type[0];
  name = req.body.name;
  club.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new club ({
        type: typenum,
        name: req.body.name,
        introduction: req.body.introduction,
        intro_pic:req.body.intro_pic,
        participation: req.body.participation,
        FB: req.body.FB,
        activity: req.body.activity,
        act_pic: req.body.act_pic,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].participation = req.body.participation;
      data[0].FB = req.body.FB;
      data[0].activity = req.body.activity;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/club');
});

/* 新增編輯其他學生組織 */
router.post('/add_community', checkuser.isAdmin,function(req, res, next) {
  name = req.body.name;
  community.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new community ({
        name: req.body.name,
        introduction: req.body.introduction,
        participation: req.body.participation,
        FB: req.body.FB,
        picture: req.body.picture,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].participation = req.body.participation;
      data[0].FB = req.body.FB;
      data[0].picture = req.body.picture;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/community');
});

/* 新增編輯系所 */
router.post('/add_department',checkuser.isAdmin, function(req, res, next) {
  let typenum = req.body.type[0];
  name = req.body.name;
  college = req.body.type.slice(1);
  department.find({name: name}, function(err, data) {
    if (data.length == 0) {
      new department ({
        type: typenum,
        college: college,
        name: req.body.name,
        introduction: req.body.introduction,
        organization: req.body.organization,
        activity: req.body.activity,
        team: req.body.team,
        course: req.body.course,
      }).save();
    }
    else{
      data[0].introduction = req.body.introduction;
      data[0].organization = req.body.organization;
      data[0].activity = req.body.activity;
      data[0].team = req.body.team;
      data[0].course = req.body.course;
      data[0].save() ; 
    }
  });
  res.redirect('/groups/department');
});
  

/* 學生會只有一項需要編輯所以直接update就可 */
router.post('/edit_student', checkuser.isAdmin, function(req, res, next) {
  student.update({
    introduction: req.body.introduction,
    branch: req.body.branch,
    activity: req.body.activity,
  }, function(err, doc) {
    if (err) {
      return next(err)
    }
    else 
    res.redirect('/groups/student');
  });
});

/* 社團新增圖片 */
router.post('/clubinsert_img', checkuser.isAdmin, (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId();    //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {    //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path;    //現在檔案被暫存在哪
      fileName = tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.'));    //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = './public/groups/img/' + fileName;    //我們希望檔案存在public下

      var readStream = fs.createReadStream(tmpPath)
      var writeStream = fs.createWriteStream(targetPath);
      let type = fields.pic_type; /* 圖片要放置的位置 ,找fields裡面的pic_type ,不是req.body. */
      readStream.on("end", (err) => {
        if (err) return next(err);
        //搬完之後要做的事寫在這
        if(type === '1'){
          club.findById(fields.club_id).exec(function(err,doc){
            doc.intro_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '2'){
          club.findById(fields.club_id).exec(function(err,doc){
            doc.act_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        console.log(fields);
        fs.unlink(tmpPath, () => {    //把暫存的檔案刪除
            console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
        });
      }).pipe(writeStream);
    }
    res.redirect('/groups/club');
  });
})

/* 學生會新增圖片 */
router.post('/studentinsert_img',  checkuser.isAdmin,(req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId();    //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {    //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path;    //現在檔案被暫存在哪
      fileName = tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.'));    //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = './public/groups/img/' + fileName;    //我們希望檔案存在public下

      var readStream = fs.createReadStream(tmpPath)
      var writeStream = fs.createWriteStream(targetPath);
      let type = fields.pic_type; /* 圖片要放置的位置 ,找fields裡面的pic_type ,不是req.body. */
      readStream.on("end", (err) => {
        if (err) return next(err);
        //搬完之後要做的事寫在這
        if(type === '1'){
          student.findById("5b4da8c24d334e6dfb47adb2").exec(function(err,doc){
            doc.intro_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '2'){
          student.findById("5b4da8c24d334e6dfb47adb2").exec(function(err,doc){
            doc.act_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        console.log(fields);
        fs.unlink(tmpPath, () => {    //把暫存的檔案刪除
            console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
        });
      }).pipe(writeStream);
    }
    res.redirect('/groups/student');
  });
})

/* 系所新增圖片 */
router.post('/departinsert_img',  checkuser.isAdmin,(req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId();    //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {    //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path;    //現在檔案被暫存在哪
      fileName = tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.'));    //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = './public/groups/img/' + fileName;    //我們希望檔案存在public下

      var readStream = fs.createReadStream(tmpPath)
      var writeStream = fs.createWriteStream(targetPath);
      let type = fields.pic_type; /* 圖片要放置的位置 ,找fields裡面的pic_type ,不是req.body. */
      readStream.on("end", (err) => {
        if (err) return next(err);
        //搬完之後要做的事寫在這
        if(type === '1'){
          department.findById(fields.depart_id).exec(function(err,doc){
            doc.intro_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '2'){
          department.findById(fields.depart_id).exec(function(err,doc){
            doc.organ_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '3'){
          department.findById(fields.depart_id).exec(function(err,doc){
            doc.act_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '4'){
          department.findById(fields.depart_id).exec(function(err,doc){
            doc.team_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        console.log(fields);
        fs.unlink(tmpPath, () => {    //把暫存的檔案刪除
            console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
        });
      }).pipe(writeStream);
    }
    res.redirect('/groups/department');
  });
})
  
/* 其他學生組織新增圖片 */
router.post('/cominsert_img',  checkuser.isAdmin, (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    //如果你的表單有不是file的欄位，他們會在fields裡面
    if (err) return next(err);
    var tempId = mongoose.Types.ObjectId();    //用mongoose幫我們生一組亂數
    var fileName = "";
    if (files.uploadingImg.name != "") {    //要是file那一欄有填
      var uploadedFile = files.uploadingImg;
      var tmpPath = uploadedFile.path;    //現在檔案被暫存在哪
      fileName = tempId + uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.'));    //檔名=剛剛mongoose產生的亂數＋原始副檔名
      var targetPath = './public/groups/img/' + fileName;    //我們希望檔案存在public下

      var readStream = fs.createReadStream(tmpPath)
      var writeStream = fs.createWriteStream(targetPath);
      let type = fields.pic_type; /* 圖片要放置的位置 ,找fields裡面的pic_type ,不是req.body. */
      readStream.on("end", (err) => {
        if (err) return next(err);
        //搬完之後要做的事寫在這
        if(type === '1'){
          community.findById(fields.community_id).exec(function(err,doc){
            doc.intro_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        else if(type === '2'){
          community.findById(fields.community_id).exec(function(err,doc){
            doc.act_pic.push(fileName);
            doc.save(function(err){
              if (err){
                return next(err);
              }
            })
          })
        }
        console.log(fields);
        fs.unlink(tmpPath, () => {    //把暫存的檔案刪除
            console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
        });
      }).pipe(writeStream);
    }
    res.redirect('/groups/club');
  });
})

// 給ajax拿資料的各路由
router.get("/clubmodal",function(req,res,next) {
  club.findById(req.query.id).exec(function(err,data_club) {
    if(err) {
      return next(err);
    }
    res.send(data_club);
  });
});
router.get("/depmodal",function(req,res,next) {
  department.findById(req.query.id).exec(function(err,data_dep) {
    if(err) {
      return next(err);
    }
    res.send(data_dep);
  });
});
router.get("/commodal",function(req,res,next) {
  community.findOne({name : req.query.name}).exec(function(err,data_com) {
    if(err) {
      return next(err);
    }
    res.send(data_com);
  });
});
router.get("/stumodal",function(req,res,next) {
  student.findById(req.query.id).exec(function(err,data_stu) {
    if(err) {
      return next(err);
    }
    res.send(data_stu);
  });
});

module.exports = router;
