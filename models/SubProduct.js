const db = require('../config/db');

const SubProduct = {

    // Function to save product in the database
    saveProduct: (data) => {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO subproducts 
            (productId, subproductName, description, price, dummyprice, discount, rating, brand, images, status, stock,color,size) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
        `;

            const {
                productId,
                subproductName,
                description,
                price,
                dummyprice,
                discount,
                rating,
                brand,
                images, // Array of image paths
                status,
                stock,
                color,
                size
            } = data;

            // Convert images array to a string representation
            const imagesString = JSON.stringify(images); // Or any suitable serialization method

            db.query(
                query,
                [productId, subproductName, description, price, dummyprice, discount, rating, brand, imagesString, status, stock, color, size],
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

    // findSubProductAll: () => {
    //     return new Promise((resolve, reject) => {
    //         const query = 'SELECT * FROM subproducts';

    //         db.query(query, (err, results) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(results.map(result => {
    //                     return {
    //                     };
    //                 }));
    //             }
    //         });
    //     });
    // },

    findSubProductAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM subproducts';
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },



    findProductByIdColorSize: (productId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM subproducts 
                WHERE productId = ? 
            `;
            db.query(query, [productId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Assuming you want a single product
                }
            });
        });
    },



    // findSubProductAll: () => {
    //     return new Promise((resolve, reject) => {
    //         const query = 'SELECT * FROM subproducts';
    //         db.query(query, (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(results);
    //         });
    //     });
    // },


    SubProductfindById: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM subproducts WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    deleteBySubproductId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM subproducts WHERE subproductId = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },


    filterSubProducts: async (filters) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM subproducts WHERE 1=1';
            const queryParams = [];

            // Loop through each filter and construct the query
            if (filters.productId) {
                query += ' AND productId = ?';
                queryParams.push(filters.productId);
            }
            if (filters.subproductName) {
                query += ' AND subproductName LIKE ?';
                queryParams.push(`%${filters.subproductName}%`);
            }
            if (filters.description) {
                query += ' AND description LIKE ?';
                queryParams.push(`%${filters.description}%`);
            }
            if (filters.price) {
                query += ' AND price = ?';
                queryParams.push(filters.price);
            }
            if (filters.dummyprice) {
                query += ' AND dummyprice = ?';
                queryParams.push(filters.dummyprice);
            }
            if (filters.discount) {
                query += ' AND discount = ?';
                queryParams.push(filters.discount);
            }
            if (filters.rating) {
                query += ' AND rating = ?';
                queryParams.push(filters.rating);
            }
            if (filters.brand) {
                query += ' AND brand LIKE ?';
                queryParams.push(`%${filters.brand}%`);
            }
            if (filters.status) {
                query += ' AND status = ?';
                queryParams.push(filters.status);
            }
            if (filters.stock) {
                query += ' AND stock = ?';
                queryParams.push(filters.stock);
            }

            db.query(query, queryParams, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

};






module.exports = SubProduct;