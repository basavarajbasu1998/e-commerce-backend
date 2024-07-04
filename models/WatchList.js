const db = require('../config/db'); // Ensure this points to your actual database configuration

const watchlist = {
    AddCartProductS: (data) => {
        const { userId, productId, price, size, color, productname, image, dummyprice } = data;
        return new Promise((resolve, reject) => {
            // Check if the product is already in the user's cart
            const checkQuery = `SELECT * FROM watchlist WHERE userId = ? AND productId = ?`;
            db.query(checkQuery, [userId, productId], (checkError, checkResults) => {
                if (checkError) {
                    return reject(checkError);
                }
                if (checkResults.length > 0) {
                    // Product already exists in the cart
                    return resolve({ message: 'Product already in cart' });
                } else {
                    // Insert the product into the cart
                    const insertQuery = `INSERT INTO watchlist (userId, productId, price, size, color, productname, image, dummyprice)
                                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    db.query(insertQuery, [userId, productId, price, size, color, productname, image, dummyprice], (insertError, insertResults) => {
                        if (insertError) {
                            return reject(insertError);
                        }
                        resolve(insertResults);
                    });
                }
            });
        });
    },

    findByAddCartId: async (userId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM watchlist WHERE userId = ?';
            db.query(query, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = watchlist;
