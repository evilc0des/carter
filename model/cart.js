var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ 
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    variant: String
  }]
});

// create the model for stores and expose it to our app
module.exports = mongoose.model('Cart', cartSchema);