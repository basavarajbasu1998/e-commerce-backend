// controller/SubProductController.js
const SubProduct = require("../models/SubProduct");


exports.createSubProduct = async (req, res) => {
    try {
        const {
            productId,
            subproductName,
            description,
            price,
            dummyprice,
            discount,
            rating,
            brand,
            status,
            stock,
            color,
            size
        } = req.body;

        // Handle image files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }
        // const imageUrl = req.file ? req.file.filename : null;
        const images = req.files.map(file => file.filename);

        // Insert the new subproduct
        const insertId = await SubProduct.saveProduct({
            productId,
            subproductName,
            description,
            price,
            dummyprice,
            discount,
            rating,
            brand,
            images,
            status,
            stock,
            color,
            size,
        });
        // Send success response
        res.status(200).json({ message: 'Subproduct created successfully', subproductId: insertId });
    } catch (err) {
        // Handle errors
        console.error('Error creating subproduct:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};


exports.getAllSubProducts = async (req, res) => {
    try {
        const subProducts = await SubProduct.findSubProductAll();
        res.status(200).json(subProducts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};


exports.getSubProductById = async (req, res) => {
    try {
        const product = await SubProduct.SubProductfindById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};



exports.getEachProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const { color, size } = req.query; // Assuming color and size are provided as query parameters

        const product = await EachProduct.findProductByIdColorSize(productId, color, size);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};


exports.getSubProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        // const { color, size } = req.query;

        // if (!productId || !color || !size) {
        //     return res.status(400).json({ message: 'Missing required parameters' });
        // }

        const product = await SubProduct.findProductByIdColorSize(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};





exports.deleteSubProductById = async (req, res) => {
    try {
        const result = await SubProduct.deleteBySubproductId(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};


exports.filterSubProducts = async (req, res) => {
    try {
        const filters = req.query; // Capture the query parameters
        const result = await SubProduct.filterSubProducts(filters);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};