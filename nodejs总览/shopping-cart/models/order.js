var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  //顾客id, 可以进一步查看email等
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  address: {type: String, required: true},
  name: {type: String, required: true},
  paymentId: {type: String, required: true}

});

module.exports = mongoose.model('Order', schema);
