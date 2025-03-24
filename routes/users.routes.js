const Router = require("express").Router();
const { getAllUsers } = require("../controllers/users.controller");
// /api/users/profile
Router.route("/profile").get(getAllUsers)
module.exports = Router;