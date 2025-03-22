const asynHandler = require("../utils/asyn.handler")
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/user.validation");
const ErrorGenrator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/status.code.text");
const Users = require("../model/Users");
/**----------------------------------------
 * @access public
 * @description register new user in database
 * @method POST
 * @end_point "api/auth/register"
 ------------------------------------------*/
const register = asynHandler(async (req, res, next) => {
    const { error, value } = registerValidation(req.body);
    // validation the data
    if (error) {
        const messgae = `the Error is: ${error.details[0].message}`;
        const err = ErrorGenrator.generate(400, ERROR, messgae);
        return next(err);
    }
    // check if user is not found in the database
    const findEmail = await Users.findOne({ email: req.body.email });
    if (findEmail) {
        const err = ErrorGenrator.generate(400, FAIL, "An error occurred. Please try again later");
        return next(err);
    }
    // hashing the passowrd
    const hashingPassword = await bcrypt.hash(req.body.password, 10);
    // adding the user to db
    const user = {
        ...req.body,
        password: hashingPassword,
    }
    const newUser = new Users(user);
    await newUser.save();
    // return the response to client
    res.status(201).json({
        status: SUCCESS,
        data: {
            user: newUser
        },
        message: "user logged in",
    })
});
/**----------------------------------------
 * @access public
 * @description Login to my website
 * @method POST
 * @end_point "api/auth/login"
 ------------------------------------------*/
// check if data sending
// find user by email
// check if password is right using compare
// generate token
// return response user with user data
const login = asynHandler(async (req, res, next) => {

})
module.exports = {
    register,
}
