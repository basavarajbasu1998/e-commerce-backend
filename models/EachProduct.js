// models/Product.js
const db = require('../config/db');

const EachProduct = {

    EachProductfindAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM eachproducts';
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    EachProductfindById: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM eachproducts WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },



    // EachProductfindByProductId: async (productid) => {
    //     return new Promise((resolve, reject) => {
    //         const query = 'SELECT * FROM eachproducts WHERE productid = ?';

    //         db.query(query, [productid], (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(results[0]);
    //         });
    //     });
    // },

    EachProductfindByProductId: async (productid) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM eachproducts WHERE productid = ?';

            db.query(query, [productid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    EachProductupdateById: (id, data) => {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, productid, color } = data;
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE eachproducts
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
                    sellingPrice = ?,
                    productid = ?,
                    color = ?
                WHERE id = ?
            `;
            db.query(
                query,
                [brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, productid, color, id],
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

    EachProductdeleteById: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM eachproducts WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    EachProduct: (data) => {
        const { brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, productid, color } = data;
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO eachproducts (
                    brand, 
                    buyingPrice, 
                    category, 
                    description, 
                    image, 
                    maxQuantity, 
                    minQuantity, 
                    productName, 
                    rating, 
                    sellingPrice,
                    productid,
                    color
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(
                query,
                [brand, buyingPrice, category, description, image, maxQuantity, minQuantity, productName, rating, sellingPrice, productid, color],
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


    getAllEachProduct: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM eachproducts';
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    findProductsByEachProduct: (category) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM eachproducts
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

module.exports = EachProduct;
