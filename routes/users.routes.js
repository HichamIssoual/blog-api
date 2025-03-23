const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const Router = express.Router();
// api/auth/register
Router.route("/register").post(register);
Router.route("/login").post(login);
module.exports = Router;