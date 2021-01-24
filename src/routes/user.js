const express = require("express");
const Route = express.Router();
const {authentication, authorization} = require("../helpers/auth")

const {
  register,
  login,
  getUser,
  updateData, 
} = require("../controllers/user"); 
const {handleReferralCode} = require("../controllers/referral");

Route.get("/", getUser)
  .post("/register", register, handleReferralCode)
  .post("/login", login)
  .patch("/editprofile", authentication, authorization, updateData) 

module.exports = Route;
