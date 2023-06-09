const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/validationMiddleware');

router.post('/', verifyToken, productController.addProduct);
router.get('/seller/:sellerId', productController.getProductsBySellerId);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/seller/:sellerId/:id', verifyToken, productController.removeProductForSeller);

module.exports = router;
