

const express = require('express');
const multer = require('multer');
const path = require('path');
const subProductController = require('../controller/SubProductController');

const router = express.Router();

// Directory where uploaded files will be stored
const uploadDirectory = path.join(__dirname, '../uploads');

// Ensure the directory exists
const fs = require('fs');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});





// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Define routes
router.post('/api/v1/subproducts', upload.array('image', 10), subProductController.createSubProduct);

router.get('/api/v1/subproducts', subProductController.getAllSubProducts);
router.delete('/api/v1/subproducts/:id', subProductController.deleteSubProductById);
router.get('/api/v1/subproducts', subProductController.filterSubProducts);

router.get('/api/v1/subproducts/:id', subProductController.getSubProductById);

router.get('/api/v1/subproductsid/:productId', subProductController.getSubProductById);

module.exports = router;


