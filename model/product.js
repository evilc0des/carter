var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
  description: String,
  photo: String,
  price: {
    type:Number,
    get: v => Math.round(v*100)/100,
    set: v => Math.round(v*100)/100
  },
  stock: Number,
  variants: [
    String
  ]
});

// create the model for stores and expose it to our app
module.exports = mongoose.model('Product', productSchema);