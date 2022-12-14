const express = require("express");
const { signUp, signIn } = require("../controllers/userController");
const userRoute = express.Router();
userRoute.post("/signup", signUp);

userRoute.post("/signin", signIn);

module.exports = userRoute;
