const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRECT_KEY || 'Test@123';
const { Failure } = require('../utills/common');
const { Message } = require('../utills/constant')

const authenticateToken = (req, res, next)=>{
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assuming the token is in the format "Bearer TOKEN"

    if (token == null) return Failure("Failure", 401, Message[108], res); // If there's no token, return Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return Failure("Failure", 403, Message[109], res); // If the token is invalid, return Forbidden
       console.log("user===",user);
        req.user = user; // Attach the user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
}


module.exports ={
    authenticateToken,
}