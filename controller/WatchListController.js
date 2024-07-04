
const watchlist = require('../models/WatchList');

exports.addCartProduct = async (req, res) => {
    try {
        const { userId, productId, price, size, color, productname, image, dummyprice } = req.body;

        // Validate required fields
        if (!userId || !productId || !price || !size || !color || !productname || !image || !dummyprice) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Use the addProduct function to add the product to the cart
        const result = await watchlist.AddCartProductS({
            userId,
            productId,
            price,
            size,
            color,
            productname,
            image,
            dummyprice
        });

        // Respond based on the result
        if (result.message === 'Product already in cart') {
            res.status(200).json({ message: 'Product already in cart' });
        } else {
            res.status(200).json({ message: 'Product added to cart successfully!', cartProduct: result });
        }
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};



exports.getProductCartId = async (req, res) => {
    try {
        const product = await watchlist.findByAddCartId(req.params.userId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};
