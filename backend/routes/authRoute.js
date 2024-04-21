const express = require("express")
const router = express.Router();
const {createNewUser, loginUser, getUsers, forgetPassword, changePassword, resetPassword} = require("../controllers/authController");

router.post("/register", createNewUser);
router.post("/login", loginUser).get("/users", getUsers);
router.post("/forgetPassword", forgetPassword);
router.post("/changePassword", changePassword);
router.post("/resetPassword", resetPassword);
module.exports = router;