

// models/Product.js
const db = require('../config/db');

const Product = {

    findAll: async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products';
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },


    findById: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },
    updateById: async (id, data) => {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice } = data;
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE products
                SET
                    brand = ?,
                    buyingPrice = ?,
                    category = ?,
                    description = ?,
                    image = ?,
                    maxQuantity = ?,
                    minQuantity = ?,
                    productName = ?,
                    rating = ?,
                    sellingPrice = ?
                WHERE id = ?
            `;
            db.query(
                query,
                [brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    deleteById: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM products WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    ProductImages: async (data) => {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice } = data;
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO products (
                    brand, 
                    buyingPrice, 
                    category, 
                    description, 
                    image, 
                    maxQuantity, 
                    minQuantity, 
                    productName, 
                    rating, 
                    sellingPrice
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(
                query,
                [brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertId);
                    }
                }
            );
        });
    },


    getAllProducts: async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products';
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },



    findProductsByCategory: async (category) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM products
                WHERE category = ?
            `;
            db.query(query, [category], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};





module.exports = Product;
