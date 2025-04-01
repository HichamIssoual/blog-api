const Router = require("express").Router();
const { getAllUsers, getUserProfile, updateUserProfile, getUsersCount, uploadPhotCtl } = require("../controllers/users.controller");
const { checkIfIsUser } = require("../middlewares/check.if.is.user");
const { checkIfIsAdmin } = require("../middlewares/check.is.admin");
const photoUpload = require("../middlewares/photo.upload");
const verifyId = require("../middlewares/verify.id");
const { verifyToken } = require("../middlewares/verifyToken");
// /api/users/profile
Router.route("/profile").get(verifyToken, checkIfIsAdmin, getAllUsers)
// /api/users/profile/:id
Router.route("/profile/:id")
    .get(verifyId, getUserProfile)
    .put(verifyToken, verifyId, checkIfIsUser, updateUserProfile);
// api/users/profile/profile-photo-uploade
Router.route("/profile/profile-photo-upload").post(verifyToken, photoUpload.single("image"), uploadPhotCtl)
// api/users/count
Router.route("/count").get(verifyToken, checkIfIsAdmin, getUsersCount)
module.exports = Router;