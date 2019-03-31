var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//图标
var ejs = require('ejs');//ejs
var logger = require('morgan');//日志输出
var cookieParser = require('cookie-parser'); //获取cookie进行转化
var bodyParser = require('body-parser');//对返回值进行转换

var index = require('./routes/index');//路由，每个路由相当于一个controller
var users = require('./routes/users');//路由分模块
var goods = require('./routes/goods');//商品路由

var app = express();//相当于启一个服务

// view engine setups 设置引擎
app.set('views', path.join(__dirname, 'views'));//设置views访问的目录
/*
* 设置为html
 app.engine('.html',ejs.__express);
 app.set('view engine', 'html');//设置引擎
* */
app.set('view engine', 'jade');//设置引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//use去加载插件
app.use(logger('dev'));
app.use(bodyParser.json());//请求值转换
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//使用这个插件
app.use(express.static(path.join(__dirname, 'public')));//设置静态目录，drirname(当前目录/sever

app.use(function (req,res,next) {
  if (req.cookies.userId) {
    next();
  } else if (req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.path ==='/goods/list') {
    next();
  } else {
    res.json({
      status: '10001',
      msg: '当前未登录',
      result: ''
    })
  }
});

app.use('/', index);//'/'加载 index 路由模块，以下同理
app.use('/users', users);
app.use('/goods',goods);

// catch 404 and forward to error handler
//对404的拦截
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
