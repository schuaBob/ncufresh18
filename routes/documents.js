var express = require('express');
var router = express.Router();

/* 新生必讀首頁 */
router.get('/', function(req, res, next) {
  res.render('documents/index', { title: '新生必讀' });
});

      
router.post('/add/:id', function(req, res, next) {
  if ((!req.session.name) ){
    res.redirect('/');
    return;
  }
  new Blog({
    Username:req.session.name,
    Article:req.body.Content,
    CreateDate: Date.now()
  }).save(function(err){
    if(err){
      console.log('fail to save to DB.');
      return;
    }
    console.log('Save to DB.');
  });
  res.redirect('/');
  });

router.post('/update/:id', function(req, res, next) {
  if ((!req.params.id) ){
    res.redirect('/');
    return;
  }
  Blog.update({_id:req.params.id},{Article:req.body.Content},
    function(err){
      if(err)
        console.log('fail to update article.');
      else
        console.log('Save to DB.');
    });
    res.redirect('/users/profile');
    });

module.exports = router;
