const Router = require("express").Router();
const { getAllUsers } = require("../controllers/users.controller");
const { checkIfIsAdmin } = require("../middlewares/check.is.admin");
const { verifyToken } = require("../middlewares/verifyToken");
// /api/users/profile
Router.route("/profile").get(verifyToken, checkIfIsAdmin, getAllUsers)
module.exports = Router;