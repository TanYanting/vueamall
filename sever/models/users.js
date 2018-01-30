var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "userId":String,
  "userName":String,
  "userPwd": String,
  "orderList": Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrince":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":Array
});
//第三个参数与哪个表关联，如果不写第三个参数，那么第一个参数为表名去掉末尾's'
module.exports = mongoose.model('User',userSchema);
