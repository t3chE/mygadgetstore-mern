const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
// Protecting the routes for creating, updating, and deleting products
router.post('/', protectAdmin, productController.createProduct);
router.put('/:id', protectAdmin, productController.updateProduct);
router.delete('/:id', protectAdmin, productController.deleteProduct);

// Add review to product
router.post('/:id/reviews', async (req, res, next) => {
    try {
        const { rating, text } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.reviews.push({ rating, text });
        await product.save();
        res.status(201).json(product.reviews);
    } catch (error) {
        next(error);
    }
});

module.exports = router;