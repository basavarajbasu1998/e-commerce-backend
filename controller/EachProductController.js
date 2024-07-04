const EachProduct = require('../models/EachProduct');
const fs = require('fs');
const path = require('path');

// Create a new product
exports.EachProductImages = async (req, res) => {
    try {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, productid, color } = req.body;
        const imageUrl = req.file ? req.file.filename : null;

        // Validate required fields
        if (!brand || !buyingPrice || !category || !description || !imageUrl || !maxQuantity || !minQuantity || !productName || !rating || !sellingPrice || !productid || !color) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Insert product into the database
        const newProductId = await EachProduct.EachProduct({
            brand,
            buyingPrice,
            category,
            description,
            image: imageUrl,
            maxQuantity,
            minQuantity,
            productName,
            rating,
            sellingPrice,
            productid,
            color
        });

        // Respond with success
        res.status(201).json({ message: 'Product uploaded successfully!', newProductId, image });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};

// Get all products
exports.getAllEachProducts = async (req, res) => {
    try {
        const products = await EachProduct.getAllEachProduct();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get a product by ID
exports.getEachProductById = async (req, res) => {
    try {
        const product = await EachProduct.EachProductfindById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};


exports.getEachProductByProductId = async (req, res) => {
    try {
        const products = await EachProduct.EachProductfindByProductId(req.params.productid);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};



exports.updateEachProductById = async (req, res) => {
    try {
        const result = await EachProduct.EachProductupdateById(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product by ID
exports.deleteEachProductById = async (req, res) => {
    try {
        const result = await EachProduct.EachProductdeleteById(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Get products by category
exports.getFindMenEachProducts = async (req, res) => {
    try {
        let category = req.body.category; // Assuming category is passed in the request body

        if (!category) {
            return res.status(400).json({ error: 'Category parameter is required' });
        }

        const products = await EachProduct.findProductsByEachProduct(category);
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message });
    }
};
