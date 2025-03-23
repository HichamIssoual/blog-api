const jwt = require("jsonwebtoken");
const generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRIT_KEY)
    return token;
}
module.exports = {
    generateToken,
}