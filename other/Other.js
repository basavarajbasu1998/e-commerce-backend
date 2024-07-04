const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load environment variables
require('dotenv').config();

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create products table if not exists
db.query(`
    CREATE TABLE IF NOT EXISTS productss(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        imageUrl VARCHAR(255)
    )
`, (err, result) => {
    if (err) {
        console.error('Error creating products table:', err.message);
    }
});

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file.path;

    const query = 'INSERT INTO productss (name, description, price, imageUrl) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, imageUrl], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product uploaded successfully!' });
    });
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
