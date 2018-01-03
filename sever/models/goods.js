var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice": Number,
  "productImage": String
});
//第三个参数与哪个表关联，如果不写第三个参数，那么第一个参数为表名去掉末尾's'
module.exports = mongoose.model('Good',productSchema);
