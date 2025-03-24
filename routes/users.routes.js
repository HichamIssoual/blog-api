const Router = require("express").Router();
const { getAllUsers } = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/verifyToken");
// /api/users/profile
Router.route("/profile").get(verifyToken, getAllUsers)
module.exports = Router;