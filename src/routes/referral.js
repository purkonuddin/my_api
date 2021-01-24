const express = require("express");
const Route = express.Router();
const {authentication, authorization} = require("../helpers/auth")

const { inputReferralCode } = require("../controllers/referral");

Route.post("/", authentication, authorization, inputReferralCode);

module.exports = Route;
