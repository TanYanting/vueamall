var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Goods = require("../models/goods");


mongoose.connect('mongodb://127.0.0.1:27017/mock');

//链接成功
mongoose.connection.on("connected",function () {
  console.log("MongoDb connected success.")
});

//链接失败
mongoose.connection.on("error",function () {
  console.log("MongoDb connected fail.")
});

//链接断开
mongoose.connection.on("disconnected",function () {
  console.log("MongoDb connected disconnected.")
});

//路由
router.get("/",function (req,res,next) {
  //业务代码
  //arguments[0],查询条件
  //arguments[1],callback,回调函数
  Goods.find({},function (err,doc) {
    if(err){
      //传一个json文件
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
        status:'0',
        mes:'',
        result:{
          count:doc.length,
          list:doc
        }
      });
    }
  })
});

module.exports = router;

