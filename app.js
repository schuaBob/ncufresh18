var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var documents = require('./routes/documents');
var qna = require('./routes/qna');
var campus = require('./routes/campus');
var groups = require('./routes/groups');
var life = require('./routes/life');
var smallgame = require('./routes/smallgame');
var video = require('./routes/video');
var personal = require('./routes/personal');
var about = require('./routes/about');

//加入strict路由
var router = express.Router({strict:true});
router.all('*');

//session
var session = require('express-session');
app.use(session({
  secret: 'ThisIsNcuFresh18Speaking.',
  resave: true,
  saveUninitialized: false
}));

// database config
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ncufresh18');

// 首頁
app.use('/', index);
// 新生必讀
app.use('/documents', documents);
// 新生Ｑ＆Ａ
app.use('/qna', qna);
// 校園導覽
app.use('/campus', campus);
// 系所社團
app.use('/groups', groups);
// 中大生活
app.use('/life', life);
// 小遊戲
app.use('/smallgame', smallgame);
// 影音專區
app.use('/video', video);
// 個人專區
app.use('/personal', personal);
// 關於我們
app.use('/about', about);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/error');
});

module.exports = app;
