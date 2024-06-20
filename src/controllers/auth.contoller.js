
const db = require('../models/index');
const { User, Auth, Role, UserRole } = db;
const uuid = require('uuid4');
const {
  hashPassword,
  comparePassword,
  generateRandomString,
  createToken
} = require('../utills/common');
const { Success, Failure } = require('../middleware/middleware');
const { Message } = require("../utills/constant");
const { emailSend } = require("../utills/services");

exports.getAllUsers = async (req, res) => {
  try {
    const role = await Role.findAll();
    return Success('Success', 200, role, res)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.userSignIn = async (req, res) => {
  try {
    let payload = req.body;
    payload.uuid = uuid();
    console.log("payload", payload);
    const user = await User.findOne({
      where: {
        email: payload.email
      }
    });
    if (user) {
      return Failure('Failure', 409, Message[100], res);
    }
    payload.password = await hashPassword(payload.password); // Password hash using bcrypt
    let userCreate = await User.create(payload) // User creation
    let user_verification_code = await generateRandomString(10);
    await Auth.create({
      ...payload,
      user_verification_code,
      user_id: userCreate.id
    }) // Auth creation
    const userRoles = await Role.findAll();
    let newRole = userRoles.find(res => res.name.toLowerCase() == payload.role.toLowerCase());
    await UserRole.create({
      user_id: userCreate.id,
      role_id: newRole.id
    }); // Role creation
    /** Need to send verification email to registered email */
    return Success('Success', 200, Message[104], res)
  } catch (err) {
    return Failure('Failure', 500, err.message, res);
  }
};

exports.userVerification = async (req, res) => {
  try {
    let payload = req.body;
    console.log("payload", payload);
    const users = await Auth.findOne({
      where: {
        user_id: payload.user_id,
        user_verification_code: payload.user_verification_code
      }
    });
    if (!users) {
      return Failure('Failure', 404, Message[102], res);
    };
    if (users && users.account_verification) {
      return Failure('Failure', 409, Message[106], res);
    };
    await Auth.update({
      user_verification_code: null,
      account_verified: true
    }, { where: { user_id: payload.user_id } });

    return Success('Success', 200, Message[105], res)
  } catch (err) {
    return Failure('Failure', 500, err.message, res);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let payload = req.body;
    console.log("payload", payload);
    const userExe = await User.findOne({
      where: {
        email: payload.email
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: UserRole,
          as: 'roles',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [
            {
              model: Role,
              as: 'role',
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            }
          ]
        }
      ]
    });
    if (!userExe) {
      return Failure('Failure', 404, Message[102], res);
    };

    const userAuth = await Auth.findOne({
      where: {
        user_id: userExe.id,
      }
    });

    if (!userAuth.account_verified) {
      return Failure('Failure', 404, Message[107], res);
    };
    const passwordMatch = await comparePassword(payload.password, userExe.password);
    if (!passwordMatch) {
      return Failure('Failure', 500, Message[103], res);
    };
    let tokenPayload = {
      user_id: userExe.id,
      email: userExe.email,
      role: userExe.roles[0].role.id,
      roleName: userExe.roles[0].role.name
    };
    let access_token = await createToken(
      tokenPayload,
      '1day'
    );
    let refresh_token = await createToken(
      tokenPayload,
      '1year'
    );
    let date1 = new Date().setDate(new Date().getDate() + 1);
    let date2 = new Date().setDate(new Date().getDate() + 365);
    let authPayload = {
      access_token,
      refresh_token,
      access_token_expire: new Date(date1),
      refresh_token_expire: new Date(date2),
    }
    await Auth.update(authPayload, { where: { user_id: userExe.id } });

    return Success('Success', 200, {
      access_token,
      refresh_token,
    }, res)
  } catch (err) {
    console.log("======err====", err);

    return Failure('Failure', 500, err.message, res);
  }
};
exports.sendSampleEmail = async (req, res) => {
  try {
    const role = await emailSend(req.body);
    return Success('Success',200, role,res)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
