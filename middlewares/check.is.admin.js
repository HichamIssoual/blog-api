const errorGenerator = require("../utils/error.generator");
const { ERROR } = require("../utils/status.code.text");
const checkIfIsAdmin = (req, res, next) => {
    const currentUser = req.currrentUserInfo;
    if (currentUser.isAdmin === true) {
        next();
    } else {
        const err = errorGenerator.generate(403, ERROR, "You are not authorized to access this resource");
        next(err);
    }
};
module.exports = {
    checkIfIsAdmin,
}