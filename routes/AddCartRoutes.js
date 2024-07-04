const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const addCarts = require('../controller/AddCartController')
// const productController = require('../controller/productController');


const upload = require('../middlewares/uploadMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.post('/api/v1/addcart', addCarts.addCartProduct)

router.get('/api/v1/addcart/:userId', addCarts.getProductCartId)

module.exports = router;