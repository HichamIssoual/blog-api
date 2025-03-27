const Users = require("../model/Users");
const asynHandler = require("../utils/asyn.handler");
const errorGenerator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/status.code.text");
const { updateUserValidation } = require("../validation/user.validation");
const bcrypt = require("bcryptjs");
/**----------------------------------------
 * @access private (only for admin)
 * @description get all users
 * @method GET
 * @end_point api/users/profile
 ------------------------------------------*/
const getAllUsers = asynHandler(async (req, res, next) => {
    const users = await Users.find().select("-password").select("-__v");
    return res.status(200).json({
        status: SUCCESS,
        users: users,
    });
})
/**----------------------------------------
 * @access public
 * @description get user profile
 * @method GET
 * @end_point api/users/profile/:id
 ------------------------------------------*/
const getUserProfile = asynHandler(async (req, res, next) => {
    // 1. get id of user
    const userId = req.params.id;
    // 2. get user by id
    const user = await Users.findById(userId).select("-password");
    // 3. check if you have the use user
    if (!user) {
        const err = errorGenerator.generate(404, FAIL, "user not found");
        return next(err);
    }
    // 4. return the user response
    res.status(200).json({
        status: SUCCESS,
        user: user
    })
});
/**----------------------------------------
 * @access private (only for user)
 * @description update user profile
 * @method PUT
 * @end_point api/users/profile/:id
 ------------------------------------------*/
const updateUserProfile = asynHandler(async (req, res, next) => {
    const userId = req.params.id;
    const { error } = updateUserValidation(req.body);
    if (error) {
        const err = errorGenerator.generate(400, FAIL, error.details.at(0).message);
        return next(err);
    }
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await Users.findByIdAndUpdate(userId, {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio
    }, { new: true }).select("-password");
    res.status(200).json({
        status: SUCCESS,
        message: "updated user successfully",
        updatedUser,
    })
});
/**----------------------------------------
 * @access private (only for admin)
 * @description update user count
 * @method GET
 * @end_point api/users/count
 ------------------------------------------*/
const getUsersCount = asynHandler(async (req, res, next) => {
    const allUsersLength = await Users.countDocuments();
    res.status(200).json({
        status: SUCCESS,
        usersCount: allUsersLength
    })
})
module.exports = {
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    getUsersCount
};