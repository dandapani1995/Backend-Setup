const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contoller');
const { authenticateToken } = require('../middleware/middleware');

// Define routes
router.get('/', authenticateToken, userController.getUserInfo);


module.exports = router;