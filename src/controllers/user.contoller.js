
const db = require('../models/index');
const { User, Auth, Role, UserRole } = db;
const uuid = require('uuid4');
const {

  Success,
  Failure,
} = require('../utills/common');const { Message } = require("../utills/constant");

exports.getUserInfo = async (req, res) => {
  try {      
    const userData = await User.findOne({where:{
      id:req.user.id
    }});
    return Success('Success', 200, userData, res)
  } catch (err) {
    return Failure('Failure', 500, err.message, res);
  }
};


