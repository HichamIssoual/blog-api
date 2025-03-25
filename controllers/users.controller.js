const Users = require("../model/Users");
const asynHandler = require("../utils/asyn.handler");
const errorGenerator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/status.code.text");
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
 * @access private
 * @description update user profile
 * @method PUT
 * @end_point api/users/profile/:id
 ------------------------------------------*/
const updateUserProfile = asynHandler(async (req, res, next) => {
    // 1. get id of user
    const userId = req.params.id;
    // 2. get the user
    const oldUser = await Users.findById(userId);
    // 3. check if user not found
    if (!oldUser) {
        // 4. return the error as response
        const err = errorGenerator.generate(404, FAIL, "user not found");
        return next(err);
    }
    // 5. update the user
    await Users.updateOne({ _id: userId }, { $set: req.body });
    // 6. return the response for the client
    res.status(200).json({
        status: SUCCESS,
        message: "updated user successfully",
    })
})
module.exports = {
    getAllUsers,
    getUserProfile,
    updateUserProfile
};