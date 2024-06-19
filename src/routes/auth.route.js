const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.contoller');

// Define routes
router.get('/', authController.getAllUsers);
// router.post('/add', userController.createUser);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;