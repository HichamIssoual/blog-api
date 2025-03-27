const Router = require("express").Router();
const { getAllUsers, getUserProfile, updateUserProfile, getUsersCount } = require("../controllers/users.controller");
const { checkIfIsUser } = require("../middlewares/check.if.is.user");
const { checkIfIsAdmin } = require("../middlewares/check.is.admin");
const verifyId = require("../middlewares/verify.id");
const { verifyToken } = require("../middlewares/verifyToken");
// /api/users/profile
Router.route("/profile").get(verifyToken, checkIfIsAdmin, getAllUsers)
// /api/users/profile/:id
Router.route("/profile/:id")
    .get(verifyId, getUserProfile)
    .put(verifyToken, verifyId, checkIfIsUser, updateUserProfile);
Router.route("/count").get(verifyToken, checkIfIsAdmin, getUsersCount)
module.exports = Router;