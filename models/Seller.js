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
  address: {
    type: String,
  },
  gst: {
    type: String,
  },
  logo: {
    type: String,
  },
  storeTimings: {
    type: String,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
