
const db = require('../models/index')
const {user,Auth } = db;
exports.getAllUsers = async (req, res) => {
    try {
      const users = await user.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };