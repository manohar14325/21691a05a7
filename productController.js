// src/controllers/productController.js
const productService = require('../services/productService');

const getTopProducts = async (req, res) => {
    const { categoryname } = req.params;
    const { minPrice = 0, maxPrice = 10000, n = 10, page = 1, sortBy, order = 'asc' } = req.query;

    const products = await productService.getTopProducts(categoryname, minPrice, maxPrice, parseInt(n), parseInt(page), sortBy, order);

    if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
};

const getProductById = async (req, res) => {
    const { categoryname, productid } = req.params;

    // This assumes you have a way to fetch all products or have cached them previously
    const products = await productService.getTopProducts(categoryname, 0, 100000, 1000, 1);
    const product = productService.getProductById(products, productid);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
};

module.exports = {
    getTopProducts,
    getProductById
};