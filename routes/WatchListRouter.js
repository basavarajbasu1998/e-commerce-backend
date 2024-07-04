const express = require('express');
const router = express.Router();

const addCarts = require('../controller/WatchListController')
// const productController = require('../controller/productController');


const upload = require('../middlewares/uploadMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.post('/api/v1/watchlist', addCarts.addCartProduct)

router.get('/api/v1/watchlist/:userId', addCarts.getProductCartId)

module.exports = router;