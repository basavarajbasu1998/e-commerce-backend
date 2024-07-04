// db.js
const mysql = require('mysql2');

// Create a connection pool
const db = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: process.env.DB_HOST || 'localhost', // Database host
    user: process.env.DB_USER || 'root', // Database user
    password: process.env.DB_PASSWORD || 'admin', // Database password
    database: process.env.DB_NAME || 'ta' // Database name
});



// Export the connection pool
module.exports = db;
