var express = require('express');
var router = express.Router();

var User = require('./../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user login */
router.post('/login',function (req, res, next) {
  var params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{//给前端的cookie
          path:"/",
          maxAge:1000*60*60
        });
        //req.session.user = doc;//服务端存的用户信息
        res.json({
          status:"0",
          msg:'',
          result:{
            userName:doc.userName
          }
        });
      }
    }
  });
});

/* POST user log out 登出 */
router.post('/logout',function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    meg:"",
    result:""
  });

});

module.exports = router;
