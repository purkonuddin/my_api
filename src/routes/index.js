const express = require("express");
const Route = express.Router(); 
const userRoute = require("./user"); 
const referral = require("./referral");
const hero = require("./hero"); 

Route.use("/user", userRoute) 
  .use("/referral", referral)
  .use("/hero", hero) 

module.exports = Route;
