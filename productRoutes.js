// src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:categoryname/products', productController.getTopProducts);
router.get('/:categoryname/products/:productid', productController.getProductById);

module.exports = router;