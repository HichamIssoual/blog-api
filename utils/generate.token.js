const jwt = require("jsonwebtoken");
const generateToken = async (payload, time) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRIT_KEY, {
        expiresIn: time
    })
    return token;
}
module.exports = {
    generateToken,
}