var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//模型中没有的字段不会被保存，不能用save保存，因此如果新增字段，模型中也要新增
var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice": Number,
  "productNum":Number,
  "checked":Number,
  "productImage": String
});
//第三个参数与哪个表关联，如果不写第三个参数，那么第一个参数为表名去掉末尾's'
module.exports = mongoose.model('Good',productSchema);
