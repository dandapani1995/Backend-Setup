
const db = require('../models/index');
const uuid = require('uuid4');
const { user, auth, roles, user_roles } = db;
const { hashPassword, comparePassword, generateRandomString } = require('../utills/common');
const { success, failure } = require('../middleware/middleware');
const { Message } = require("../utills/constant");

exports.getAllUsers = async (req, res) => {
    try {
      const role = await roles.findAll();
      return success('Success',200, role,res)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.userSignIn = async (req, res) => {
    try {
      let payload = req.body;
      payload.uuid = uuid();
      console.log("payload",payload);
      const users = await user.findOne({
        where:{
        email:payload.email
      }
    }); 
    if(users){
      return failure('Failure', 409, Message[100], res);
     } 
     payload.password = await hashPassword( payload.password); // Password hash using bcrypt
     let userCreate = await user.create(payload) // User creation
     let user_verification_code = await generateRandomString(10);
       await auth.create({
        ...payload,
        user_verification_code,
        user_id: userCreate.id
      }) // Auth creation
      const userRoles = await roles.findAll();
     let newRole =  userRoles.find(res=> res.name.toLowerCase() == payload.role.toLowerCase());
        await user_roles.create({
          user_id: userCreate.id,
          role_id: newRole.id
        }); // Role creation
        /** Need to send verification email to registered email */  
      return success('Success', 200, Message[104], res)
    } catch (err) {
      return failure('Failure', 500, err.message, res);
    }
};

exports.userVerification = async (req, res) => {
  try {
    let payload = req.body;
    console.log("payload",payload);
    const user = await auth.findOne({
      where:{
      user_id:payload.user_id,
      user_verification_code:payload.user_verification_code
    }
  }); 
  if(!user){
    return failure('Failure', 404, Message[102], res);
   }; 
   if(user && user.account_verification){
    return failure('Failure', 409, Message[106], res);
   };
    await auth.update({
      user_verification_code: null,
      account_verified: true
    },{where:{user_id: payload.user_id}});
 
    return success('Success', 200, Message[105], res)
  } catch (err) {
    return failure('Failure', 500, err.message, res);
  }
};