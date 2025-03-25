const Users = require("../model/Users");
const asynHandler = require("../utils/asyn.handler");
const errorGenerator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/status.code.text");
/**----------------------------------------
 * @access private (only for admin)
 * @description get all users
 * @method GET
 * @end_point "api/users/profile"
 ------------------------------------------*/
const getAllUsers = asynHandler(async (req, res, next) => {
    const users = await Users.find().select("-password").select("-__v");
    return res.status(200).json({
        status: SUCCESS,
        users: users,
    });
})
module.exports = {
    getAllUsers
};