const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
