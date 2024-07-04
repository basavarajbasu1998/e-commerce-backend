const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: (name, email) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
            db.query(query, [name, email], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    update: (id, name, email) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
            db.query(query, [name, email, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    },


    usercreate: (mobileNumber, firstName, password, lastName, email) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO shopusers (mobileNumber, firstName, password, lastName, email) VALUES (?, ?, ?, ?, ?)';
            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return reject(err);
                }
                db.query(query, [mobileNumber, firstName, hashedPassword, lastName, email], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result.insertId);
                });
            });
        });
    },

    usergetAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM shopusers';
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },


    findByEmailandPassword: (email, password) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM shopusers WHERE email = ?';
            db.query(query, [email], (err, result) => {
                if (err) {
                    return reject(err)
                }
                if (result.length === 0) {
                    return reject(new Error('user not found'))
                }
                const user = result[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return (reject);
                    }
                    if (!isMatch) {
                        return reject(new Error('Invalid password'));
                    }
                    resolve(user);
                })
            })
        })
    },

    findEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM shopusers WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(new Error('User not found'));
                }
                resolve(results[0]);
            });
        });
    },


};










module.exports = User;
