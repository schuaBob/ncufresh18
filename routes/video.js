var express = require('express');
var router = express.Router();

/* 影音專區首頁 */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區' });
});

router.get('/page', function(req, res, next) {
  /*video.find({}).exec(function(err, video) {
    var foodURL, housingURL, transportationURL, educationURL, entertainmentURL, streetInterviewURL;
    var l1, l2, l3, l4, sequence;
    var D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24;
    for(var i in video){
      
    }
  })*/
  res.render('video/page', { title: '影音專區頁面' });
})


router.post('/add', isAdmin, function(req, res, next){

  res.redirect('/video');
})



function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.local.accountType === 'admin')
    return next();
  res.redirect('/');
}

module.exports = router;
