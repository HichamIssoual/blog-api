const errorGenerator = require("../utils/error.generator");
const { ERROR } = require("../utils/status.code.text");
const checkIfIsUser = (req, res, next) => {
    const currentUser = req.currrentUserInfo;
    if (currentUser.id === req.params.id) {
        next();
    } else {
        const err = errorGenerator.generate(403, ERROR, "You are not authorized to access this resource");
        next(err);
    }
};
module.exports = {
    checkIfIsUser
}