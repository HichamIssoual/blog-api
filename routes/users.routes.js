const express = require("express");
const { register } = require("../controllers/auth.controller");
const Router = express.Router();

Router.route("/register").post(register);
module.exports = Router;