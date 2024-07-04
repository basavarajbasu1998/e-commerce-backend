const { BadRequestError } = require('../error/AppError');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = await User.create(name, email);
        res.status(201).send(`User added with ID: ${userId}`);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updated = await User.update(id, name, email);
        if (!updated) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('User updated successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.delete(id);
        if (!deleted) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('User deleted successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};


exports.shopUser = async (req, res) => {
    try {
        const { firstName, lastName, password, mobileNumber, email } = req.body;
        const userId = await User.usercreate(firstName, lastName, password, mobileNumber, email);
        res.status(200).send(`User added with ID: ${userId}`);
    } catch (err) {
        res.status(500).send('Server error');
    }
}
exports.getshopUsers = async (req, res) => {
    try {
        const users = await User.usergetAll();
        res.status(200).json({ message: 'fetch successful', code: 1000, users })
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.shoplogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Email and password are required');
        }
        const user = await User.findByEmailandPassword(email, password);
        res.status(200).json({ message: 'Login successful', user })
    } catch (err) {
        next(err);
        res.status(500).send('Invalid Password');
    }
}


exports.forgotemail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new BadRequestError('Email  are required');
        }
        const user = await User.findEmail(email);
        res.status(200).json({ message: ' email successful', user })
    } catch (err) {
        next(err);
        res.status(500).send('Invalid Password');
    }
}


// exports.addProduct = async (req, res, next) => {
//     try {
//         const { productName, maxPrice, minPrice, brand, status, returnProduct, minQty, maxQty } = req.body;

//         // Convert boolean value to integer
//         const returnProductInt = returnProduct ? 1 : 0;

//         const productImage = req.file.buffer; // Get image buffer
//         const productImageType = req.file.mimetype; // Get image MIME type

//         const productId = await User.addProduct(productName, maxPrice, minPrice, brand, status, returnProductInt, minQty, maxQty, productImage, productImageType);
//         res.status(201).json({ message: 'Product added successfully', productId });
//     } catch (err) {
//         next(err);
//     }
// };




// exports.getAllProducts = async (req, res, next) => {
//     try {
//         const products = await User.getAllProducts();
//         res.status(200).json(products);
//     } catch (err) {
//         next(err);
//     }
// };



