var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//设置模板路径
app.set('views', path.join(__dirname, 'views'));
// view engine setup 设置模板引擎
app.set('view engine', 'ejs');
//引入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态文件路径
app.use('/static',express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  //获取请求地址
  var url = req.originalUrl
  //判断cookie中是否有userId,如果有则放行
  if(req.cookies.userId) {
    next()
  } else{
    //如果没有，则判断是否登录或者注册url
    if(url == "/users/login" || url == "/users/register"){
      return next()
    }
    //都不是的话返回登录页
    else {
      res.redirect('/users/login')
    }
  }
}); 


//引入路由中间件
app.use('/', indexRouter);
app.use('/users', usersRouter); //粗心

// catch 404 and forward to error handler

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
