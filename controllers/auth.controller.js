const asynHandler = require("../utils/asyn.handler")
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/user.validation");
const ErrorGenrator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/status.code.text");
const Users = require("../model/Users");
// const { generateToken } = require("../utils/generate.token");
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
        const err = ErrorGenrator.generate(409, FAIL, "An error occurred. Please try again later");
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
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        },
        message: "User has been registered successfully",
    })
});
/**----------------------------------------
 * @access public
 * @description Login to my website
 * @method POST
 * @end_point "api/auth/login"
 ------------------------------------------*/
// generate token
const login = asynHandler(async (req, res, next) => {
    // check if data sending
    const { email, password } = req.body;
    if (!email || !password) {
        const err = ErrorGenrator.generate(400, FAIL, "email and password are required");
        return next(err);
    }
    // check if user not in db and check if password is right using compare
    const foundedUser = await Users.findOne({ email });
    const matchedPassword = await bcrypt.compare(password, foundedUser.password);
    if (!foundedUser || !matchedPassword) {
        const err = ErrorGenrator.generate(404, FAIL, "email or password is wrong");
        return next(err);
    }
    // return response user with user data
    res.status(200).json({
        status: SUCCESS,
        data: {
            user: {
                id: foundedUser._id,
                username: foundedUser.username,
                email: foundedUser.email
            }
        },
        message: "User has been Login successfully",

    })
})
module.exports = {
    register,
    login,
}
