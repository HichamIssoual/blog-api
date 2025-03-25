const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/error.generator");
const { FAIL, ERROR } = require("../utils/status.code.text");

const verifyToken = (req, res, next) => {
    // 1. get bearer token
    const bearerToken = req.headers["Authorization"] || req.headers["authorization"];
    // 2. check if token not found
    if (!bearerToken) {
        const err = errorGenerator.generate(404, FAIL, "No token provided");
        return next(err);
    }
    // 3. Extract Token from the "Authorization" header, which uses the Bearer token schema.
    const token = bearerToken.split(" ").at(1);
    // 4. try and catch if token valid
    try {
        // 5. Validates JWT, adds user data to req.currentUserInfo, or returns 401.
        const docodedPayload = jwt.verify(token, process.env.JWT_SECRIT_KEY);
        req.currrentUserInfo = docodedPayload;
        next();
    } catch (e) {
        // 6. if token not valid return error to client
        const err = errorGenerator.generate(401, ERROR, "Invalid token, access denied");
        next(err);
    }
}
module.exports = {
    verifyToken,
}
