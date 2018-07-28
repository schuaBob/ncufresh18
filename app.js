var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//Cache views
app.set('view cache', true);


//We need compression
var compression = require('compression');
app.use(compression());

//express-minify
var minify = require('express-minify');
app.use(minify());


//best-practice of security
const helmet = require('helmet')
app.use(helmet())

//database config
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ncufresh18');

//Connect-flash
const flash = require('connect-flash');
app.use(flash());

//validator
const expressValidator = require('express-validator');
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//加入strict路由
var router = express.Router({ strict: true });
router.all('*');

//session
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'ThisIsNcuFresh18Speaking.',
  name: 'ncufresh.session.id',
  resave: false,  /* 不要每次讀取就存回去一次 */
  saveUninitialized: false, /* 除非做儲存的動作，不然不要為每個使用者都存session */
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,  
    touchAfter: 24 * 3600   /* 沒動session的話，二十四小時之後再去動它 */
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(':method :url :status :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("NcuFresh18"));
app.use(express.static(path.join(__dirname, 'public')));


//Passport (MUST BEHIND VIEW ENGINE SETUP)
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

//Pages
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

// ckeditor uploader
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/uploader', multipartMiddleware, function (req, res, next) {
  var fs = require('fs');

  fs.readFile(req.files.upload.path, function (err, data) {
    if (err) return next(err);
    var newPath = __dirname + '/public/uploads/' + req.files.upload.name;
    fs.writeFile(newPath, data, function (err) {
      if (err) return next(err);

      html = "";
      html += "<script type='text/javascript'>";
      html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
      html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
      html += "    var message = \"Uploaded file successfully\";";
      html += "";
      html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
      html += "</script>";

      res.send(html);
    });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/error');
});

module.exports = app;
