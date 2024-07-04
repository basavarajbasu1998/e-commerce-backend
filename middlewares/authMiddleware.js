const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../error/UnauthorizedError');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return next(new UnauthorizedError('Authentication token is required'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(new UnauthorizedError('Invalid token'));
        }
        req.user = user; // Set user information from JWT payload
        next();
    });
};

module.exports = { authenticateToken };
