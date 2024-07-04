// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/userController');

// router.post('/use', userController.createUser);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const productController = require('../controller/productController');


const upload = require('../middlewares/uploadMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Example of updated paths with an API version prefix
router.post('/api/v1/users/use',authenticateToken, userController.createUser);
router.get('/api/v1/users', userController.getAllUsers);
router.get('/api/v1/users/:id', userController.getUserById);
router.put('/api/v1/users/:id', userController.updateUser);
router.delete('/api/v1/users/:id', userController.deleteUser);
router.post('/api/v1/shopuser', userController.shopUser);
router.get('/api/v1/getshopuser', userController.getshopUsers);
router.post('/api/v1/login', userController.shoplogin);
router.post('/api/v1/forgot', userController.forgotemail);

module.exports = router;
