# vuemall

> base in vue/nodejs/mongoDB online-mall

>为学习vue spa 项目创建的项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2017-12-17 备注

#### 带参数启动mongoDB,命令语句：
```
mongod --dbpath e:\MongoDB\data --logpath e:\MongoDB\log\mongo.log --journal
```

#### 一般启动:
```
mongod --dbpath e:\MongoDB\data
```

#### 安装服务:
```
mongod --config e:\MongoDB\etc\mongo.conf --install --serviceName "MongoDB"
```

#### 新建用户(新建admin用户)
1, 以非授权的模式启动数据库服务
```
mongod --config e:\MongoDB\etc\mongo.conf
```
2, 进入数据库
```
mongo
#创建admin数据库
use admin
#创建超级管理员账户
db.createUser({user:"admin",pwd:"admin",roles:["root"]})
#认证
db.auth("admin","admin")
```

#### 数据库基本操作（增删改查）
>先进入数据库 mongo命令执行完以后

1. 增
```
db.createCollect("collectionName")//新增集合（表），可省略
db.collectionName.insert({})
```
2. 删
```
db.collectionName.remove({[条件]})
db.collectionName.drop()//删除集合（表）
```
3. 改
```
db.collectionName.update({[条件]},{$set:{[修改的数据]}})
```
4. 查
```
db.collectionName.find({[条件，可选]})
db.collectionName.find({[条件，可选]}).pretty() //格式化
db.collectionName.findOne({[条件，可选]}) //查找第一条
//条件大于/小于/大于等于/小于等于
db.collectionName.find({key:{$gt/$lt/$eq/$gte/$lte:value}})
```

#### 通过文件使用命令导入数据（前提是数据格式正确）
>退出mongo命令
```
mongoimport -d mock -c goods --file C:\Users\Ablio\Downloads\project\s1n2ub\resource\dumall-goods
```
**-d**:数据库名称

**-c**:集合名称

**--file**:要导入的文件的位置``

## 2018-01-03 笔记
这个项目的后台服务是`127.0.0.1:3000`,前端自己也有服务器（vue官方脚手架提供的完整服务`127.0.0.1:8090`）
当前端调`'/goods'`,实际是访问**`localhost:8090`**端口，**`axios`**不支持跨域，因此需要转发请求
因此，前端调接口需要转发。转发的组建在*`config/index.js:34`*,**`proxyTable`**插件。
```javascript
proxyTable: {
  '/goods':{
    target:'http://localhost:3000'
  }
}
```
当调`localhost:8090/goods`时会转发给`localhost:3000/goods`
在上线项目中，这个步骤应该是不需要的，不需要跨域访问，只是在开发时需要
>注意：因为是前后端分了两个服务器，务必要保证两个服务都正常运行，才能成功访问。

## 2018-01-03 笔记2
1. get方法获取的数据都是**String**类型的
2. get方法nodejs原生获取数据提供的方法为 `url.parse(request.url).key`,
express框架中封装方法param, 获取数据方法为`request.param('keyname')`
3. nodejs服务端中，`require`,`console`都是**nodejs**提供的类库
4. mongoose中
models\goods.js 导出数据模型
```ecmascript 6
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice": Number,
  "productImage": String
});
module.exports = mongoose.model('Good',productSchema);
```
routes\goods.js 查找数据方法中
分页 利用`skip`跳过前面条数，和`limit`限制只查几条，类似截取字符串
链式方法
（ps:`skip`和`limit`应该都是**mongoose**提供的方法）
```ecmascript 6
var Goods = require("../models/goods");
let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
goodsModel.sort({'salePrice':sort});//设置条件
goodsModel.exec(function(err,doc){//执行操作,不需要条件了，直接执行
  //err:如果错误的话会有
  //doc:查询结果
});
```

## 2018-01-1 更新日志(笔记、知识点)
1. 加了一个插件vue-infinite-scroll,滚动自动加载。
要注意的是滚动很快，不能发起那么多次请求，因此调用请求要注意开关busy
具体见：https://www.npmjs.com/package/vue-infinite-scroll
2. 增加价格过滤筛选条件，接口修改（sever\router\goods.js)
设置价格范围查询条件
```ecmascript 6
 params = {//条件查询设置价格区间
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
```


