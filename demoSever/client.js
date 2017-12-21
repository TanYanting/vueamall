//调用第三方服务
//在这种条件下自己角色为客户端(相对而言
//提供服务的为服务方
var http = require('http');
let util = require('util');

http.get('http://www.imooc.com/index/getstarlist',function (res) {
  let data = '';
  res.on("data",function (chunk) {//监听数据变化，当数据变化是触发方法,
    data += chunk;//不能一次性获取，监听过程，数据累加
  });

  res.on("end",function () {//监听数据什么时候接收完
    let result = JSON.parse(data);

    console.log(`result:${util.inspect(result)}`);
  });
});
