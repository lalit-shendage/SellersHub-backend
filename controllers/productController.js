const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

const getProductsBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await Product.find({ seller: sellerId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const removeProductForSeller = async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.params.sellerId;
    const product = await Product.findOneAndRemove({ _id: productId, seller: sellerId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product' });
  }
};

module.exports = {
  addProduct,
  getProductsBySellerId,
  updateProduct,
  removeProductForSeller,
};
