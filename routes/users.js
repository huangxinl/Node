var express = require('express');
var router = express.Router();
var userDao = require('../db/userDao');

/* GET users listing. 拦截get请求 路径/login/ 渲染login模板 */
router.get('/login', function(req, res, next) {
  res.render('login');
});

// 拦截 post请求，路径login
router.post('/login', (req, res, next) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
    remember: req.body.remember
  }
  userDao.login(user,res)
  
});

router.get('/register',(req,res, next) => { 
  res.render('register',{user:{},title:"用户注册"})
})
router.post('/register',(req,res, next) => {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  userDao.register(user,res)
})

//get方式访问update路径时，根据id将数据库中的数据查出，返回页面上
router.get('/update',(req,res, next) => { 
  // console.log(`req.query = ${req.query.id}`)
  userDao.selectUserById(req.query.id,res)
})
//Post方式访问时，代表提交更新后的数据
router.post('/update',(req,res, next) => {
  console.log(req.body)
  var user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password
  }
  userDao.updateUserById(user,res)
})

// router.post('/delete',(req,res,next) =>{
//   // console.log(req.query.id)
//   userDao.delete(req.query.id,res)
// })
module.exports = router;
