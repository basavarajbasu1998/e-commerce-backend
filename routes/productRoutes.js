
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const productController = require('../controller/productController');


const router = express.Router();

// Directory where uploaded files will be stored
const uploadDirectory = path.join(__dirname, '../uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


// Define product routes
router.post('/api/v1/products', upload.single('image'), productController.ProductImages);

router.get('/api/v1/products', productController.getAllProducts);

router.get('/api/v1/products/:id', productController.getProductById);

router.put('/api/v1/products/:id', upload.single('image'), productController.updateProductById);
router.delete('/api/v1/products/:id', productController.deleteProductById);
router.post('/api/v1/men', productController.getFindMenProducts)

module.exports = router;
