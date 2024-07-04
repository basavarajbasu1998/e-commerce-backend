


const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const eachproductController = require('../controller/EachProductController');


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
router.post('/api/v1/eachproducts', upload.single('image'), eachproductController.EachProductImages);

router.get('/api/v1/eachproducts', eachproductController.getAllEachProducts);

router.get('/api/v1/eachproducts/:id', eachproductController.getEachProductById);

router.get('/api/v1/eachproductid/:productid', eachproductController.getEachProductByProductId)

router.put('/api/v1/eachproducts/:id', upload.single('image'), eachproductController.updateEachProductById);
router.delete('/api/v1/eachproducts/:id', eachproductController.deleteEachProductById);
router.post('/api/v1/eachmen', eachproductController.getFindMenEachProducts)

module.exports = router;
