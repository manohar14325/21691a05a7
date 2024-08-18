// src/services/productService.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const fetchProductsFromCompany = async (company, category, minPrice, maxPrice) => {
    const url = ${process.env.API_BASE_URL}${company}/categories/${category}/products/top-10&minPrice-${minPrice}&maxPrice-${maxPrice};
    try {
        const response = await axios.get(url);
        return response.data.map(product => ({
            ...product,
            id: uuidv4(),
            company
        }));
    } catch (error) {
        console.error(Error fetching data from ${company}:, error);
        return [];
    }
};

const getTopProducts = async (category, minPrice, maxPrice, n, page, sortBy, order) => {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    const productPromises = companies.map(company =>
        fetchProductsFromCompany(company, category, minPrice, maxPrice)
    );

    let products = (await Promise.all(productPromises)).flat();

    if (sortBy) {
        products.sort((a, b) => {
            if (order === 'desc') return b[sortBy] - a[sortBy];
            return a[sortBy] - b[sortBy];
        });
    }

    const start = (page - 1) * n;
    const end = start + n;
    return products.slice(start, end);
};

const getProductById = (products, productId) => {
    return products.find(product => product.id === productId);
};

module.exports = {
    getTopProducts,
    getProductById
};