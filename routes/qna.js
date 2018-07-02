var express = require('express');
var router = express.Router();

/* Q&A首頁 */
router.get('/', function(req, res, next) {
  res.render('qna/index', { title: 'qna' });
});

module.exports = router;
