const bcrypt = require('bcrypt');
const saltRounds = 10;

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
module.exports = {
    hashPassword,
    comparePassword,
    generateRandomString
}