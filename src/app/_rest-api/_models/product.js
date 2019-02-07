const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  label: {type: String, required: true},
  position: Number,
  checked: Boolean
});

module.exports = mongoose.model('Product', productSchema);
