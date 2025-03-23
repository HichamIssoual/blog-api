const express = require("express");
const { register } = require("../controllers/auth.controller");
const Router = express.Router();
// api/auth/register
Router.route("/register").post(register);
module.exports = Router;