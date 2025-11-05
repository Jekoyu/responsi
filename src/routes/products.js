const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All product routes require authentication
router.use(authMiddleware);

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;