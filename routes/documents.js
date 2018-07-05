var express = require('express');
var router = express.Router();
var document = require('../models/document/document');

/* 新生必讀首頁 */
router.get('/', function(req, res, next) {
  res.render('documents/index', { title: '新生必讀' });
});

      
router.post('/edit/:id', function(req, res, next) {

  
  console.log('Save to DB.');
      document.update({_id:req.params.id},{title:req.body.title},{content:req.body.add-text},
        function(err){
          if(err)
            console.log('fail to update article.');
          else
            console.log('Save to DB.');
    })
  
 
  res.redirect('/documents');
});


 
    

module.exports = router;
