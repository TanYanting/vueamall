let http = require("http");
let url = require("url");
let util = require("util");
let fs = require("fs");

let sever = http.createServer((req,res)=>{
  //res.statusCode = 200;
  //res.setHeader("Content-Type","text/plan;charset=utf-8");

  var pathname = url.parse(req.url).pathname;
  fs.readFile(pathname.substring(1),function (err,data) {
    if(err){//报错
      res.writeHead(404,{
        'Content-Type':"text/html"
      });
    }else{
      res.writeHead(200,{
        "Content-Type":"text/html"
      });

      res.write(data.toString());//写入数据
    }
    res.end();//返回给前端，可以传参也可以不传
    //需要在文件系统中返回
  });

});

sever.listen(3000,'127.0.0.1',()=>{
  console.log("监听3000端口");
});
