const Router = require("express").Router();
const { getAllUsers, getUserProfile } = require("../controllers/users.controller");
const { checkIfIsAdmin } = require("../middlewares/check.is.admin");
const verifyId = require("../middlewares/verify.id");
const { verifyToken } = require("../middlewares/verifyToken");
// /api/users/profile
Router.route("/profile").get(verifyToken, checkIfIsAdmin, getAllUsers)
// /api/users/profile/:id
Router.route("/profile/:id").get(verifyToken, verifyId, getUserProfile);
module.exports = Router;