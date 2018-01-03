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
1,增
```
db.createCollect("collectionName")//新增集合（表），可省略
db.collectionName.insert({})
```
2,删
```
db.collectionName.remove({[条件]})
db.collectionName.drop()//删除集合（表）
```
3,改
```
db.collectionName.update({[条件]},{$set:{[修改的数据]}})
```
4,查
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
