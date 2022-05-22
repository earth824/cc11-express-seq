const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// POST /users/register
router.post('/register', userController.register);
// PUT /users
router.put('/', authenticate, userController.updateUser);
router.post('/login', userController.login);
router.get('/', authenticate, userController.getMe);

module.exports = router;
