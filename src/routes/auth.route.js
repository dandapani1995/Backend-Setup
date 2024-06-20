const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.contoller');

// Define routes
router.get('/', authController.getAllUsers);
router.post('/signin', authController.userSignIn);
router.post('/verify', authController.userVerification);
router.post('/login', authController.loginUser);
// router.delete('/:id', authController.deleteUser);

module.exports = router;