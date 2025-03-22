const asynHandler = require("../utils/asyn.handler")
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/user.validation");
const ErrorGenrator = require("../utils/error.generator");
const { ERROR } = require("../utils/status.code.text");
/**
 * @access public
 * @description register new user in database
 * @method POST
 * @end_point "api/auth/register"
 */
// validation the data
// check if user is not found in the database
// hashing the passowrd 
// return the response to user
const register = asynHandler(async (req, res, next) => {
    const { error, value } = registerValidation(req.body);
    if (error) {
        const messgae = `the Error is: ${error.details[0].message}`;
        const err = ErrorGenrator.generate(400, ERROR, messgae);
        return next(err);
    }

});
module.exports = {
    register,
}