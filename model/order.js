var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  quantity: Number,
  products: [{ 
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    variant: String
  }],
  createdDate: String  
});

// create the model for stores and expose it to our app
module.exports = mongoose.model('Order', orderSchema);