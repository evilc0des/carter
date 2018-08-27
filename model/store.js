var mongoose = require('mongoose');

var storeSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// create the model for stores and expose it to our app
module.exports = mongoose.model('Store', storeSchema);