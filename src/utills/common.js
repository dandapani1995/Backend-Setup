const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = process.env.SECRECT_KEY || 'Test@123';


const hashPassword = async(plainPassword)=>{
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};

// Function to compare passwords
const comparePassword = async(plainPassword, hashedPassword)=>{
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error comparing passwords:', err);
        throw err;
    }
};

const generateRandomString = async (length) =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const createToken= async (payload, expiresIn ='1day') =>{
    return jwt.sign(payload, secretKey, { expiresIn });
}

const Success = (status, code, data, res)=>{
    res.send({
        status:status,
        statusCode: code,
        data: data
    })
};

const Failure = (status, code, message, res)=>{
    res.send( {
        status:status,
        statusCode: code,
        message:message
    })
};
module.exports = {
    hashPassword,
    comparePassword,
    generateRandomString,
    createToken,
    Success,
    Failure,
}