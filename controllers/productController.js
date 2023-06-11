const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const { name, mrp, sellers, category, subCategory, imgurl } = req.body;
    const seller = sellers[0].seller;
    const sellingPrice = sellers[0].sellingPrice;
    const quantity = sellers[0].quantity;
    
    // Check if a similar product already exists in the database
    const existingProduct = await Product.findOne({ name, mrp });
    
    if (existingProduct) {
      // Check if the seller is already associated
      const isSellerAssociated = existingProduct.sellers.some(
        (sellerData) => sellerData.seller.toString() === seller
      );
    
      if (isSellerAssociated) {
        return res
          .status(400)
          .json({ message: 'Seller is already associated with the product' });
      }
    
      // Add the seller to the sellers array
      existingProduct.sellers.push({ seller, sellingPrice, quantity });
      await existingProduct.save();
      console.log("Existing product updated");
    
      return res
        .status(200)
        .json({ message: 'Product already exists. Seller added successfully' });
    }
    
    // Product doesn't exist, create a new product
    const productData = { name, mrp, category, subCategory, imgurl, sellers: [{ seller, sellingPrice, quantity }] };
    const product = new Product(productData);
    await product.save();
    res.status(200).json({ message: 'Product added successfully' });
    
  } catch (error) {  
    res.status(500).json({  error: error.message });
  }
};


const getProductsBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    // Use the sellerId to fetch products associated with the seller
    const products = await Product.find(
      { 'sellers.seller': sellerId },
      { 'sellers.$': 1, name: 1, category: 1, subCategory: 1, mrp: 1, images: 1 }
    );
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
