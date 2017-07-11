var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
// 连接mongodb
var mongoose = require('mongoose');
var session = require('express-session');
//http://idlelife.org/archives/808
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//http://mclspace.com/2015/12/03/nodejs-flash-note/
var flash = require('connect-flash');
//表单验证
var validator = require('express-validator');
//存储session的配置
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', expressHbs({
	defaultLayout: 'layout',
	extname: 'hbs',
	// layoutsDir: __dirname + '/views/layouts/',
 //  	partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', '.hbs');


//中间件的顺序很重要
//中间件的顺序很重要
//http://idlelife.org/archives/808


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//表单验证在bodyparaser后
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
		//链接mongo的链接
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //  //周期 180分钟，
    cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

//顺序很重要
//Passport功能单一，即只能做登录验证，但非常强大，支持本地账号验证和第三方账号登录验证（OAuth和OpenID等），支持大多数Web网站和服务。
app.use(passport.initialize());
//session验证
app.use(passport.session());
//flash是一个暂存器，而且暂存器里面的值使用过一次即被清空，这样的特性很方面用来做网站的提示信息。
app.use(flash());

require('./config/passport')(passport);


//使用中间件
//判断登陆
app.use(function(req, res, next){
	//true flase 将登陆成功与否赋值给login, 在前端在此进行判断 -- isAuthenticated()
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});


app.use('/user', userRoutes);
app.use('/', index);



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
  res.render('error');
});

module.exports = app;
