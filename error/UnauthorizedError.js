// errors/AppError.js

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401; // Unauthorized HTTP status code
        this.status = 'fail';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { UnauthorizedError };
