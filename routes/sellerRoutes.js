const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { verifyToken } = require('../middleware/validationMiddleware');
// Public route
router.post('/register', sellerController.register);
router.post('/login', sellerController.login);

// Protected route that requires authentication
router.get('/dashboard', verifyToken,  sellerController.dashboard);
router.put('/info', verifyToken,  sellerController.updateSellerInfo);
module.exports = router;
