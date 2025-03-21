const express = require("express");
const { register } = require("../connection/auth.controller");
const Router = express.Router();

Router.route("api/v1/users/").get(register);
module.exports = Router;