// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
const fs = require('fs');
const path = require('path');



exports.ProductImages = async (req, res) => {
    try {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice } = req.body;
        const imageUrl = req.file ? req.file.filename : null;

        // Validate required fields
        if (!brand || !buyingPrice || !category || !description || !imageUrl || !maxQuantity || !minQuantity || !productName || !rating || !sellingPrice) {
            return res.status(400).json({ error: 'Missing required fields', req });
        }

        // Insert product into the database
        const productId = await Product.ProductImages({
            brand,
            buyingPrice,
            category,
            description,
            image: imageUrl,
            // image,
            maxQuantity,
            minQuantity,
            productName,
            rating,
            sellingPrice
        });

        // Respond with success
        res.status(201).json({ message: 'Product uploaded successfully!', productId, image });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const result = await Product.updateById(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const result = await Product.deleteById(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};








exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message });
    }
}



exports.getFindMenProducts = async (req, res) => {
    try {
        let category = req.body.category; // Assuming category is passed in the request body

        if (!category) {
            return res.status(400).json({ error: 'Category parameter is required' });
        }

        const products = await Product.findProductsByCategory(category);
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message });
    }
};









